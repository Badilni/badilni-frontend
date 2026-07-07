import useAuthStore from '../../store/authStore'
import { getBookingPermissions } from '../../utils/bookingPermissions'
import BookingStatusBadge from './BookingStatusBadge'
import BookingParticipants from './BookingParticipants'
import BookingMeetingLink from './BookingMeetingLink'
import BookingActions from './BookingActions'

export default function BookingDetail({ booking }) {
  const currentUser = useAuthStore((s) => s.user)
  const permissions = getBookingPermissions(booking, currentUser)

  const listingOrRequest = booking.listing ?? booking.request
  const attachments = booking.attachments ?? []

  return (
    <div className="bg-[var(--whiteBackground)] dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm overflow-hidden">
      {/* Header stripe */}
      <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 to-indigo-600" />

      <div className="p-8 space-y-8">
        {/* Title row */}
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-black text-gray-900 dark:text-white mb-1">
              {listingOrRequest?.title ?? 'Session Booking'}
            </h1>
            <p className="text-sm text-gray-400 dark:text-gray-500">
              Created{' '}
              {new Date(booking.createdAt).toLocaleDateString(undefined, {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
          </div>
          <BookingStatusBadge status={booking.status} />
        </div>

        {/* Participants */}
        <div>
          <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-3">
            Participants
          </p>
          <BookingParticipants booking={booking} />
        </div>

        {/* Schedule info */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            {
              label: 'Scheduled',
              value: booking.scheduledAt
                ? new Date(booking.scheduledAt).toLocaleString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                : '—',
            },
            {
              label: 'Duration',
              value: booking.durationHours ? `${booking.durationHours}h` : '—',
            },
            {
              label: 'Credits',
              value:
                booking.creditsTotal != null ? `${booking.creditsTotal}` : '—',
            },
            {
              label: 'Your Role',
              value: permissions.isProvider
                ? 'Provider'
                : permissions.isReceiver
                  ? 'Receiver'
                  : '—',
            },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="bg-gray-50 dark:bg-slate-800 rounded-2xl p-4"
            >
              <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1">
                {label}
              </p>
              <p className="text-sm font-bold text-gray-900 dark:text-white">
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* Confirmation flags (only once accepted+) */}
        {(booking.providerConfirmed != null ||
          booking.receiverConfirmed != null) && (
          <div className="flex gap-4 flex-wrap">
            {[
              { label: 'Provider confirmed', done: booking.providerConfirmed },
              { label: 'Receiver confirmed', done: booking.receiverConfirmed },
            ].map(({ label, done }) => (
              <span
                key={label}
                className={`text-xs font-semibold px-3 py-1.5 rounded-full ${
                  done
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400'
                    : 'bg-gray-100 text-gray-500 dark:bg-slate-800 dark:text-gray-400'
                }`}
              >
                {done ? '✓' : '○'} {label}
              </span>
            ))}
          </div>
        )}

        {/* Note */}
        {booking.note && (
          <div>
            <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-2">
              Note
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {booking.note}
            </p>
          </div>
        )}

        {/* Cancellation info */}
        {booking.cancellationReason && (
          <div className="bg-red-50 dark:bg-red-950/20 rounded-2xl p-4 border border-red-100 dark:border-red-900">
            <p className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wide mb-1">
              Cancellation reason
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {booking.cancellationReason}
            </p>
          </div>
        )}

        {/* Attachments */}
        {attachments.length > 0 && (
          <div>
            <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-3">
              Attachments
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {attachments.map((img, i) => (
                <img
                  key={img._id ?? i}
                  src={img.url}
                  alt=""
                  className="w-full h-36 object-cover rounded-xl"
                />
              ))}
            </div>
          </div>
        )}

        {/* Meeting link */}
        <BookingMeetingLink
          booking={booking}
          canEdit={permissions.canAddMeetingLink}
        />

        {/* Actions */}
        <BookingActions booking={booking} permissions={permissions} />
      </div>
    </div>
  )
}
