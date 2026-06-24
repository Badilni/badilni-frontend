import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FaStar } from 'react-icons/fa6'
import { useOffer } from '../../hooks/Timeline/useOffer'
import { useDeleteOffer } from '../../hooks/Timeline/useOfferMutation'
import useAuthStore from '../../store/authStore'
import { isOwner as checkIsOwner } from '../../utils/isOwner'
import OfferGallery from './OfferGallery'
import EditOfferModal from './EditOfferModal'
import ConfirmDeleteModal from '../shared/ConfirmDeleteModal'
import ErrorState from '../shared/ErrorState'

export default function OfferPageComponent() {
  const { offerId } = useParams()
  const navigate = useNavigate()
  const { data, isLoading, isError, error, refetch } = useOffer(offerId)
  const deleteOffer = useDeleteOffer()
  const currentUser = useAuthStore((state) => state.user)
  const [editOpen, setEditOpen] = useState(false)
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false)

  // ASSUMPTION: single-resource GET wraps the document as { data: { skillListing } },
  // mirroring the list endpoint's { data: { skillListings } } shape. Confirm
  // against the real GET /skill-listings/{id} response before shipping.
  const offer = data?.data?.skillListing

  if (isLoading) return <div className="p-10 text-center text-gray-500 dark:text-gray-400">Loading…</div>
  if (isError) return <ErrorState message={error?.message} onRetry={refetch} />
  if (!offer) return <div className="p-10 text-center text-gray-500 dark:text-gray-400">Offer not found.</div>

  const owner = checkIsOwner(currentUser, offer.user)

  const handleDelete = () => {
    deleteOffer.mutate(offer._id ?? offer.id, {
      onSuccess: () => navigate('/offers'),
    })
  }

  return (
    <div className="max-w-4xl mx-auto p-6 lg:p-10">
      <div className="bg-[var(--whiteBackground)] dark:bg-slate-900 rounded-3xl p-8 border border-gray-100 dark:border-slate-800 shadow-sm">
        <div className="flex items-start justify-between gap-4 mb-4">
          <h1 className="text-3xl font-black text-gray-900 dark:text-white">{offer.title}</h1>
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

        <div className="flex flex-wrap gap-3 mb-6">
          <span className="text-sm font-bold px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
            ${offer.hourlyRate}/hr
          </span>
          <span className="text-sm font-semibold text-gray-500 py-1.5">Category: {offer.category?.name}</span>
          <span
            className={`text-sm font-bold px-4 py-1.5 rounded-full ${
              offer.isActive
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400'
                : 'bg-gray-100 text-gray-500 dark:bg-slate-800 dark:text-gray-400'
            }`}
          >
            {offer.isActive ? 'Active' : 'Inactive'}
          </span>
        </div>

        <OfferGallery images={offer.sampleWork} />

        <h3 className="font-bold text-gray-900 dark:text-white mb-2">Description</h3>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">{offer.description}</p>

        {offer.availabilityNotes && (
          <>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">Availability</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">{offer.availabilityNotes}</p>
          </>
        )}

        {offer.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {offer.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between gap-4 p-4 bg-gray-50 dark:bg-slate-800 rounded-2xl flex-wrap">
          <div className="flex items-center gap-4">
            <img
              src={offer.user?.avatar?.url || 'https://via.placeholder.com/80'}
              className="w-12 h-12 rounded-full object-cover"
              alt={offer.user?.name || 'User'}
            />
            <div>
              <p className="font-bold text-gray-900 dark:text-white">{offer.user?.name}</p>
              <p className="text-xs text-gray-500">Posted on {new Date(offer.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-sm">
            <FaStar className="text-amber-400" />
            <span className="font-semibold text-gray-700 dark:text-gray-300">
              {typeof offer.averageRating === 'number' ? offer.averageRating.toFixed(1) : 'New'}
            </span>
            <span className="text-gray-400">· {offer.totalBookings ?? 0} bookings</span>
          </div>
        </div>
      </div>

      <EditOfferModal open={editOpen} offer={offer} onClose={() => setEditOpen(false)} />
      <ConfirmDeleteModal
        open={confirmDeleteOpen}
        title="Delete this offer?"
        description="This will permanently remove your offer. This action cannot be undone."
        isDeleting={deleteOffer.isPending}
        onConfirm={handleDelete}
        onCancel={() => setConfirmDeleteOpen(false)}
      />
    </div>
  )
}