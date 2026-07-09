import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { useNotifications } from '../../hooks/useNotifications'
import useAuthStore from '../../store/authStore'

// ─── Notification type → icon/color mapping ───────────────────────────────

const checkIcon = (
  <svg
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)
const xIcon = (
  <svg
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)
const calIcon = (
  <svg
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
)
const creditIcon = (
  <svg
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)
const starIcon = (
  <svg
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
    />
  </svg>
)
const aiIcon = (
  <svg
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13 10V3L4 14h7v7l9-11h-7z"
    />
  </svg>
)
const bellIcon = (
  <svg
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
    />
  </svg>
)

const TYPE_META = {
  BOOKING_REQUEST: {
    icon: calIcon,
    color: 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400',
    dot: 'bg-blue-500',
  },
  BOOKING_ACCEPTED: {
    icon: checkIcon,
    color:
      'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400',
    dot: 'bg-emerald-500',
  },
  BOOKING_DECLINED: {
    icon: xIcon,
    color: 'bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400',
    dot: 'bg-red-500',
  },
  BOOKING_CANCELLED: {
    icon: xIcon,
    color:
      'bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400',
    dot: 'bg-orange-500',
  },
  BOOKING_COMPLETED: {
    icon: checkIcon,
    color: 'bg-teal-100 dark:bg-teal-900/40 text-teal-600 dark:text-teal-400',
    dot: 'bg-teal-500',
  },
  CREDITS_RELEASED: {
    icon: creditIcon,
    color:
      'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400',
    dot: 'bg-emerald-500',
  },
  CREDITS_REFUNDED: {
    icon: creditIcon,
    color: 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400',
    dot: 'bg-blue-500',
  },
  CREDITS_WELCOME_BONUS: {
    icon: creditIcon,
    color:
      'bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400',
    dot: 'bg-purple-500',
  },
  CREDITS_ADMIN_ADJUSTMENT: {
    icon: creditIcon,
    color:
      'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-600 dark:text-yellow-400',
    dot: 'bg-yellow-500',
  },
  NEW_REVIEW: {
    icon: starIcon,
    color:
      'bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400',
    dot: 'bg-amber-500',
  },
  AI_MATCH: {
    icon: aiIcon,
    color:
      'bg-violet-100 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400',
    dot: 'bg-violet-500',
  },
  DEFAULT: {
    icon: bellIcon,
    color: 'bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-gray-400',
    dot: 'bg-gray-400',
  },
}

function getTypeMeta(type) {
  return TYPE_META[type] ?? TYPE_META.DEFAULT
}

// ─── Relative time formatter ──────────────────────────────────────────────

