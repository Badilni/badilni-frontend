import { useState } from 'react'
import { useUserServiceRequests } from '../../hooks/Timeline/useUserServiceRequest'
import { useDeleteServiceRequest } from '../../hooks/Timeline/useServiceRequestMutations'
import { useProposeSession } from '../../hooks/Timeline/useProposeSession'
import { useCategories } from '../../hooks/Timeline/useCategories'
import RequestCard from '../requests/RequestCard'
import EditServiceRequestModal from '../requests/EditServiceRequestModal'
import ConfirmDeleteModal from '../shared/ConfirmDeleteModal'
import RequestCardSkeleton from '../shared/RequestCardSkeleton'
import ErrorState from '../shared/ErrorState'

/**
 * userId: pass to view someone else's requests, omit for the logged-in
 * user's own ("me") requests. RequestCard already hides Edit/Delete for
 * non-owners and shows them for owners — same component works for both
 * "my profile" and "their profile" without any extra branching here.
 */
export default function ProfileServiceRequests({ userId, isOwnProfile = false, limit = 6 }) {
  const { data, isLoading, isError, error, refetch } = useUserServiceRequests(userId, { limit })
  const { data: categoriesData } = useCategories()
  const categories = categoriesData?.data?.categories ?? []
  const deleteRequest = useDeleteServiceRequest()
  const proposeSession = useProposeSession()
  const [editingRequest, setEditingRequest] = useState(null)
  const [deletingRequest, setDeletingRequest] = useState(null)
  const [proposingId, setProposingId] = useState(null)
  const [proposedIds, setProposedIds] = useState(() => new Set())

  // ASSUMPTION: this list endpoint mirrors the main /service-requests shape
  // — { data: { serviceRequests } }. Confirm against the real
  // /users/{userId}/service-requests response before relying on this.
  const requests = data?.data?.serviceRequests ?? []

  const handlePropose = (request) => {
    const id = request.id ?? request._id
    setProposingId(id)
    proposeSession.mutate(
      { serviceRequestId: id, payload: {} },
      {
        onSuccess: () => setProposedIds((prev) => new Set(prev).add(id)),
        onSettled: () => setProposingId(null),
      }
    )
  }

  const handleConfirmDelete = () => {
    if (!deletingRequest) return
    deleteRequest.mutate(deletingRequest._id ?? deletingRequest.id, {
      onSuccess: () => setDeletingRequest(null),
    })
  }

  if (isError) return <ErrorState message={error?.message} onRetry={refetch} />

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {Array.from({ length: 2 }).map((_, i) => (
          <RequestCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (requests.length === 0) {
    return (
      <div className="bg-[var(--whiteBackground)] rounded-2xl p-8 text-center border border-[var(--secondary-light)]/10">
        <p className="text-sm text-[var(--gray-text)]">
          {isOwnProfile ? "You haven't posted any service requests yet." : 'No service requests posted yet.'}
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {requests.map((request) => {
          const id = request.id ?? request._id
          return (
            <RequestCard
              key={id}
              request={request}
              categories={categories}
              onPropose={handlePropose}
              isProposing={proposingId === id}
              isProposed={proposedIds.has(id)}
              onEdit={setEditingRequest}
              onDelete={setDeletingRequest}
            />
          )
        })}
      </div>

      <EditServiceRequestModal
        open={Boolean(editingRequest)}
        request={editingRequest}
        onClose={() => setEditingRequest(null)}
      />
      <ConfirmDeleteModal
        open={Boolean(deletingRequest)}
        title="Delete this request?"
        description="This will permanently remove your request. This action cannot be undone."
        isDeleting={deleteRequest.isPending}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingRequest(null)}
      />
    </>
  )
}