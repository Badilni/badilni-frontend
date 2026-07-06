import { useState } from 'react'
import { FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa6'
import { FiStar } from 'react-icons/fi'
import useAuthStore from '../../store/authStore'
import { useListingReviews, useReviews, useCreateReview } from '../../hooks/Review/useReviews'
import { useBookingsLegacy } from '../../hooks/booking/useBookings'
import { handleToastMessage } from '../../utils/helper'
import ReviewCard from '../reviews/ReviewCard'

export default function OfferReviews({ listingId, listingOwnerId }) {
  const currentUser = useAuthStore((state) => state.user)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  
  const [page, setPage] = useState(1)
  const limit = 5

  // Fetch reviews for the current listing
  const { response, isLoading: isReviewsLoading } = useListingReviews(listingId, {
    page,
    limit,
    sort: '-createdAt',
    user: listingOwnerId,
    type: 'received',
  })

  const reviews = response?.data?.reviews ?? response?.reviews ?? []
  const pagination = response?.pagination ?? { page: 1, limit: 5, totalCount: 0, totalPages: 1 }

  // Fetch completed bookings of the current user to see if they can review
  const { bookings: completedBookings } = useBookingsLegacy(
    { status: 'completed' },
    isAuthenticated
  )

  // Fetch reviews given by this user for this listing
  const { reviews: userReviews } = useReviews(
    isAuthenticated && currentUser
      ? { listing: listingId, reviewer: currentUser._id || currentUser.id }
      : null
  )

  // Form State
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [comment, setComment] = useState('')
  const [formError, setFormError] = useState('')

  const createReviewMutation = useCreateReview(currentUser?._id || currentUser?.id, listingId)

  // Determine if there is a booking that can be reviewed
  const completedBookingsForListing = completedBookings.filter(
    (b) => b.listing?._id === listingId || b.listing?.id === listingId || b.listing === listingId
  )

  const unreviewedBooking = completedBookingsForListing.find(
    (b) =>
      !userReviews.some(
        (r) =>
          r.booking === b._id ||
          r.booking === b.id ||
          r.booking?._id === b._id ||
          r.booking?.id === b._id ||
          r.booking?._id === b.id ||
          r.booking?.id === b.id
      )
  )

  const isOwner = currentUser && (currentUser._id === listingOwnerId || currentUser.id === listingOwnerId)
  const canReview = isAuthenticated && !isOwner && unreviewedBooking

  // Rating Breakdown Calculations based on all reviews of the listing
  // To get an accurate breakdown, we would ideally want all ratings.
  // Since we have a paginated list, we can show a nice placeholder or compute based on the loaded reviews.
  // The listing object itself has overall rating statistics. Let's make a beautiful breakdown.
  const totalReviewsCount = pagination.totalCount ?? 0
  const averageRating = totalReviewsCount > 0
    ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length) || 0
    : 0

  // Calculate stars breakdown percentages dynamically
  const breakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
  if (reviews.length > 0) {
    reviews.forEach((r) => {
      const rVal = Math.round(r.rating)
      if (breakdown[rVal] !== undefined) {
        breakdown[rVal]++
      }
    })
  }

  const getPercent = (stars) => {
    if (reviews.length === 0) return 0
    return Math.round((breakdown[stars] / reviews.length) * 100)
  }

  const handleSubmitReview = (e) => {
    e.preventDefault()
    if (!rating) {
      setFormError('Please select a rating.')
      return
    }
    if (!comment.trim()) {
      setFormError('Please write a comment.')
      return
    }

    createReviewMutation.mutate(
      {
        booking: unreviewedBooking._id || unreviewedBooking.id,
        rating,
        comment: comment.trim(),
      },
      {
        onSuccess: () => {
          handleToastMessage('Review submitted successfully!', 'success')
          setRating(0)
          setComment('')
          setFormError('')
        },
        onError: (err) => {
          setFormError(
            err?.response?.data?.message ||
              'Something went wrong while submitting your review.'
          )
        },
      }
    )
  }



  return (
    <div className="space-y-6">
      {/* 1. Rating Stats Header */}
      <div className="bg-[var(--whiteBackground)] dark:bg-slate-900 rounded-3xl p-6 border border-gray-100 dark:border-slate-800 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Reviews & Ratings
        </h3>
        
        {totalReviewsCount > 0 ? (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="text-4xl font-black text-gray-900 dark:text-white">
                {averageRating > 0 ? averageRating.toFixed(1) : '0.0'}
              </div>
              <div>
                <div className="flex gap-0.5 text-amber-400 text-lg">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={star <= Math.round(averageRating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200 dark:text-slate-700'}
                    />
                  ))}
                </div>
                <div className="text-xs text-gray-500 mt-0.5">
                  Based on {totalReviewsCount} {totalReviewsCount === 1 ? 'review' : 'reviews'}
                </div>
              </div>
            </div>

            {/* Rating Breakdown Progress Bars */}
            <div className="space-y-2 pt-2">
              {[5, 4, 3, 2, 1].map((stars) => {
                const pct = getPercent(stars)
                return (
                  <div key={stars} className="flex items-center gap-3 text-sm">
                    <span className="w-3 text-gray-600 dark:text-gray-400 font-semibold text-right">
                      {stars}
                    </span>
                    <FaStar className="text-amber-400 text-xs shrink-0" />
                    <div className="flex-1 bg-gray-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-amber-400 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="w-8 text-gray-400 text-xs text-right">
                      {pct}%
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        ) : (
          <div className="text-center py-6 text-gray-500 dark:text-gray-400">
            <p className="text-sm">No reviews yet for this offer.</p>
          </div>
        )}
      </div>

      {/* 2. Leave a Review Form (If eligible) */}
      {canReview && (
        <div className="bg-[var(--whiteBackground)] dark:bg-slate-900 rounded-3xl p-6 border border-gray-100 dark:border-slate-800 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
            Leave a Review
          </h3>
          <p className="text-xs text-gray-500 mb-4">
            You completed a booking for this offer. Share your experience!
          </p>

          <form onSubmit={handleSubmitReview} className="space-y-4">
            {/* Star selector */}
            <div className="flex gap-1.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="text-3xl transition-transform active:scale-90"
                  aria-label={`Rate ${star} stars`}
                >
                  <FiStar
                    className={
                      star <= (hoverRating || rating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-gray-300 dark:text-slate-700'
                    }
                  />
                </button>
              ))}
            </div>

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              placeholder="Write your review here..."
              maxLength={1000}
              className="w-full bg-gray-50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-800 rounded-2xl px-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--primary-light)]/40 transition-all resize-none"
            />

            {formError && (
              <p className="text-xs text-red-500 font-semibold">{formError}</p>
            )}

            <button
              type="submit"
              disabled={createReviewMutation.isPending}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-[var(--secondary-light)] to-[var(--primary-light)] text-white text-sm font-bold hover:opacity-95 active:scale-98 transition-all disabled:opacity-60 cursor-pointer shadow-sm shadow-blue-500/20"
            >
              {createReviewMutation.isPending ? 'Submitting…' : 'Submit Review'}
            </button>
          </form>
        </div>
      )}

      {/* Booking Status Prompt (Friendly banner) */}
      {isAuthenticated && !isOwner && !canReview && completedBookingsForListing.length === 0 && (
        <div className="bg-blue-50/50 dark:bg-blue-950/10 rounded-2xl p-4 border border-blue-100/30 dark:border-blue-950/20 text-center text-xs text-blue-600 dark:text-blue-400">
          Book this service and complete the session to leave a review!
        </div>
      )}

      {/* 3. Reviews List */}
      <div className="bg-[var(--whiteBackground)] dark:bg-slate-900 rounded-3xl p-6 border border-gray-100 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
          User Feedback
        </h3>

        {isReviewsLoading ? (
          <div className="space-y-4 py-2">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="h-24 rounded-2xl bg-gray-50 dark:bg-slate-800 animate-pulse"
              />
            ))}
          </div>
        ) : reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((review) => (
              <ReviewCard key={review._id || review.id} review={review} />
            ))}

            {/* Pagination Controls */}
            {pagination.totalPages > 1 && (
              <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-slate-800 text-xs">
                <button
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-gray-100 dark:border-slate-800 text-gray-600 dark:text-gray-400 disabled:opacity-40 hover:bg-gray-50 dark:hover:bg-slate-800 cursor-pointer disabled:cursor-not-allowed"
                >
                  <FaChevronLeft className="text-[10px]" /> Prev
                </button>
                <span className="text-gray-500 font-medium">
                  Page {page} of {pagination.totalPages}
                </span>
                <button
                  onClick={() => setPage((prev) => Math.min(prev + 1, pagination.totalPages))}
                  disabled={page === pagination.totalPages}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-gray-100 dark:border-slate-800 text-gray-600 dark:text-gray-400 disabled:opacity-40 hover:bg-gray-50 dark:hover:bg-slate-800 cursor-pointer disabled:cursor-not-allowed"
                >
                  Next <FaChevronRight className="text-[10px]" />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-4 text-gray-400 dark:text-gray-500 text-xs">
            No text reviews found.
          </div>
        )}
      </div>
    </div>
  )
}
