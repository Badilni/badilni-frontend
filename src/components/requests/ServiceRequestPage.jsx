import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useServiceRequest } from '../../hooks/Timeline/useServiceRequests'
import { useDeleteServiceRequest } from '../../hooks/Timeline/useServiceRequestMutations'
import useAuthStore from '../../store/authStore'
import { isOwner as checkIsOwner } from '../../utils/isOwner'
import EditServiceRequestModal from './EditServiceRequestModal'
import ConfirmDeleteModal from '../shared/ConfirmDeleteModal'
import ErrorState from '../shared/ErrorState'

export default function ServiceRequestPage() {
  const { requestId } = useParams()
  const navigate = useNavigate()
  const { data, isLoading, isError, error, refetch } = useServiceRequest(requestId)
  const deleteRequest = useDeleteServiceRequest()
  const currentUser = useAuthStore((state) => state.user)
  const [editOpen, setEditOpen] = useState(false)
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false)

  // ASSUMPTION: single-resource GET wraps the document as { data: { serviceRequest } },
  // mirroring the list endpoint's { data: { serviceRequests } } shape (same
  // assumption used for OfferPage / skill-listings). The previous version of
  // this page read `data?.serviceRequest` with no nested `data` — confirm the
  // real shape against Postman before relying on either.
  const request = data?.data?.serviceRequest

  if (isLoading) return <div className="p-10 text-center text-gray-500 dark:text-gray-400">Loading…</div>
  if (isError) return <ErrorState message={error?.message} onRetry={refetch} />
  if (!request) return <div className="p-10 text-center text-gray-500 dark:text-gray-400">Request not found.</div>

  const owner = checkIsOwner(currentUser, request.user)

  const handleDelete = () => {
    deleteRequest.mutate(request._id ?? request.id, {
      onSuccess: () => navigate('/requests'),
    })
  }

  return (
    <div className="max-w-4xl mx-auto p-6 lg:p-10">
      <div className="bg-[var(--whiteBackground)] dark:bg-slate-900 rounded-3xl p-8 border border-gray-100 dark:border-slate-800 shadow-sm">
        {/* Title, metadata & owner actions */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <h1 className="text-3xl font-black text-gray-900 dark:text-white">{request.title}</h1>
          {owner && (
            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => setEditOpen(true)}
                className="px-4 py-2 rounded-xl text-sm font-bold border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800"
              >
                Edit
              </button>
              <button
                onClick={() => setConfirmDeleteOpen(true)}
                className="px-4 py-2 rounded-xl text-sm font-bold text-red-600 border border-red-200 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                Delete
              </button>
            </div>
          )}
        </div>

        <div className="flex gap-4 mb-6">
          <span className="text-sm font-bold px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
            {request.creditsOffered} Credits
          </span>
          <span className="text-sm font-semibold text-gray-500 py-1.5">
            Category: {request.category?.name}
          </span>
        </div>

        {/* Images Grid */}
        {request.referenceImages?.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {request.referenceImages.map((img) => (
              <img key={img._id ?? img.url} src={img.url} alt="" className="rounded-2xl w-full h-64 object-cover" />
            ))}
          </div>
        )}

        {/* Description */}
        <h3 className="font-bold text-gray-900 dark:text-white mb-2">Description</h3>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">{request.description}</p>

        {/* User Info */}
        <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-slate-800 rounded-2xl">
          <img
            src={request.user?.avatar?.url || 'https://via.placeholder.com/80'}
            className="w-12 h-12 rounded-full object-cover"
            alt={request.user?.name || 'User'}
          />
          <div>
            <p className="font-bold text-gray-900 dark:text-white">{request.user?.name}</p>
            <p className="text-xs text-gray-500">Posted on {new Date(request.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      <EditServiceRequestModal open={editOpen} request={request} onClose={() => setEditOpen(false)} />
      <ConfirmDeleteModal
        open={confirmDeleteOpen}
        title="Delete this request?"
        description="This will permanently remove your request. This action cannot be undone."
        isDeleting={deleteRequest.isPending}
        onConfirm={handleDelete}
        onCancel={() => setConfirmDeleteOpen(false)}
      />
    </div>
  )
}