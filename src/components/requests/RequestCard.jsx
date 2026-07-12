import { useState } from 'react'
import { resolveCategory } from '../../utils/resolveCategory'
import { useNavigate } from 'react-router-dom'
import { FaEllipsisVertical } from 'react-icons/fa6'
import useAuthStore from '../../store/authStore'
import { isOwner as checkIsOwner } from '../../utils/isOwner'
import { getAccentColor } from '../../utils/getAccentColor'
import { getProfilePath } from '../../utils/getProfilePath'
import CreateBookingModal from '../bookings/CreateBookingModal'
import { useRequireAuth } from '../../hooks/useRequierAuth'


export { getAccentColor }

function StarIcon() {
  return (
    <svg
      className="w-3.5 h-3.5 text-amber-400"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  )
}

export default function RequestCard({
  request,
  categories = [],
  onDelete,
  onEdit,
}) {
  const [showMenu, setShowMenu] = useState(false)
  const [bookingOpen, setBookingOpen] = useState(false)

  const currentUser = useAuthStore((state) => state.user)
  const safeRequest = request || {}
  const safeUser = safeRequest.user || {}
  const isOwner = checkIsOwner(currentUser, safeUser)
  const navigate = useNavigate()
  const resolvedCategory = resolveCategory(safeRequest.category, categories)
  const categoryName =
    resolvedCategory?.name || safeRequest.category?.name || 'General'
  const accentColor = getAccentColor(categoryName)
  const profilePath = getProfilePath(safeUser, currentUser)
  const requireAuth = useRequireAuth()

  const deadlineMs = safeRequest.deadline
    ? new Date(safeRequest.deadline).getTime()
    : NaN
  const msUntilDeadline = Number.isFinite(deadlineMs)
    ? deadlineMs - Date.now()
    : Number.POSITIVE_INFINITY
  const isUrgent =
    Number.isFinite(msUntilDeadline) &&
    msUntilDeadline > 0 &&
    msUntilDeadline < 3 * 24 * 60 * 60 * 1000
  const isExpired = Number.isFinite(deadlineMs) && msUntilDeadline <= 0
  const normalizedStatus = String(safeRequest.status || '')
    .trim()
    .toLowerCase()
  const isFulfilled =
    normalizedStatus === 'fulfilled' ||
    normalizedStatus === 'completed' ||
    safeRequest.isFulfilled === true ||
    safeRequest.fulfilled === true ||
    safeRequest.isCompleted === true
  const isUnavailable = isOwner || isExpired || isFulfilled

  const postedAt = safeRequest.createdAt
    ? new Date(safeRequest.createdAt).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
      })
    : 'Recently posted'

  return (
    <>
      <div
        onClick={() =>
          navigate(`/requests/${safeRequest.id ?? safeRequest._id}`)
        }
        className="relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white/95 shadow-[0_10px_30px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1.5 hover:border-indigo-300 hover:shadow-[0_18px_45px_rgba(15,23,42,0.16)] dark:border-slate-700/70 dark:bg-slate-900/90"
      >
        <div className={`h-1 w-full bg-gradient-to-r ${accentColor}`} />

        {isOwner && (
          <div className="absolute top-4 right-4 z-20">
            <button
              onClick={(e) => {
                e.stopPropagation()
                setShowMenu((p) => !p)
              }}
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-500"
            >
              <FaEllipsisVertical size={20} />
            </button>
            {showMenu && (
              <div
                className="absolute right-0 mt-2 w-40 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl shadow-xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => {
                    onEdit?.(safeRequest)
                    setShowMenu(false)
                  }}
                  className="w-full px-4 py-3 text-left text-sm hover:bg-gray-100 dark:hover:bg-slate-800"
                >
                  Edit Request
                </button>
                <button
                  onClick={() => {
                    onDelete?.(safeRequest)
                    setShowMenu(false)
                  }}
                  className="w-full px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  Delete Request
                </button>
              </div>
            )}
          </div>
        )}

        {isFulfilled && (
          <div className="absolute top-5 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-xs font-bold px-3 py-0.5 rounded-full tracking-wide shadow-md z-10">
            FULFILLED
          </div>
        )}
        {!isFulfilled && isExpired && (
          <div className="absolute top-5 left-1/2 -translate-x-1/2 bg-gray-500 text-white text-xs font-bold px-3 py-0.5 rounded-full tracking-wide shadow-md z-10">
            DEADLINE PASSED
          </div>
        )}
        {!isFulfilled && !isExpired && isUrgent && (
          <div className="absolute top-5 left-1/2 -translate-x-1/2 bg-red-500 text-white text-xs font-bold px-3 py-0.5 rounded-full tracking-wide shadow-md z-10">
            URGENT
          </div>
        )}

        <div className="p-7 flex flex-col flex-1">
          <div className="flex items-center justify-between mb-5">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
              {safeRequest.creditsOffered ?? 0} Credits
            </span>
          </div>

          <h2 className="text-base font-black text-gray-900 dark:text-white mb-3 leading-snug">
            {safeRequest.title || 'Service request'}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-5 flex-1 line-clamp-3">
            {safeRequest.description ||
              'A request looking for help from the community.'}
          </p>

          {safeRequest.referenceImages?.[0]?.url && (
            <img
              src={safeRequest.referenceImages[0].url}
              alt="Request attachment"
              className="w-full h-40 object-cover rounded-xl mb-5"
            />
          )}

          {safeRequest.tags?.length > 0 && (
            <div className="mb-6">
              <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
                Tags / Required Skills
              </p>
              <div className="flex flex-wrap gap-2">
                {safeRequest.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {(safeRequest.deadline || categoryName) && (
            <div className="flex items-center gap-4 mb-5">
              {safeRequest.deadline && (
                <div className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Deadline:{' '}
                    {new Date(safeRequest.deadline).toLocaleDateString()}
                  </span>
                </div>
              )}
              {categoryName && (
                <span className="text-xs w-full text-center font-semibold px-3 py-1 rounded-full bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                  {categoryName}
                </span>
              )}
            </div>
          )}

          <span className="text-xs text-gray-400 dark:text-gray-500 items-center flex gap-1 justify-end mb-2">
            <svg
              className="w-3 h-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {postedAt}
          </span>

          <div className="flex items-center gap-3 pt-5 border-t border-gray-100 dark:border-slate-800 mb-5">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                profilePath && navigate(profilePath)
              }}
              className="shrink-0"
            >
              <img
                src={safeUser.avatar?.url || 'https://via.placeholder.com/80'}
                alt={safeUser.name || 'User'}
                className="w-11 h-11 rounded-full object-cover border-2 border-gray-100 dark:border-slate-700 shadow-sm hover:opacity-90 transition-opacity"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'flex'
                }}
              />
            </button>
            <div
              className={`hidden w-11 h-11 rounded-full items-center justify-center text-white font-bold text-lg bg-gradient-to-br ${accentColor} shrink-0`}
            >
              {safeUser.name?.charAt(0) || 'U'}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                {safeUser.name || 'Anonymous User'}
              </p>
              <div className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500">
                <StarIcon />
                <span className="font-semibold text-gray-600 dark:text-gray-300">
                  New
                </span>
                <span>·</span>
                <span className="truncate">{categoryName}</span>
              </div>
            </div>
          </div>

          {/* Book Session — per spec: clicker becomes Provider; hidden for owner and expired */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              requireAuth(() => {
                if (!isUnavailable) setBookingOpen(true)
              })
            }}
            disabled={isUnavailable}
            className={`w-full py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed ${
              isOwner
                ? 'bg-gray-100 dark:bg-slate-800 text-gray-400 cursor-default'
                : isFulfilled
                  ? 'bg-gray-100 dark:bg-slate-800 text-gray-500 cursor-default'
                  : isExpired
                    ? 'bg-gray-100 dark:bg-slate-800 text-gray-500 cursor-default'
                    : `text-white bg-gradient-to-r ${accentColor} hover:shadow-lg hover:brightness-110`
            }`}
          >
            {isOwner
              ? 'Your Request'
              : isFulfilled
                ? 'Fulfilled'
                : isExpired
                  ? 'Deadline Passed'
                  : 'Book Session'}
          </button>
        </div>
      </div>

      {!isOwner && !isUnavailable && (
        <CreateBookingModal
          open={bookingOpen}
          onClose={() => setBookingOpen(false)}
          requestId={safeRequest._id ?? safeRequest.id}
          onSuccess={(booking) => {
            const id = booking?.data?.booking?._id ?? booking?._id
            if (id) navigate(`/bookings/${id}`)
          }}
        />
      )}
    </>
  )
}