function relativeTime(dateStr) {
  const diff = (Date.now() - new Date(dateStr).getTime()) / 1000
  if (diff < 60) return 'Just now'
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`
  return new Date(dateStr).toLocaleDateString()
}

// ─── Main Component ───────────────────────────────────────────────────────

export default function NotificationDropdown() {
  const user = useAuthStore((state) => state.user)

  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const [dropdownCoords, setDropdownCoords] = useState({ top: 0, left: 0 })
  const [deletingId, setDeletingId] = useState(null)

  const buttonRef = useRef(null)
  const dropdownRef = useRef(null)

  const {
    notifications,
    unreadCount,
    isLoading,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    isMarkingAll,
  } = useNotifications()

  // ─── Position dropdown ───────────────────────────────────────────────────
  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      const isMobile = window.innerWidth < 640
      const panelW = Math.min(window.innerWidth - 32, 380)
      setDropdownCoords({
        top: rect.bottom + 10,
        left: isMobile
          ? (window.innerWidth - panelW) / 2
          : Math.max(8, rect.right - panelW),
      })
    }
  }, [isOpen])

  // ─── Close on outside click ──────────────────────────────────────────────
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  if (!user) return null

  // ─── Handlers ────────────────────────────────────────────────────────────

  const handleNotificationClick = (n) => {
    if (!n.isRead) markAsRead(n._id)
    setIsOpen(false)

    const type = n.type
    const bookingTypes = [
      'BOOKING_REQUEST',
      'BOOKING_ACCEPTED',
      'BOOKING_DECLINED',
      'BOOKING_CANCELLED',
      'BOOKING_COMPLETED',
      'DISPUTE_FILED',
      'MEETING_LINK_ADDED',
    ]
    const creditsTypes = [
      'CREDITS_RELEASED',
      'CREDITS_REFUNDED',
      'CREDITS_WELCOME_BONUS',
      'CREDITS_ADMIN_ADJUSTMENT',
    ]

    if (bookingTypes.includes(type)) {
      navigate('/booking')
    } else if (creditsTypes.includes(type)) {
      window.dispatchEvent(new Event('open-user-sidebar'))
    } else if (type === 'NEW_REVIEW') {
      navigate('/profile', { state: { scrollToReviews: true } })
    }
  }

  const handleDelete = (e, id) => {
    e.stopPropagation()
    setDeletingId(id)
    deleteNotification(id, {
      onSettled: () => setDeletingId(null),
    })
  }

  const handleMarkAll = () => {
    if (unreadCount > 0) markAllAsRead()
  }

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="inline-block">
      {/* ── Bell Button ───────────────────────────────────── */}
      <button
        ref={buttonRef}
        id="notification-bell-btn"
        onClick={() => setIsOpen((v) => !v)}
        className={`relative p-2.5 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/40 ${
          isOpen
            ? 'bg-gray-200 dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm'
            : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400'
        }`}
        aria-label="Open notifications"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {/* Bell SVG */}
        <svg
          width="20"
          height="20"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          className="transition-transform duration-200"
          style={{ transform: isOpen ? 'rotate(-15deg)' : 'none' }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>

        {/* Unread badge */}
        {unreadCount > 0 && (
          <span
            id="notification-badge"
            className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center bg-red-500 text-white text-[10px] font-bold rounded-full px-1 shadow-md animate-bounce-once"
          >
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {/* ── Dropdown Panel ────────────────────────────────── */}
      {isOpen &&
        createPortal(
          <div
            ref={dropdownRef}
            id="notification-dropdown"
            className="fixed w-[calc(100vw-32px)] sm:w-[380px] bg-white dark:bg-slate-900 rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.25)] dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] overflow-hidden border border-gray-100 dark:border-slate-800 z-[999999]"
            style={{
              top: dropdownCoords.top,
              left: dropdownCoords.left,
              position: 'fixed',
              animation: 'notif-slide-in 0.18s ease',
            }}
          >
            <style>{`
              @keyframes notif-slide-in {
                from { opacity: 0; transform: translateY(-8px) scale(0.97); }
                to   { opacity: 1; transform: translateY(0)   scale(1);    }
              }
              @keyframes bounce-once {
                0%,100% { transform: translateY(0); }
                40%     { transform: translateY(-4px); }
              }
              .animate-bounce-once { animation: bounce-once 0.6s ease; }
            `}</style>

            {/* Header */}
            <div className="px-4 py-3 flex items-center justify-between border-b border-gray-100 dark:border-slate-800 bg-gray-50/80 dark:bg-slate-800/60">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-gray-900 dark:text-white">
                  Notifications
                </span>
                {unreadCount > 0 && (
                  <span className="bg-red-500 text-white text-[10px] font-bold rounded-full px-1.5 py-0.5">
                    {unreadCount} new
                  </span>
                )}
              </div>
              <button
                id="mark-all-read-btn"
                onClick={handleMarkAll}
                disabled={unreadCount === 0 || isMarkingAll}
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-150 px-2 py-1 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/30"
              >
                {isMarkingAll ? 'Marking…' : 'Mark all read'}
              </button>
            </div>

            {/* Body */}
            <div className="max-h-[420px] overflow-y-auto divide-y divide-gray-50 dark:divide-slate-800/60">
              {isLoading ? (
                <LoadingState />
              ) : notifications.length === 0 ? (
                <EmptyState />
              ) : (
                notifications.map((n) => (
                  <NotificationItem
                    key={n._id}
                    notification={n}
                    isDeleting={deletingId === n._id}
                    onClick={() => handleNotificationClick(n)}
                    onDelete={(e) => handleDelete(e, n._id)}
                    // onClick={() => { setIsOpen(false); navigate('/notifications') }}
                  />
                ))
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-gray-100 dark:border-slate-800 px-4 py-2.5">
              <button
                id="see-all-notifications-btn"
                onClick={() => {
                  setIsOpen(false)
                  navigate('/notifications')
                }}
                className="w-full text-center text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 py-1 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-all duration-150"
              >
                See all notifications →
              </button>
            </div>
          </div>,
          document.body
        )}
    </div>
  )
}

// ─── Notification Item ────────────────────────────────────────────────────

function NotificationItem({ notification: n, isDeleting, onClick, onDelete }) {
  const meta = getTypeMeta(n.type)

  return (
    <div
      id={`notification-item-${n._id}`}
      onClick={onClick}
      className={`group relative flex items-start gap-3 px-4 py-3.5 cursor-pointer transition-all duration-150 ${
        n.isRead
          ? 'hover:bg-gray-50 dark:hover:bg-slate-800/40'
          : 'bg-blue-50/40 dark:bg-blue-950/10 hover:bg-blue-50/70 dark:hover:bg-blue-950/20'
      } ${isDeleting ? 'opacity-50 pointer-events-none' : ''}`}
    >
      {/* Unread dot */}
      {!n.isRead && (
        <span
          className={`absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full ${meta.dot} shrink-0`}
        />
      )}

      {/* Type icon */}
      <div
        className={`mt-0.5 w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${meta.color}`}
      >
        {meta.icon}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p
          className={`text-[13px] font-semibold leading-snug mb-0.5 ${n.isRead ? 'text-gray-700 dark:text-gray-300' : 'text-gray-900 dark:text-white'}`}
        >
          {n.title}
        </p>
        <p className="text-[12px] text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2">
          {n.body}
        </p>
        <span className="text-[11px] text-gray-400 dark:text-gray-500 mt-1 block font-medium">
          {relativeTime(n.createdAt)}
        </span>
      </div>

      {/* Delete button */}
      <button
        id={`delete-notification-${n._id}`}
        onClick={onDelete}
        className="opacity-0 group-hover:opacity-100 mt-0.5 p-1.5 rounded-lg text-gray-400 dark:text-gray-500 hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-500 dark:hover:text-red-400 transition-all duration-150 shrink-0"
        title="Delete notification"
        aria-label="Delete this notification"
      >
        {isDeleting ? (
          <svg
            className="w-3.5 h-3.5 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        ) : (
          <svg
            className="w-3.5 h-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        )}
      </button>
    </div>
  )
}

// ─── Loading State ────────────────────────────────────────────────────────

function LoadingState() {
  return (
    <div className="px-4 py-8 flex flex-col items-center gap-3 text-gray-400 dark:text-gray-600">
      <svg
        className="w-6 h-6 animate-spin text-blue-500"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
      <span className="text-xs font-medium">Loading notifications…</span>
    </div>
  )
}

// ─── Empty State ──────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="px-4 py-10 flex flex-col items-center gap-3 text-gray-400 dark:text-gray-500">
      <div className="w-14 h-14 rounded-2xl bg-gray-100 dark:bg-slate-800 flex items-center justify-center">
        <svg
          className="w-7 h-7"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
      </div>
      <div className="text-center">
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          You're all caught up!
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
          No notifications right now.
        </p>
      </div>
    </div>
  )
}
