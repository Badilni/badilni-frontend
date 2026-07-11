import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { FiSearch, FiX, FiAlertTriangle } from 'react-icons/fi'
import { useMyReviews } from '../../hooks/Review/useMyReviews'
import { useUserReviews } from '../../hooks/Review/useUserReviews'
import { useReviewListingOptions } from '../../hooks/Review/useReviewListingOptions'
import UserReviewCard from '../profile/UserReviewCard'
import { StarRating } from '../profile/ReviewCard'

const ProfileReviewsSection = ({ userId }) => {
  const [searchParams] = useSearchParams()
  const bookingParam = searchParams.get('booking') || ''

  const [reviewType, setReviewType] = useState('received')
  const [currentPage, setCurrentPage] = useState(1)
  const [accumulatedReviews, setAccumulatedReviews] = useState([])

  const [keywordInput, setKeywordInput] = useState('')
  const [keyword, setKeyword] = useState('')
  const [selectedListing, setSelectedListing] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => setKeyword(keywordInput.trim()), 400)
    return () => clearTimeout(timer)
  }, [keywordInput])

  const handleFilterChange = (setter, value) => {
    setCurrentPage(1)
    setAccumulatedReviews([])
    setter(value)
  }

  const queryParams = useMemo(
    () => ({
      type: reviewType,
      page: currentPage,
      limit: 5,
      sort: '-createdAt',
      ...(bookingParam && { booking: bookingParam }),
      ...(keyword && { keyword }),
      ...(selectedListing && { listing: selectedListing }),
    }),
    [reviewType, currentPage, bookingParam, keyword, selectedListing]
  )

  const myReviewsQuery = useMyReviews({ ...queryParams, enabled: !userId })
  const userReviewsQuery = useUserReviews({
    userId,
    ...queryParams,
    enabled: !!userId,
  })

  const reviewsQuery = userId ? userReviewsQuery : myReviewsQuery
  const {
    data: reviewsData,
    isFetching,
    isError,
    error,
    isPlaceholderData,
  } = reviewsQuery

  const listingOptionsQuery = useReviewListingOptions({
    userId,
    type: reviewType,
  })

  useEffect(() => {
    if (reviewsData?.data?.reviews && !isPlaceholderData) {
      const fetchedType = queryParams.type
      const newReviews = reviewsData.data.reviews.map((r) => ({
        ...r,
        _fetchedType: fetchedType,
      }))
      setAccumulatedReviews((prev) => {
        if (currentPage === 1) return newReviews
        const filtered = newReviews.filter(
          (newR) => !prev.some((oldR) => oldR._id === newR._id)
        )
        return [...prev, ...filtered]
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reviewsData?.data?.reviews, currentPage, isPlaceholderData])

  return (
    <div className="space-y-4">
      {/* Header card */}
      <div className="bg-[var(--whiteBackground)] p-4 rounded-2xl border border-[var(--secondary-light)]/10 shadow-[0_2px_12px_rgba(47,151,233,0.07)] space-y-4">
        <div className="flex justify-between items-center flex-wrap gap-3">
          <div className="flex flex-col gap-1">
            <h3 className="font-bold text-lg text-[var(--black-text)]">
              Recent Feedback
            </h3>
            {reviewsData?.pagination?.averageRating > 0 && (
              <div className="flex items-center gap-2">
                <StarRating
                  rating={Math.round(reviewsData.pagination.averageRating)}
                  size="sm"
                />
                <span className="text-xs font-bold text-[var(--gray-text)]">
                  {Number(reviewsData.pagination.averageRating).toFixed(1)}
                  <span className="font-normal ml-1">
                    ({reviewsData.pagination.total || 0} reviews)
                  </span>
                </span>
              </div>
            )}
          </div>

          {/* Received / Given toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => handleFilterChange(setReviewType, 'received')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 active:scale-95 ${
                reviewType === 'received'
                  ? 'bg-[var(--primary-light)] text-white shadow-sm'
                  : 'bg-[var(--background-light)] text-[var(--gray-text)] hover:text-[var(--black-text)]'
              }`}
            >
              Received
            </button>
            <button
              onClick={() => handleFilterChange(setReviewType, 'given')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 active:scale-95 ${
                reviewType === 'given'
                  ? 'bg-[var(--primary-light)] text-white shadow-sm'
                  : 'bg-[var(--background-light)] text-[var(--gray-text)] hover:text-[var(--black-text)]'
              }`}
            >
              Given
            </button>
          </div>
        </div>

        {/* Filters row */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Keyword search */}
          <div className="relative flex-1 min-w-[160px]">
            <FiSearch
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--gray-text)]"
            />
            <input
              type="text"
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
              placeholder="Search in reviews..."
              className="w-full pl-9 pr-8 py-2 text-sm bg-[var(--background-light)] border border-[var(--gray-text)]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary-light)]/20 text-[var(--black-text)] placeholder:text-[var(--Disabled)]"
            />
            {keywordInput && (
              <button
                type="button"
                onClick={() => setKeywordInput('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--gray-text)] hover:text-[var(--black-text)] transition-colors"
              >
                <FiX size={14} />
              </button>
            )}
          </div>

          {/* Service / listing filter */}
          <select
            value={selectedListing}
            onChange={(e) =>
              handleFilterChange(setSelectedListing, e.target.value)
            }
            disabled={
              listingOptionsQuery.isLoading ||
              (listingOptionsQuery.data || []).length === 0
            }
            className="text-sm bg-[var(--background-light)] border border-[var(--gray-text)]/20 rounded-xl px-3 py-2 text-[var(--black-text)] disabled:opacity-50 min-w-[150px] focus:outline-none focus:ring-2 focus:ring-[var(--primary-light)]/20"
          >
            <option value="">
              {listingOptionsQuery.isLoading ? 'Loading…' : 'All services'}
            </option>
            {(listingOptionsQuery.data || []).map((l) => (
              <option key={l._id} value={l._id}>
                {l.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Error state */}
      {isError && (
        <div
          className="p-4 rounded-2xl flex items-start gap-2"
          style={{
            backgroundColor: 'var(--backgDangerOpacity)',
            border: '1px solid var(--danger)',
          }}
        >
          <FiAlertTriangle
            size={16}
            className="shrink-0 mt-0.5"
            style={{ color: 'var(--danger)' }}
          />
          <p className="text-xs" style={{ color: 'var(--danger)' }}>
            {error?.response?.data?.message || 'Could not load reviews.'}
          </p>
        </div>
      )}

      {/* Reviews list */}
      {!isError && (
        <>
          {isFetching && accumulatedReviews.length === 0 ? (
            <div className="flex justify-center py-6">
              <div
                className="animate-spin rounded-full h-5 w-5 border-b-2"
                style={{ borderColor: 'var(--primary-light)' }}
              />
            </div>
          ) : accumulatedReviews.length === 0 ? (
            <p
              className="text-xs text-center p-6 rounded-2xl border border-dashed"
              style={{
                color: 'var(--gray-text)',
                borderColor: 'var(--gray-text)',
              }}
            >
              No reviews found.
            </p>
          ) : (
            accumulatedReviews.map((r) => (
              <UserReviewCard key={r._id} review={r} user={r.reviewer} />
            ))
          )}

          {/* Load more */}
          {reviewsData?.pagination &&
            currentPage < reviewsData.pagination.totalPages && (
              <button
                onClick={() => setCurrentPage((p) => p + 1)}
                disabled={isFetching}
                className="w-full py-3 text-sm font-bold rounded-2xl border border-dashed transition-colors active:scale-95 disabled:opacity-50"
                style={{
                  color: 'var(--primary-light)',
                  borderColor: 'var(--primary-light)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--primary-light)'
                  e.currentTarget.style.color = '#fff'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                  e.currentTarget.style.color = 'var(--primary-light)'
                }}
              >
                {isFetching ? 'Loading…' : 'Load More'}
              </button>
            )}
        </>
      )}
    </div>
  )
}

export default ProfileReviewsSection
