import ServiceRequestForm from './ServiceRequestForm'
import { useCreateServiceRequest } from '../../hooks/Timeline/useServiceRequestMutations'

export default function CreateServiceRequestModal({
  open,
  onClose,
  onCreated,
}) {
  const { mutate, isPending, error } = useCreateServiceRequest()

  // Backend validation errors are expected as { errors: { fieldName: 'message' } }
  // via the axios interceptor's normalized error shape — adjust the key path
  // here once the real error response shape is confirmed.
  const fieldErrors = error?.errors || {}

  if (!open) return null

  const handleSubmit = (form) => {
    mutate(
      {
        category: form.category,
        title: form.title,
        description: form.description,
        creditsOffered: form.creditsOffered,
        deadline: form.deadline
          ? new Date(form.deadline).toISOString()
          : undefined,
        referenceImages: form.images?.files,
      },
      {
        onSuccess: (created) => {
          onCreated?.(created)
          onClose()
        },
      }
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
            Post a Request
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

        {error && !Object.keys(fieldErrors).length && (
          <div className="mb-4 text-sm font-semibold text-red-600 bg-red-50 dark:bg-red-950/30 rounded-xl px-4 py-3">
            {error.message || "Couldn't post your request. Try again."}
          </div>
        )}

        <ServiceRequestForm
          onSubmit={handleSubmit}
          isSubmitting={isPending}
          fieldErrors={fieldErrors}
          submitLabel="Post Request"
        />
      </div>
    </div>
  )
}
