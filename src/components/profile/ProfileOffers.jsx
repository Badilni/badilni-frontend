import { useState } from 'react'
import { useUserOffers } from '../../hooks/Timeline/useUserOffer'
import { useDeleteOffer } from '../../hooks/Timeline/useOfferMutation'
import OfferCard from '../offers/OfferCard'
import EditOfferModal from '../offers/EditOfferModal'
import ConfirmDeleteModal from '../shared/ConfirmDeleteModal'
import OfferCardSkeleton from '../offers/OfferCardSkeleton'
import ErrorState from '../shared/ErrorState'

/**
 * userId: pass to view someone else's offers, omit for the logged-in
 * user's own ("me") offers. OfferCard already hides Edit/Delete for
 * non-owners, so this works unchanged on both profile contexts.
 */
export default function ProfileOffers({ userId, isOwnProfile = false, limit = 6 }) {
  const { data, isLoading, isError, error, refetch } = useUserOffers(userId, { limit })
  const deleteOffer = useDeleteOffer()
  const [editingOffer, setEditingOffer] = useState(null)
  const [deletingOffer, setDeletingOffer] = useState(null)

  // ASSUMPTION: this list endpoint mirrors the main /skill-listings shape —
  // { data: { skillListings } }. Confirm against the real
  // /users/{userId}/skill-listings response before relying on this.
  const offers = data?.data?.skillListings ?? []

  const handleConfirmDelete = () => {
    if (!deletingOffer) return
    deleteOffer.mutate(deletingOffer._id ?? deletingOffer.id, {
      onSuccess: () => setDeletingOffer(null),
    })
  }

  if (isError) return <ErrorState message={error?.message} onRetry={refetch} />

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {Array.from({ length: 2 }).map((_, i) => (
          <OfferCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (offers.length === 0) {
    return (
      <div className="bg-[var(--whiteBackground)] rounded-2xl p-8 text-center border border-[var(--secondary-light)]/10">
        <p className="text-sm text-[var(--gray-text)]">
          {isOwnProfile ? "You haven't posted any offers yet." : 'No offers posted yet.'}
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {offers.map((offer) => (
          <OfferCard
            key={offer._id ?? offer.id}
            offer={offer}
            onEdit={setEditingOffer}
            onDelete={setDeletingOffer}
          />
        ))}
      </div>

      <EditOfferModal open={Boolean(editingOffer)} offer={editingOffer} onClose={() => setEditingOffer(null)} />
      <ConfirmDeleteModal
        open={Boolean(deletingOffer)}
        title="Delete this offer?"
        description="This will permanently remove your offer. This action cannot be undone."
        isDeleting={deleteOffer.isPending}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingOffer(null)}
      />
    </>
  )
}