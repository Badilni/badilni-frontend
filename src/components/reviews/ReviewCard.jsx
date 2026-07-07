import { useState } from 'react'
import { FaStar, FaPen } from 'react-icons/fa6'
import { FiStar } from 'react-icons/fi'
import useAuthStore from '../../store/authStore'
import { useUpdateReview } from '../../hooks/Review/useReviews'
import { handleToastMessage } from '../../utils/helper'

const getInitials = (name) => {
  if (!name) return '?'
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function ReviewCard({ review }) {
  const currentUser = useAuthStore((state) => state.user)
  const reviewer = review?.reviewer || {}
  const avatar =
    typeof reviewer.avatar === 'object' ? reviewer.avatar?.url : reviewer.avatar
  const reviewerName = reviewer.name || 'Anonymous'

  const reviewerId =
    reviewer._id ||
    reviewer.id ||
    (typeof reviewer === 'string' ? reviewer : null)
  const currentUserId = currentUser?._id || currentUser?.id
  const isAuthor = Boolean(
    currentUser && reviewerId && currentUserId && reviewerId === currentUserId
  )

  const listingId = review.listing?._id || review.listing?.id || review.listing
  const bookingId = review.booking?._id || review.booking?.id || review.booking
  const revieweeId =
    review.reviewee?._id || review.reviewee?.id || review.reviewee

  const updateReviewMutation = useUpdateReview(listingId, bookingId, revieweeId)

  const [isEditing, setIsEditing] = useState(false)
  const [rating, setRating] = useState(review.rating ?? 5)
  const [hoverRating, setHoverRating] = useState(0)
  const [comment, setComment] = useState(review.comment ?? '')
  const [error, setError] = useState('')

  const handleStartEdit = () => {
    setRating(review.rating ?? 5)
    setComment(review.comment ?? '')
    setError('')
    setIsEditing(true)
  }

  const handleSave = () => {
    if (rating < 1 || rating > 5) {
      setError('Please select a rating between 1 and 5.')
      return
    }
    if (!comment.trim()) {
      setError('Please write a comment.')
      return
    }

    updateReviewMutation.mutate(
      {
        id: review._id || review.id,
        data: {
          rating,
          comment: comment.trim(),
        },
      },
      {
        onSuccess: () => {
          handleToastMessage('Review updated successfully!', 'success')
          setIsEditing(false)
          setError('')
        },
        onError: (err) => {
          setError(
            err?.response?.data?.message ||
              err?.message ||
              'Failed to update review. Please try again.'
          )
        },
      }
    )
  }

  if (isEditing) {
    return (
      <div className="p-5 rounded-2xl border border-gray-100 dark:border-slate-800/80 bg-gray-50/50 dark:bg-slate-900/50 transition-all duration-200">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide">
              Edit Your Feedback
            </span>

            {/* Star Selector */}
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="text-lg transition-transform active:scale-90 cursor-pointer"
                  disabled={updateReviewMutation.isPending}
                >
                  {star <= (hoverRating || rating) ? (
                    <FaStar className="fill-amber-400 text-amber-400" />
                  ) : (
                    <FiStar className="text-gray-300 dark:text-slate-700" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
            maxLength={1000}
            className="w-full bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all resize-none"
            placeholder="Write your feedback..."
            disabled={updateReviewMutation.isPending}
          />

          {error && (
            <p className="text-[10px] text-red-500 font-semibold">{error}</p>
          )}

          <div className="flex items-center justify-end gap-2">
            <button
              onClick={() => setIsEditing(false)}
              className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-slate-700 text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-800 text-xs font-semibold cursor-pointer transition-colors"
              disabled={updateReviewMutation.isPending}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs font-bold hover:opacity-95 cursor-pointer transition-all disabled:opacity-60"
              disabled={updateReviewMutation.isPending}
            >
              {updateReviewMutation.isPending ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-5 rounded-2xl border border-gray-50 dark:border-slate-800/60 bg-gray-50/30 dark:bg-slate-800/10 hover:border-gray-100 dark:hover:border-slate-800 transition-all duration-200">
      <div className="flex items-start justify-between gap-3 mb-2.5">
        <div className="flex items-center gap-3">
          {avatar ? (
            <img
              src={avatar}
              alt={reviewerName}
              className="w-10 h-10 rounded-full object-cover shrink-0 border border-gray-100 dark:border-slate-800"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--secondary-light)] to-[var(--primary-light)] flex items-center justify-center text-white text-xs font-bold shrink-0">
              {getInitials(reviewerName)}
            </div>
          )}
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white text-sm">
              {reviewerName}
            </h4>
            <p className="text-[10px] text-gray-400 dark:text-gray-500">
              {formatDate(review.createdAt)}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1 mt-1">
          <div className="flex gap-0.5 text-amber-400 text-xs">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                className={
                  star <= (review.rating ?? 0)
                    ? 'fill-amber-400 text-amber-400'
                    : 'text-gray-200 dark:text-slate-800'
                }
              />
            ))}
          </div>
          {isAuthor && (
            <button
              onClick={handleStartEdit}
              className="text-[10px] text-gray-400 hover:text-blue-500 transition-colors flex items-center gap-1 cursor-pointer font-medium"
              title="Edit review"
            >
              <FaPen className="w-2.5 h-2.5" /> Edit
            </button>
          )}
        </div>
      </div>

      {review.comment && (
        <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed pl-1 pt-0.5 break-words">
          {review.comment}
        </p>
      )}
    </div>
  )
}
