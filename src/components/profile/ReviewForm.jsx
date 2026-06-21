import { useState } from 'react'
import { FiStar } from 'react-icons/fi'
import { handleToastMessage } from '../../utils/helper'
import { useCreateReview } from '../../hooks/Review/useReviews'

const ReviewForm = ({ reviewedUserId }) => {
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [comment, setComment] = useState('')
  const [error, setError] = useState('')

  const createReviewMutation = useCreateReview(reviewedUserId)

  const handleSubmit = () => {
    if (!rating) {
      setError('Please select a rating.')
      return
    }
    if (!comment.trim()) {
      setError('Please write a review before submitting.')
      return
    }

    createReviewMutation.mutate(
      { reviewedUserId, rating, comment: comment.trim() },
      {
        onSuccess: () => {
          handleToastMessage('Review submitted successfully!', 'success')
          setRating(0)
          setComment('')
          setError('')
        },
        onError: (err) => {
          handleToastMessage(
            err?.response?.data?.message ||
              'Something went wrong while submitting your review.',
            'error'
          )
        },
      }
    )
  }

  return (
    <div className="bg-[var(--whiteBackground)] rounded-2xl p-6 border border-[var(--secondary-light)]/10 shadow-[0_2px_12px_rgba(47,151,233,0.07)]">
      <h3 className="font-bold text-[var(--black-text)] text-lg mb-4">
        Leave a Review
      </h3>

      <div className="flex gap-1 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            className="text-2xl transition-transform active:scale-90"
            aria-label={`Rate ${star} stars`}
          >
            <FiStar
              className={
                star <= (hoverRating || rating)
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-[var(--gray-text)]/40'
              }
            />
          </button>
        ))}
      </div>

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={4}
        placeholder="Share your experience..."
        className="w-full bg-[var(--background-light)] border border-[var(--gray-text)]/20 rounded-xl px-4 py-3 text-sm text-[var(--black-text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-light)]/40 transition-all resize-none mb-3"
      />

      {error && <p className="text-xs text-red-500 mb-3">{error}</p>}

      <button
        onClick={handleSubmit}
        disabled={createReviewMutation.isPending}
        className="w-full sm:w-auto px-7 py-2.5 rounded-full bg-gradient-to-r from-[var(--secondary-light)] to-[var(--primary-light)] text-white text-sm font-semibold hover:opacity-90 active:scale-95 transition-all disabled:opacity-60"
      >
        {createReviewMutation.isPending ? 'Submitting…' : 'Submit Review'}
      </button>
    </div>
  )
}

export default ReviewForm
