import { useState } from 'react'
import {
  useAcceptBooking,
  useDeclineBooking,
  useConfirmBooking,
  useDisputeBooking,
} from '../../hooks/booking/useBookingMutation'
import BookingCancelDialog from './BookingCancelDialog'

export default function BookingActions({ booking, permissions }) {
  const [cancelOpen, setCancelOpen] = useState(false)
  const bookingId = booking?._id ?? booking?.id

  const accept = useAcceptBooking()
  const decline = useDeclineBooking()
  const confirm = useConfirmBooking()
  const dispute = useDisputeBooking()

  const anyPending =
    accept.isPending ||
    decline.isPending ||
    confirm.isPending ||
    dispute.isPending

  const { canAccept, canDecline, canCancel, canConfirm, canDispute } =
    permissions

  if (!canAccept && !canDecline && !canCancel && !canConfirm && !canDispute)
    return null

  return (
    <div className="flex flex-wrap gap-3">
      {canAccept && (
        <button
          type="button"
          onClick={() => accept.mutate(bookingId)}
          disabled={anyPending}
          className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:brightness-110 disabled:opacity-60 transition-all"
        >
          {accept.isPending ? 'Accepting…' : 'Accept'}
        </button>
      )}

      {canDecline && (
        <button
          type="button"
          onClick={() => decline.mutate(bookingId)}
          disabled={anyPending}
          className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-sm font-bold text-red-600 border border-red-200 hover:bg-red-50 dark:hover:bg-red-900/20 disabled:opacity-60 transition-all"
        >
          {decline.isPending ? 'Declining…' : 'Decline'}
        </button>
      )}

      {canConfirm && (
        <button
          type="button"
          onClick={() => confirm.mutate(bookingId)}
          disabled={anyPending}
          className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:brightness-110 disabled:opacity-60 transition-all"
        >
          {confirm.isPending ? 'Confirming…' : 'Confirm'}
        </button>
      )}

      {canDispute && (
        <button
          type="button"
          onClick={() => dispute.mutate(bookingId)}
          disabled={anyPending}
          className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-sm font-bold text-orange-700 border border-orange-200 hover:bg-orange-50 dark:hover:bg-orange-900/20 disabled:opacity-60 transition-all"
        >
          {dispute.isPending ? 'Submitting…' : 'Dispute'}
        </button>
      )}

      {canCancel && (
        <button
          type="button"
          onClick={() => setCancelOpen(true)}
          disabled={anyPending}
          className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-sm font-bold text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 disabled:opacity-60 transition-all"
        >
          Cancel
        </button>
      )}

      <BookingCancelDialog
        bookingId={bookingId}
        open={cancelOpen}
        onClose={() => setCancelOpen(false)}
      />
    </div>
  )
}
