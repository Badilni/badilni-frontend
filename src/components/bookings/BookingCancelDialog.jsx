import { useState } from 'react'
import { createPortal } from 'react-dom'
import { useCancelBooking } from '../../hooks/booking/useBookingMutation'

/**
 * Inline cancel dialog rendered inside the booking detail/card — wrapped in a Portal
 * to escape CSS transform containment from the parent card, rendering as a true modal.
 */
export default function BookingCancelDialog({ bookingId, open, onClose }) {
  const [reason, setReason] = useState('')
  const { mutate, isPending } = useCancelBooking()

  if (!open) return null

  const handleSubmit = () => {
    mutate(
      { id: bookingId, cancellationReason: reason.trim() || undefined },
      {
        onSuccess: () => {
          setReason('')
          onClose()
        },
      }
    )
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-[var(--whiteBackground)] dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-sm p-7 border border-gray-100 dark:border-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-black text-gray-900 dark:text-white mb-2">
          Cancel Booking
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Let the other party know why you're cancelling.
        </p>
        <textarea
          rows={3}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Cancellation reason (optional)"
          className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-white resize-none mb-5"
        />
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            className="flex-1 py-2.5 rounded-xl text-sm font-bold border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800 disabled:opacity-60"
          >
            Keep booking
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isPending}
            className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white bg-red-600 hover:bg-red-700 disabled:opacity-60"
          >
            {isPending ? 'Cancelling…' : 'Cancel booking'}
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}
