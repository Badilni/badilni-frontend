import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../../store/authStore'
import { getProfilePath } from '../../utils/getProfilePath'
import CreateBookingModal from '../bookings/CreateBookingModal'

// ── Helpers ───────────────────────────────────────────────────────────────────

function ScoreBar({ score }) {
  const pct = Math.round((score ?? 0) * 100)
  const color =
    pct >= 80
      ? 'from-emerald-400 to-teal-500'
      : pct >= 60
        ? 'from-blue-400 to-indigo-500'
        : pct >= 40
          ? 'from-amber-400 to-orange-500'
          : 'from-red-400 to-rose-500'

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[11px] font-bold text-[var(--gray-text)] uppercase tracking-wider">
          Match Score
        </span>
        <span
          className={`text-sm font-black bg-gradient-to-r ${color} bg-clip-text text-transparent`}
        >
          {pct}%
        </span>
      </div>
      <div className="h-2 rounded-full bg-[var(--background-light)] dark:bg-slate-800 overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${color} transition-all duration-700`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

function LinkedCard({ item, type, owner, isOwn, onOwnerClick }) {
  const navigate = useNavigate()
  if (!item) return null

  const isListing = type === 'listing'
  const route = isListing
    ? `/offers/${item._id ?? item.id}`
    : `/requests/${item._id ?? item.id}`

  const accent = isListing
    ? {
        bg: 'bg-blue-50 dark:bg-blue-950/30',
        border: 'border-blue-100 dark:border-blue-900',
        badge:
          'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400',
        tag: 'bg-blue-100/60 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
      }
    : {
        bg: 'bg-emerald-50 dark:bg-emerald-950/30',
        border: 'border-emerald-100 dark:border-emerald-900',
        badge:
          'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400',
        tag: 'bg-emerald-100/60 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400',
      }

  return (
    <div
      className={`rounded-xl border ${accent.bg} ${accent.border} overflow-hidden`}
    >
      {/* Owner row */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          onOwnerClick?.()
        }}
        className="w-full flex items-center gap-2 px-3 pt-3 pb-2 hover:opacity-80 transition-opacity"
      >
        <img
          src={owner?.avatar?.url || 'https://via.placeholder.com/80'}
          alt={owner?.name}
          className="w-6 h-6 rounded-full object-cover border border-white/50 shadow-sm shrink-0"
        />
        <span className="text-[11px] font-semibold text-[var(--gray-text)] truncate flex-1 text-left">
          {owner?.name || '—'}
        </span>
        {isOwn && (
          <span
            className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0 ${accent.badge}`}
          >
            {isListing ? 'Your Offer' : 'Your Request'}
          </span>
        )}
      </button>

      {/* Content — clicking navigates to detail */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          navigate(route)
        }}
        className="w-full text-left px-3 pb-3 hover:opacity-90 transition-opacity"
      >
        <p
          className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${accent.badge.split(' ').slice(-2).join(' ')}`}
        >
          {isListing ? 'Skill Offer' : 'Request'}
        </p>
        <p className="text-xs font-bold line-clamp-2 text-[var(--black-text)] dark:text-white mb-2">
          {item.title}
        </p>

        {/* Rate / credits */}
        {isListing && item.hourlyRate != null && (
          <p className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 mb-2">
            {item.hourlyRate} Credits/hr
          </p>
        )}
        {!isListing && item.creditsOffered != null && (
          <p className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 mb-2">
            {item.creditsOffered} Credits offered
          </p>
        )}

        {item.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {item.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${accent.tag}`}
              >
                #{tag}
              </span>
            ))}
            {item.tags.length > 3 && (
              <span
                className={`text-[10px] font-semibold px-1.5 py-0.5 rounded opacity-60 ${accent.tag}`}
              >
                +{item.tags.length - 3}
              </span>
            )}
          </div>
        )}
      </button>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function MatchCard({ match }) {
  const navigate = useNavigate()
  const currentUser = useAuthStore((s) => s.user)
  const [bookingOpen, setBookingOpen] = useState(false)

  const currentId = currentUser?._id ?? currentUser?.id
  const providerId = match.provider?._id ?? match.provider?.id
  const receiverId = match.receiver?._id ?? match.receiver?.id

  const isProvider = currentId === providerId
  const isReceiver = currentId === receiverId

  const listingId = match.listing?._id ?? match.listing?.id
  const requestId = match.request?._id ?? match.request?.id
  const bookingTarget = isProvider ? { requestId } : { listingId }

  const bookBtnLabel = isProvider
    ? 'Offer to Help'
    : isReceiver
      ? 'Book This Skill'
      : 'Book Session'

  const providerPath = getProfilePath(match.provider, currentUser)
  const receiverPath = getProfilePath(match.receiver, currentUser)
  const matchId = match._id ?? match.id

  return (
    <>
      <div
        className="bg-[var(--whiteBackground)] dark:bg-slate-900 rounded-2xl border border-[var(--secondary-light)]/10 shadow-[0_2px_12px_rgba(47,151,233,0.07)] overflow-hidden hover:shadow-[0_4px_24px_rgba(47,151,233,0.13)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
        onClick={() => navigate(`/matches/${matchId}`)}
      >
        <div className="h-1 w-full bg-gradient-to-r from-[var(--secondary-light)] to-[var(--primary-light)]" />

        <div className="p-5 space-y-4">
          {/* Score */}
          <ScoreBar score={match.matchScore} />

          {/* Offer card + Request card side by side */}
          <div className="grid grid-cols-2 gap-2.5">
            <LinkedCard
              item={match.listing}
              type="listing"
              owner={match.provider}
              isOwn={isProvider}
              onOwnerClick={() => providerPath && navigate(providerPath)}
            />
            <LinkedCard
              item={match.request}
              type="request"
              owner={match.receiver}
              isOwn={isReceiver}
              onOwnerClick={() => receiverPath && navigate(receiverPath)}
            />
          </div>

          {/* AI reasoning */}
          {match.aiReasoning && (
            <div className="bg-[var(--background-light)] dark:bg-slate-800/50 rounded-xl p-3 flex gap-2">
              <svg
                className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[var(--primary-light)]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
              <p className="text-[11px] text-[var(--gray-text)] leading-relaxed line-clamp-2">
                {match.aiReasoning}
              </p>
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-1 border-t border-[var(--secondary-light)]/10">
            <span className="text-[11px] text-[var(--gray-text)]">
              {new Date(match.createdAt).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setBookingOpen(true)
              }}
              className="px-3.5 py-1.5 rounded-xl text-[11px] font-bold text-white bg-gradient-to-r from-[var(--secondary-light)] to-[var(--primary-light)] hover:brightness-110 transition-all active:scale-95 shadow-sm mt-2"
            >
              {bookBtnLabel}
            </button>
          </div>
        </div>
      </div>

      <CreateBookingModal
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
        {...bookingTarget}
        onSuccess={(booking) => {
          const id = booking?.data?.booking?._id ?? booking?._id
          if (id) navigate(`/bookings/${id}`)
        }}
      />
    </>
  )
}
