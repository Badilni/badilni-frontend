import { useUpdateOffer } from '../../hooks/Timeline/useOfferMutation'
import OfferForm from './OfferForm'

export default function EditOfferModal({ open, offer, onClose }) {
  const { mutate, isPending } = useUpdateOffer()

  if (!open || !offer) return null

  const initialValues = {
    title: offer.title,
    description: offer.description,
    category: offer.category?._id ?? offer.category,
    hourlyRate: offer.hourlyRate,
    availabilityNotes: offer.availabilityNotes ?? '',
    tags: offer.tags ?? [],
    isActive: offer.isActive ?? true,
    images: { existing: offer.sampleWork ?? [], files: [] },
  }

  const handleSubmit = (values) => {
    mutate(
      {
        id: offer._id ?? offer.id,
        payload: {
          category: values.category,
          title: values.title,
          description: values.description,
          hourlyRate: values.hourlyRate,
          availabilityNotes: values.availabilityNotes,
          tags: values.tags,
          isActive: values.isActive,
          sampleWork: values.images?.files,
          keepImageIds: values.images?.existing?.map((img) => img._id),
        },
      },
      { onSuccess: () => onClose() }
    )
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-[var(--whiteBackground)] dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-7"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-black text-gray-900 dark:text-white">
            Edit Offer
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <OfferForm
          initialValues={initialValues}
          onSubmit={handleSubmit}
          isSubmitting={isPending}
          submitLabel="Save Changes"
        />
      </div>
    </div>
  )
}
