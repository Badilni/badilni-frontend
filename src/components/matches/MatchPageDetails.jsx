import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useMatch } from '../../hooks/matches/useMatches'
import useAuthStore from '../../store/authStore'
import { getProfilePath } from '../../utils/getProfilePath'
import CreateBookingModal from '../../components/bookings/CreateBookingModal'
import ErrorState from '../../components/shared/ErrorState'

// ── Sub-components ────────────────────────────────────────────────────────────

function ScoreRing({ score }) {
  const pct = Math.round((score ?? 0) * 100)
  const radius = 36
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (pct / 100) * circumference

  const color =
    pct >= 80 ? '#10b981' : pct >= 60 ? '#6366f1' : pct >= 40 ? '#f59e0b' : '#ef4444'

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-24 h-24">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 88 88">
          <circle
            cx="44" cy="44" r={radius}
            fill="none"
            stroke="var(--background-light)"
            strokeWidth="8"
          />
          <circle
            cx="44" cy="44" r={radius}
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-700"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-black" style={{ color }}>{pct}%</span>
        </div>
      </div>
      <span className="text-xs font-bold text-[var(--gray-text)] uppercase tracking-wider">
        Match Score
      </span>
    </div>
  )
}

function ParticipantCard({ label, user, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex-1 flex flex-col items-center gap-3 p-5 bg-[var(--background-light)] dark:bg-slate-800/50 rounded-2xl hover:bg-[var(--primary-light)]/5 transition-colors group"
    >
      <img
        src={user?.avatar?.url || 'https://via.placeholder.com/80'}
        alt={user?.name || 'User'}
        className="w-16 h-16 rounded-full object-cover border-2 border-[var(--secondary-light)]/30 shadow-md group-hover:border-[var(--primary-light)]/40 transition-colors"
      />
      <div className="text-center">
        <p className="text-[10px] font-bold text-[var(--gray-text)] uppercase tracking-widest mb-1">
          {label}
        </p>
        <p className="text-sm font-bold text-[var(--black-text)] dark:text-white group-hover:text-[var(--primary-light)] transition-colors">
          {user?.name || '—'}
        </p>
      </div>
    </button>
  )
}

function LinkedItem({ item, type }) {
  const navigate = useNavigate()
  if (!item) return null

  const isListing = type === 'listing'
  const route = isListing
    ? `/offers/${item._id ?? item.id}`
    : `/requests/${item._id ?? item.id}`

  return (
    <button
      type="button"
      onClick={() => navigate(route)}
      className={`w-full text-left p-5 rounded-2xl border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
        isListing
          ? 'bg-blue-50 dark:bg-blue-950/30 border-blue-100 dark:border-blue-900'
          : 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-900'
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <span
          className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
            isListing
              ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400'
              : 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400'
          }`}
        >
          {isListing ? 'Skill Offer' : 'Service Request'}
        </span>
        {item.category?.name && (
          <span className="text-[10px] text-[var(--gray-text)] font-semibold truncate">
            {item.category.name}
          </span>
        )}
      </div>

      <p className="text-sm font-bold text-[var(--black-text)] dark:text-white mb-3 leading-snug">
        {item.title}
      </p>

      <div className="flex items-center justify-between flex-wrap gap-2">
        {isListing && item.hourlyRate != null && (
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
            {item.hourlyRate} Credits/hr
          </span>
        )}
        {!isListing && item.creditsOffered != null && (
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
            {item.creditsOffered} Credits offered
          </span>
        )}

        {item.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {item.tags.slice(0, 5).map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-white/70 dark:bg-black/20 text-[var(--gray-text)]"
              >
                #{tag}
              </span>
            ))}
            {item.tags.length > 5 && (
              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-white/70 dark:bg-black/20 text-[var(--gray-text)] opacity-60">
                +{item.tags.length - 5}
              </span>
            )}
          </div>
        )}
      </div>

      <p className="mt-3 text-xs font-semibold text-[var(--primary-light)] opacity-70">
        View details →
      </p>
    </button>
  )
}

// ── Skeleton ──────────────────────────────────────────────────────────────────

