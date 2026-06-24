import { useNavigate } from 'react-router-dom'
import OfferForm from './OfferForm'
import { useCreateOffer } from '../../hooks/Timeline/useOfferMutation'

export default function CreateOfferModal({ open, onClose }) {
  const navigate = useNavigate()
  const { mutate, isPending } = useCreateOffer()

  if (!open) return null

  const handleSubmit = (values) => {
    mutate(
      {
        category: values.category,
        title: values.title,
        description: values.description,
        hourlyRate: values.hourlyRate,
        availabilityNotes: values.availabilityNotes,
        tags: values.tags,
        isActive: values.isActive,
        sampleWork: values.images?.files,
      },
      {
        onSuccess: (created) => {
          onClose()
          // ASSUMPTION: single-resource create response wraps the document as
          // { data: { skillListing } }, mirroring the list shape. Confirm
          // against the real POST /skill-listings response before relying on
          // this redirect in production.
          const id = created?.data?.skillListing?._id ?? created?._id
          if (id) navigate(`/offers/${id}`)
        },
      }
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div
        className="bg-[var(--whiteBackground)] dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-7"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-black text-gray-900 dark:text-white">Create an Offer</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <OfferForm onSubmit={handleSubmit} isSubmitting={isPending} submitLabel="Post Offer" />
      </div>
    </div>
  )
}