import { useState } from 'react'
import { useCreateBooking } from '../../hooks/booking/useBookingMutation'
import ImageUploader from '../shared/ImageUploder'

/**
 * Pass exactly ONE of `listingId` or `requestId`.
 * `onSuccess(booking)` is called after a successful create.
 */
export default function CreateBookingModal({
  open,
  onClose,
  listingId,
  requestId,
  onSuccess,
}) {
  const { mutate, isPending, error } = useCreateBooking()
  const fieldErrors = error?.errors || {}

  const [form, setForm] = useState({
    scheduledAt: '',
    durationHours: '',
    note: '',
    images: { existing: [], files: [] },
  })

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }))

  if (!open) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    mutate(
      {
        ...(listingId ? { listing: listingId } : { request: requestId }),
        scheduledAt: form.scheduledAt
          ? new Date(form.scheduledAt).toISOString()
          : undefined,
        durationHours: form.durationHours,
        note: form.note || undefined,
        attachments: form.images?.files,
      },
      {
        onSuccess: (data) => {
          setForm({
            scheduledAt: '',
            durationHours: '',
            note: '',
            images: { existing: [], files: [] },
          })
          onSuccess?.(data)
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
            Book a Session
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
            {error.message || "Couldn't send booking request. Try again."}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1.5 block">
                Date & Time
              </label>
              <input
                required
                type="datetime-local"
                value={form.scheduledAt}
                onChange={(e) => update('scheduledAt', e.target.value)}
                className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-white"
              />
              {fieldErrors.scheduledAt && (
                <p className="text-xs text-red-500 mt-1">
                  {fieldErrors.scheduledAt}
                </p>
              )}
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1.5 block">
                Duration (hours)
              </label>
              <input
                required
                type="number" 
                min={0}
                step={1}
                value={form.durationHours}
                onChange={(e) => update('durationHours', e.target.value)}
                className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-white"
              />
              {fieldErrors.durationHours && (
                <p className="text-xs text-red-500 mt-1">
                  {fieldErrors.durationHours}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1.5 block">
              Note (optional)
            </label>
            <textarea
              rows={3}
              value={form.note}
              onChange={(e) => update('note', e.target.value)}
              placeholder="Describe what you need from this session…"
              className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-white resize-none"
            />
          </div>

          <ImageUploader
            value={form.images}
            onChange={(v) => update('images', v)}
            label="Attachments (optional, up to 3)"
            maxFiles={3}
          />

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:brightness-110 transition-all disabled:opacity-60"
          >
            {isPending ? 'Sending…' : 'Send Booking Request'}
          </button>
        </form>
      </div>
    </div>
  )
}