function MatchPageSkeleton() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-pulse">
      <div className="h-6 w-32 rounded-full bg-gray-100 dark:bg-slate-800 mb-8" />
      <div className="bg-[var(--whiteBackground)] dark:bg-slate-900 rounded-3xl border border-[var(--secondary-light)]/10 overflow-hidden">
        <div className="h-1.5 w-full bg-gray-100 dark:bg-slate-800" />
        <div className="p-8 space-y-8">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-gray-100 dark:bg-slate-800" />
            <div className="flex-1 space-y-2 w-full">
              <div className="h-4 w-48 rounded bg-gray-100 dark:bg-slate-800" />
              <div className="h-3 w-64 rounded bg-gray-100 dark:bg-slate-800" />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1 h-32 rounded-2xl bg-gray-100 dark:bg-slate-800" />
            <div className="flex-1 h-32 rounded-2xl bg-gray-100 dark:bg-slate-800" />
          </div>
          <div className="h-20 rounded-2xl bg-gray-100 dark:bg-slate-800" />
        </div>
      </div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function MatchPageDetails() {
  const { matchId } = useParams()
  const navigate = useNavigate()
  const currentUser = useAuthStore((s) => s.user)
  const { data, isLoading, isError, error, refetch } = useMatch(matchId)
  const [bookingOpen, setBookingOpen] = useState(false)

  const match = data?.data?.match

  if (isLoading) return <MatchPageSkeleton />
  if (isError) return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <ErrorState message={error?.message} onRetry={refetch} />
    </div>
  )
  if (!match) return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center text-[var(--gray-text)]">
      Match not found.
    </div>
  )

  // Contextual booking targeting and label definitions matching the list view setup
  const currentId = currentUser?._id ?? currentUser?.id
  const providerId = match.provider?._id ?? match.provider?.id
  const receiverId = match.receiver?._id ?? match.receiver?.id

  const isProvider = currentId === providerId
  const isReceiver = currentId === receiverId

  const listingId = match.listing?._id ?? match.listing?.id
  const requestId = match.request?._id ?? match.request?.id
  
  const bookingTarget = isProvider
    ? { requestId }
    : { listingId }

  const bookBtnLabel = isProvider ? 'Offer to Help' : isReceiver ? 'Book This Skill' : 'Book Session'

  const providerPath = getProfilePath(match.provider, currentUser)
  const receiverPath = getProfilePath(match.receiver, currentUser)

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Back */}
      <button
        type="button"
        onClick={() => navigate('/matches')}
        className="flex items-center gap-2 text-sm font-semibold text-[var(--gray-text)] hover:text-[var(--black-text)] dark:hover:text-white transition-colors mb-8"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Matches
      </button>

      <div className="bg-[var(--whiteBackground)] dark:bg-slate-900 rounded-3xl border border-[var(--secondary-light)]/10 shadow-[0_2px_12px_rgba(47,151,233,0.07)] overflow-hidden">
        {/* Top gradient accent */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[var(--secondary-light)] to-[var(--primary-light)]" />

        <div className="p-8 space-y-8">
          {/* Score + date row */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <ScoreRing score={match.matchScore} />
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl font-black text-[var(--black-text)] dark:text-white mb-1">
                AI Match
              </h1>
              <p className="text-sm text-[var(--gray-text)]">
                Generated on{' '}
                {new Date(match.createdAt).toLocaleDateString(undefined, {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  })
                }
              </p>
            </div>

            <button
              type="button"
              onClick={() => setBookingOpen(true)}
              className="shrink-0 px-6 py-3 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-[var(--secondary-light)] to-[var(--primary-light)] hover:brightness-110 transition-all active:scale-95 shadow-md"
            >
              {bookBtnLabel}
            </button>
          </div>

          {/* Participants */}
          <div>
            <p className="text-xs font-bold text-[var(--gray-text)] uppercase tracking-wider mb-3">
              Participants
            </p>
            <div className="flex items-center gap-4">
              <ParticipantCard
                label="Provider"
                user={match.provider}
                onClick={() => providerPath && navigate(providerPath)}
              />
              <div className="flex flex-col items-center gap-1 shrink-0">
                <div className="h-px w-8 bg-gradient-to-r from-[var(--secondary-light)] to-[var(--primary-light)]" />
                <svg className="w-5 h-5 text-[var(--primary-light)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                <div className="h-px w-8 bg-gradient-to-r from-[var(--secondary-light)] to-[var(--primary-light)]" />
              </div>
              <ParticipantCard
                label="Receiver"
                user={match.receiver}
                onClick={() => receiverPath && navigate(receiverPath)}
              />
            </div>
          </div>

          {/* Linked offer + request */}
          <div>
            <p className="text-xs font-bold text-[var(--gray-text)] uppercase tracking-wider mb-3">
              Matched Pair
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <LinkedItem item={match.listing} type="listing" />
              <LinkedItem item={match.request} type="request" />
            </div>
          </div>

          {/* AI Reasoning */}
          {match.aiReasoning && (
            <div>
              <p className="text-xs font-bold text-[var(--gray-text)] uppercase tracking-wider mb-3">
                AI Reasoning
              </p>
              <div className="bg-[var(--background-light)] dark:bg-slate-800/50 rounded-2xl p-5 flex gap-3">
                <div className="shrink-0 w-8 h-8 rounded-xl bg-gradient-to-br from-[var(--secondary-light)] to-[var(--primary-light)] flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                </div>
                <p className="text-sm text-[var(--gray-text)] leading-relaxed">
                  {match.aiReasoning}
                </p>
              </div>
            </div>
          )}
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
    </div>
  )
}