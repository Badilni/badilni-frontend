import { useNavigate } from 'react-router-dom'
import useAuthStore from '../../store/authStore'
import { getProfilePath } from '../../utils/getProfilePath'

function Participant({ label, user, onClick }) {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={onClick}
        className="shrink-0 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
      >
        <img
          src={user?.avatar?.url || 'https://via.placeholder.com/80'}
          alt={user?.name || label}
          className="w-10 h-10 rounded-full object-cover border-2 border-gray-100 dark:border-slate-700 hover:opacity-90 transition-opacity"
        />
      </button>
      <div className="min-w-0">
        <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide">
          {label}
        </p>
        <button
          type="button"
          onClick={onClick}
          className="text-sm font-bold text-gray-900 dark:text-white truncate hover:underline"
        >
          {user?.name || 'Unknown User'}
        </button>
      </div>
    </div>
  )
}

export default function BookingParticipants({ booking }) {
  const navigate = useNavigate()
  const currentUser = useAuthStore((s) => s.user)

  const go = (user) => {
    const path = getProfilePath(user, currentUser)
    if (path) navigate(path)
  }

  return (
    <div className="flex items-center gap-6 flex-wrap">
      <Participant label="Provider" user={booking?.provider} onClick={() => go(booking?.provider)} />
      <div className="text-gray-300 dark:text-slate-600 text-lg font-light select-none">→</div>
      <Participant label="Receiver" user={booking?.receiver} onClick={() => go(booking?.receiver)} />
    </div>
  )
}