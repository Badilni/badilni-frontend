import { useNavigate } from 'react-router-dom'
import useAuthStore from '../../store/authStore'
import { getBookingPermissions } from '../../utils/bookingPermissions'
import BookingStatusBadge from './BookingStatusBadge'
import BookingActions from './BookingActions'
import { getProfilePath } from '../../utils/getProfilePath'

export default function BookingCard({ booking }) {
  const navigate = useNavigate()
  const currentUser = useAuthStore((s) => s.user)
  const permissions = getBookingPermissions(booking, currentUser)
  const id = booking._id ?? booking.id

  const counterparty = permissions.isProvider
    ? booking.receiver
    : booking.provider
  const roleLabel = permissions.isProvider
    ? 'You are providing'
    : 'You are receiving'
  const profilePath = getProfilePath(counterparty, currentUser)

  return (
    <div
      className="relative w-full rounded-3xl overflow-hidden transform transition-all hover:-translate-y-1 hover:shadow-2xl"
      onClick={() => navigate(`/bookings/${id}`)}
    >
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              if (profilePath) navigate(profilePath)
            }}
            className="flex items-center gap-4 p-0 bg-transparent border-0"
          >
            <img
              src={
                counterparty?.avatar?.url || 'https://via.placeholder.com/120'
              }
              alt={counterparty?.name || 'User'}
              className="w-14 h-14 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <div className="min-w-0 text-white text-left">
              <p className="text-base font-extrabold truncate">
                {counterparty?.name || 'Unknown User'}
              </p>
              <p className="text-xs opacity-90">{roleLabel}</p>
            </div>
          </button>
          <div className="ml-auto">
            <BookingStatusBadge status={booking.status} className="!ring-0" />
          </div>
        </div>
      </div>

      <div className="bg-[var(--whiteBackground)] flex flex-col sm:flex-row dark:bg-slate-900 p-6 border border-t-0 border-gray-100 dark:border-slate-800 rounded-b-3xl justify-between items-start gap-4">
        <button
          type="button"
          className="text-left w-full sm:max-w-[60%] mb-4 group"
        >
          <p className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors line-clamp-1">
            {booking.listing?.title ?? booking.request?.title ?? 'Booking'}
          </p>
          <div className="flex items-center flex-wrap gap-3 mt-3 text-sm text-gray-500 dark:text-gray-400">
            <span className="inline-flex items-center gap-2">
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M8 7V3M16 7V3M3 11h18M7 21h10a2 2 0 0 0 2-2V8H5v11a2 2 0 0 0 2 2z" />
              </svg>
              {booking.scheduledAt
                ? new Date(booking.scheduledAt).toLocaleString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                : '—'}
            </span>
            {booking.durationHours && <span>⏱ {booking.durationHours}h</span>}
            {booking.credits && (
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                {booking.credits} Credits
              </span>
            )}
          </div>
          {booking.note && (
            <p className="mt-3 text-xs text-gray-500 dark:text-gray-400 border-l-2 border-blue-500/40 pl-2 line-clamp-2">
              <span className="font-bold text-gray-400 dark:text-gray-500 mr-1">Note:</span>
              {booking.note}
            </p>
          )}
        </button>

        <div onClick={(e) => e.stopPropagation()}>
          <BookingActions booking={booking} permissions={permissions} />
        </div>
      </div>
    </div>
  )
}
