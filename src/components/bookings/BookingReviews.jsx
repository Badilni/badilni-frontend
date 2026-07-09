import { useState } from 'react'
import { FiStar } from 'react-icons/fi'
import useAuthStore from '../../store/authStore'
import {
  useBookingReviews,
  useCreateBookingReview,
} from '../../hooks/Review/useReviews'
import ReviewCard from '../reviews/ReviewCard'
import { handleToastMessage } from '../../utils/helper'

export default function BookingReviews({ booking }) {
  const currentUser = useAuthStore((s) => s.user)
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const bookingId = booking._id || booking.id

  const { reviews, isLoading: isReviewsLoading } = useBookingReviews(bookingId)
  const createReviewMutation = useCreateBookingReview(bookingId)

  // Form State
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [comment, setComment] = useState('')
  const [formError, setFormError] = useState('')

  // Determine if booking is completed
  const isCompleted = booking.status === 'completed'

  // Check if current user is a participant
  const isProvider =
    currentUser &&
    (booking.provider?._id === currentUser._id ||
      booking.provider === currentUser._id ||
      booking.provider?.id === currentUser.id)
  const isReceiver =
    currentUser &&
    (booking.receiver?._id === currentUser._id ||
      booking.receiver === currentUser._id ||
      booking.receiver?.id === currentUser.id)
  const isParticipant = isProvider || isReceiver

  // Check if user has already reviewed
  const userHasReviewed = reviews.some(
    (r) =>
      r.reviewer === currentUser?._id ||
      r.reviewer?._id === currentUser?._id ||
      r.reviewer === currentUser?.id ||
      r.reviewer?._id === currentUser?.id
  )

  const canReview =
    isAuthenticated && isCompleted && isParticipant && !userHasReviewed

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
      {/* 1. Leave a Review Form */}
      {canReview && (
        <div className="space-y-4 border-b border-gray-100 dark:border-slate-800 pb-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            Rate this Session
          </h3>
          <p className="text-xs text-gray-500 mb-4">
            This session is completed. Please share your feedback about the
            other participant!
          </p>

          <form onSubmit={handleSubmitReview} className="space-y-4">
            {/* Star Selector */}
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
              placeholder="Write your session feedback here..."
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

      {/* 2. Review List for this Booking */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
          Session Feedback
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
          </div>
        ) : (
          <div className="text-center py-6 text-gray-400 dark:text-gray-500 text-sm">
            {isCompleted
              ? 'No feedback submitted yet for this session.'
              : 'Feedback will be available once the session is completed.'}
          </div>
        )}
      </div>
    </div>
  )
}
