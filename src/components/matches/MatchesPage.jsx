import { useState } from 'react'
import { useMatches } from '../../hooks/matches/useMatches'
import MatchCard from '../../components/matches/MatchCard'
import MatchCardSkeleton from '../../components/matches/MatchCardSkeleton'
import ErrorState from '../shared/ErrorState'
import EmptyState from '../shared/EmptyState'

const PAGE_SIZE = 9

export default function MatchesPage() {
  const [page, setPage] = useState(1)

  const { data, isLoading, isFetching, isError, error, refetch } = useMatches({
    page,
    limit: PAGE_SIZE,
  })

  // Confirmed from the API response: data.data.matches
  const matches = data?.data?.matches ?? []
  const pagination = data?.pagination ?? {}
  const totalCount = pagination.total ?? matches.length
  const hasMore = page < (pagination.pages ?? 1)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 bg-[var(--primary-light)]/10 text-[var(--primary-light)] text-xs font-bold px-3 py-1.5 rounded-full mb-4">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
          {totalCount} AI matches found
        </div>

        <h1 className="text-3xl md:text-4xl font-black text-[var(--black-text)] dark:text-white mb-2 leading-tight">
          Your Matches
        </h1>
        <p className="text-sm md:text-base text-[var(--gray-text)] max-w-xl leading-relaxed">
          AI-powered pairings between skill offers and service requests across
          the community — tailored to your profile.
        </p>
      </div>

      {isError && <ErrorState message={error?.message} onRetry={refetch} />}

      {!isError && isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <MatchCardSkeleton key={i} />
          ))}
        </div>
      )}

      {!isError && !isLoading && matches.length === 0 && (
        <EmptyState
          title="No matches yet"
          description="Our AI will pair your offers and requests with the best community fits. Check back after posting a skill offer or service request."
          actionLabel={null}
        />
      )}

      {!isError && !isLoading && matches.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matches.map((match) => (
            <MatchCard key={match._id ?? match.id} match={match} />
          ))}
        </div>
      )}

      {hasMore && (
        <div className="mt-14 flex flex-col items-center gap-3">
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={isFetching}
            className="group flex items-center gap-3 border-2 border-[var(--primary-light)]/30 hover:border-[var(--primary-light)] text-[var(--primary-light)] hover:bg-[var(--primary-light)]/5 px-10 py-3.5 rounded-2xl text-sm font-bold transition-all duration-200 disabled:opacity-60"
          >
            {isFetching ? 'Loading…' : 'Load More Matches'}
            <svg
              className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </button>
          <p className="text-xs text-[var(--gray-text)]">
            Showing {matches.length} of {totalCount} matches
          </p>
        </div>
      )}
    </div>
  )
}
