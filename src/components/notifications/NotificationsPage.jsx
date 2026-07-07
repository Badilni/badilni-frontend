import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useNotifications } from '../../hooks/useNotifications'

// ─── Type → visual meta ──────────────────────────────────────────────────────

// Shared SVG icons
const I = {
  check: (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  x: (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  cal: (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  ),
  credit: (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  star: (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
      />
    </svg>
  ),
  ai: (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    </svg>
  ),
  bell: (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
      />
    </svg>
  ),
}

const TYPE_META = {
  BOOKING_REQUEST: {
    label: 'Booking Request',
    icon: I.cal,
    iconBg: 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400',
    dot: 'bg-blue-500',
    badge: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
  },
  BOOKING_ACCEPTED: {
    label: 'Booking Accepted',
    icon: I.check,
    iconBg:
      'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400',
    dot: 'bg-emerald-500',
    badge:
      'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300',
  },
  BOOKING_DECLINED: {
    label: 'Booking Declined',
    icon: I.x,
    iconBg: 'bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400',
    dot: 'bg-red-500',
    badge: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300',
  },
  BOOKING_CANCELLED: {
    label: 'Booking Cancelled',
    icon: I.x,
    iconBg:
      'bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400',
    dot: 'bg-orange-500',
    badge:
      'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300',
  },
  BOOKING_COMPLETED: {
    label: 'Session Completed',
    icon: I.check,
    iconBg: 'bg-teal-100 dark:bg-teal-900/40 text-teal-600 dark:text-teal-400',
    dot: 'bg-teal-500',
    badge: 'bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300',
  },
  CREDITS_RELEASED: {
    label: 'Credits Received',
    icon: I.credit,
    iconBg:
      'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400',
    dot: 'bg-emerald-500',
    badge:
      'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300',
  },
  CREDITS_REFUNDED: {
    label: 'Credits Refunded',
    icon: I.credit,
    iconBg: 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400',
    dot: 'bg-blue-500',
    badge: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
  },
  CREDITS_WELCOME_BONUS: {
    label: 'Welcome Bonus',
    icon: I.credit,
    iconBg:
      'bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400',
    dot: 'bg-purple-500',
    badge:
      'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
  },
  CREDITS_ADMIN_ADJUSTMENT: {
    label: 'Credits Adjustment',
    icon: I.credit,
    iconBg:
      'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-600 dark:text-yellow-400',
    dot: 'bg-yellow-500',
    badge:
      'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300',
  },
  NEW_REVIEW: {
    label: 'New Review',
    icon: I.star,
    iconBg:
      'bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400',
    dot: 'bg-amber-500',
    badge:
      'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300',
  },
  AI_MATCH: {
    label: 'AI Match',
    icon: I.ai,
    iconBg:
      'bg-violet-100 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400',
    dot: 'bg-violet-500',
    badge:
      'bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300',
  },
  DEFAULT: {
    label: 'Notification',
    icon: I.bell,
    iconBg: 'bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-gray-400',
    dot: 'bg-gray-400',
    badge: 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300',
  },
}

const getTypeMeta = (type) => TYPE_META[type] ?? TYPE_META.DEFAULT

function relativeTime(dateStr) {
  const diff = (Date.now() - new Date(dateStr).getTime()) / 1000
  if (diff < 60) return 'Just now'
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`
  return new Date(dateStr).toLocaleDateString()
}

// ─── Sidebar filter categories ────────────────────────────────────────────────

const FILTER_TABS = [
  { key: 'all', label: 'All' },
  { key: 'unread', label: 'Unread' },
  // { key: 'BOOKING_ACCEPTED',        label: 'Accepted'  },
  // { key: 'BOOKING_DECLINED',        label: 'Declined'  },
  // { key: 'BOOKING_CANCELLED',       label: 'Cancelled' },
  // { key: 'CREDITS_RELEASED',        label: 'Credits'   },
  // { key: 'NEW_REVIEW',              label: 'Reviews'   },
  // { key: 'AI_MATCH',                label: 'AI Match'  },
]

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function NotificationsPage() {
  const navigate = useNavigate()
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedId, setSelectedId] = useState(null)
  const [deletingId, setDeletingId] = useState(null)
  const [mobileView, setMobileView] = useState('list') // 'list' | 'detail'

  const {
    notifications,
    unreadCount,
    isLoading,
    isError,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    isMarkingAll,
    refetch,
  } = useNotifications()

  // ─── Filtering ──────────────────────────────────────────────────────────────
  const filtered = notifications.filter((n) => {
    if (activeFilter === 'all') return true
    if (activeFilter === 'unread') return !n.isRead
    return n.type === activeFilter
  })

  const selected =
    notifications.find((n) => n._id === selectedId) ?? filtered[0] ?? null

  // ─── Handlers ────────────────────────────────────────────────────────────────
  const handleSelect = (n) => {
    setSelectedId(n._id)
    setMobileView('detail')
    if (!n.isRead) markAsRead(n._id)
  }

  const handleDelete = (id) => {
    setDeletingId(id)
    if (selectedId === id) setSelectedId(null)
    deleteNotification(id, { onSettled: () => setDeletingId(null) })
  }

  // ─── Auto Mark As Read on View ─────────────────────────────────────────────
  useEffect(() => {
    if (selected && !selected.isRead) {
      // Small timeout to prevent state cycle loops during render path
      const t = setTimeout(() => {
        markAsRead(selected._id)
      }, 100)
      return () => clearTimeout(t)
    }
  }, [selected?._id, selected?.isRead, markAsRead])

  return (
    <div className="flex h-[calc(100vh-64px)] w-full bg-gray-50 dark:bg-slate-950 overflow-hidden font-sans">
      <div className="flex w-full h-full relative">
        {/* ── Sidebar ─────────────────────────────────────────────────────── */}
        <aside
          className={`${
            mobileView === 'detail' ? 'hidden' : 'flex'
          } md:flex flex-col w-full md:w-[320px] lg:w-[360px] shrink-0 border-r border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 h-full`}
        >
          {/* Sidebar header */}
          <div className="px-5 pt-5 pb-3 border-b border-gray-100 dark:border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                  Notifications
                </h1>
                {unreadCount > 0 && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {unreadCount} unread
                  </p>
                )}
              </div>
              <button
                id="page-mark-all-read-btn"
                onClick={() => markAllAsRead()}
                disabled={unreadCount === 0 || isMarkingAll}
                title="Mark all as read"
                className="p-2 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 hover:text-blue-600 dark:hover:text-blue-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-150"
              >
                {isMarkingAll ? (
                  <svg
                    className="w-5 h-5 animate-spin"
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
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                    />
                  </svg>
                )}
              </button>
            </div>

            {/* Filter tabs */}
            <div className="flex gap-1.5 flex-wrap">
              {FILTER_TABS.map((tab) => {
                const count =
                  tab.key === 'all'
                    ? notifications.length
                    : tab.key === 'unread'
                      ? unreadCount
                      : notifications.filter((n) => n.type === tab.key).length

                return (
                  <button
                    key={tab.key}
                    id={`filter-tab-${tab.key}`}
                    onClick={() => setActiveFilter(tab.key)}
                    className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg transition-all duration-150 ${
                      activeFilter === tab.key
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {tab.label}
                    {count > 0 && (
                      <span
                        className={`ml-1 ${activeFilter === tab.key ? 'opacity-80' : 'opacity-60'}`}
                      >
                        {count}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Notification list */}
          <div className="flex-1 overflow-y-auto divide-y divide-gray-50 dark:divide-slate-800/60">
            {isLoading && notifications.length === 0 ? (
              <SidebarSkeleton />
            ) : filtered.length > 0 ? (
              <>
                {filtered.map((n) => (
                  <SidebarItem
                    key={n._id}
                    notification={n}
                    isActive={selected?._id === n._id}
                    isDeleting={deletingId === n._id}
                    onClick={() => handleSelect(n)}
                    onDelete={() => handleDelete(n._id)}
                  />
                ))}
              </>
            ) : isError ? (
              <ErrorState onRetry={refetch} />
            ) : (
              <SidebarEmpty filter={activeFilter} />
            )}
          </div>
        </aside>

        {/* ── Detail Panel ──────────────────────────────────────────────────── */}
        <main
          className={`${
            mobileView === 'list' ? 'hidden' : 'flex'
          } md:flex flex-1 flex-col h-full bg-gray-50 dark:bg-slate-950 overflow-hidden`}
        >
          {selected ? (
            <DetailPanel
              notification={selected}
              isDeleting={deletingId === selected._id}
              onDelete={() => handleDelete(selected._id)}
              onBack={() => setMobileView('list')}
              navigate={navigate}
            />
          ) : (
            <EmptyDetail />
          )}
        </main>
      </div>
    </div>
  )
}

// ─── Sidebar Item ─────────────────────────────────────────────────────────────

function SidebarItem({
  notification: n,
  isActive,
  isDeleting,
  onClick,
  onDelete,
}) {
  const meta = getTypeMeta(n.type)

  return (
    <div
      id={`notif-sidebar-item-${n._id}`}
      onClick={onClick}
      className={`group relative flex items-start gap-3 px-4 py-3.5 cursor-pointer transition-all duration-150 select-none ${
        isActive
          ? 'bg-blue-50 dark:bg-blue-950/20 border-r-2 border-blue-600'
          : n.isRead
            ? 'hover:bg-gray-50 dark:hover:bg-slate-800/40'
            : 'bg-blue-50/30 dark:bg-blue-950/10 hover:bg-blue-50/60 dark:hover:bg-blue-950/20'
      } ${isDeleting ? 'opacity-40 pointer-events-none' : ''}`}
    >
      {/* Unread dot */}
      {!n.isRead && (
        <span
          className={`absolute left-1.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full ${meta.dot}`}
        />
      )}

      {/* Icon */}
      <div
        className={`mt-0.5 w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${meta.iconBg}`}
      >
        {meta.icon}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between gap-1 mb-0.5">
          <p
            className={`text-[13px] font-semibold truncate ${n.isRead ? 'text-gray-700 dark:text-gray-300' : 'text-gray-900 dark:text-white'}`}
          >
            {n.title}
          </p>
          <span className="text-[10px] text-gray-400 dark:text-gray-500 shrink-0 font-medium">
            {relativeTime(n.createdAt)}
          </span>
        </div>
        <p className="text-[12px] text-gray-500 dark:text-gray-400 line-clamp-1">
          {n.body}
        </p>
      </div>

      {/* Delete btn */}
      <button
        id={`notif-delete-sidebar-${n._id}`}
        onClick={(e) => {
          e.stopPropagation()
          onDelete()
        }}
        className="opacity-0 group-hover:opacity-100 shrink-0 p-1.5 rounded-lg text-gray-300 dark:text-gray-600 hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-500 dark:hover:text-red-400 transition-all duration-150"
        title="Delete"
      >
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
      </button>
    </div>
  )
}

// ─── Detail Panel ─────────────────────────────────────────────────────────────

function DetailPanel({
  notification: n,
  isDeleting,
  onDelete,
  onBack,
  navigate,
}) {
  const meta = getTypeMeta(n.type)

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center gap-3 shrink-0">
        <button
          onClick={onBack}
          className="md:hidden p-2 -ml-1 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Back to list"
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <span
          className={`text-xs font-semibold px-2.5 py-1 rounded-full ${meta.badge}`}
        >
          {meta.label}
        </span>
        <span className="text-xs text-gray-400 dark:text-gray-500 ml-auto">
          {new Date(n.createdAt).toLocaleString()}
        </span>
        <button
          id={`notif-delete-detail-${n._id}`}
          onClick={onDelete}
          disabled={isDeleting}
          className="p-2 rounded-xl text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 dark:hover:text-red-400 disabled:opacity-40 transition-all duration-150"
          title="Delete notification"
        >
          {isDeleting ? (
            <svg
              className="w-4 h-4 animate-spin"
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
              className="w-4 h-4"
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

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-6 md:p-10 flex flex-col items-center justify-start">
        <div className="w-full max-w-lg">
          {/* Icon */}
          <div
            className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto ${meta.iconBg}`}
          >
            <span className="scale-150">{meta.icon}</span>
          </div>

          {/* Title */}
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white text-center mb-3">
            {n.title}
          </h2>

          {/* Body text */}
          <p className="text-gray-600 dark:text-gray-400 text-center leading-relaxed text-sm md:text-base mb-8">
            {n.body}
          </p>

          {/* Action button redirect if applicable */}
          {(() => {
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

            let btnText = ''
            let onClickAction = null

            if (bookingTypes.includes(n.type)) {
              btnText = 'View Booking Details'
              onClickAction = () => navigate('/booking')
            } else if (creditsTypes.includes(n.type)) {
              btnText = 'Open Wallet Sidebar'
              onClickAction = () =>
                window.dispatchEvent(new Event('open-user-sidebar'))
            } else if (n.type === 'NEW_REVIEW') {
              btnText = 'View Profile Reviews'
              onClickAction = () =>
                navigate('/profile', { state: { scrollToReviews: true } })
            }

            if (!btnText) return null

            return (
              <button
                onClick={onClickAction}
                className="w-full mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-extrabold text-sm py-4 rounded-2xl hover:shadow-lg hover:brightness-110 hover:-translate-y-0.5 active:scale-95 transition-all duration-200 cursor-pointer shadow-md text-center"
              >
                {btnText}
              </button>
            )
          })()}

          {/* Meta card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 p-5 space-y-3 shadow-sm">
            <MetaRow
              label="Type"
              value={
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded-full ${meta.badge}`}
                >
                  {meta.label}
                </span>
              }
            />
            <MetaRow
              label="Status"
              value={
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded-full ${n.isRead ? 'bg-gray-100 dark:bg-slate-800 text-gray-500' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'}`}
                >
                  {n.isRead ? 'Read' : 'Unread'}
                </span>
              }
            />
            <MetaRow
              label="Received"
              value={new Date(n.createdAt).toLocaleString()}
            />
            {n.relatedType && (
              <MetaRow label="Related to" value={n.relatedType} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function MetaRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-xs font-medium text-gray-400 dark:text-gray-500">
        {label}
      </span>
      <span className="text-sm text-gray-700 dark:text-gray-300">{value}</span>
    </div>
  )
}

// ─── Empty / Loading / Error states ──────────────────────────────────────────

function EmptyDetail() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-4 text-gray-400 dark:text-gray-600">
      <div className="w-20 h-20 rounded-3xl bg-gray-100 dark:bg-slate-800 flex items-center justify-center">
        <svg
          className="w-10 h-10"
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
        <p className="font-semibold text-gray-700 dark:text-gray-300">
          Select a notification
        </p>
        <p className="text-sm mt-1">
          Pick one from the list to view its details
        </p>
      </div>
    </div>
  )
}

function SidebarEmpty({ filter }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 px-6 text-center text-gray-400 dark:text-gray-500">
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
      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
        {filter === 'unread' ? 'All caught up!' : 'No notifications'}
      </p>
      <p className="text-xs">
        {filter === 'unread'
          ? 'No unread notifications right now.'
          : `No "${filter}" notifications found.`}
      </p>
    </div>
  )
}

function SidebarSkeleton() {
  return (
    <div className="divide-y divide-gray-50 dark:divide-slate-800">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="flex items-start gap-3 px-4 py-3.5 animate-pulse"
        >
          <div className="w-9 h-9 rounded-xl bg-gray-200 dark:bg-slate-800 shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-3 bg-gray-200 dark:bg-slate-800 rounded w-3/4" />
            <div className="h-2.5 bg-gray-100 dark:bg-slate-700 rounded w-full" />
          </div>
        </div>
      ))}
    </div>
  )
}

function ErrorState({ onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 px-6 text-center">
      <div className="w-14 h-14 rounded-2xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-500">
        <svg
          className="w-7 h-7"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>
      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
        Failed to load
      </p>
      <button
        onClick={onRetry}
        className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
      >
        Try again
      </button>
    </div>
  )
}
