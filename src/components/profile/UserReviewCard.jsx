import { StarRating } from './ReviewCard'

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

const UserReviewCard = ({ review }) => {
  const reviewer = review?.reviewer || review?.user || {}
  const avatarUrl =
    typeof reviewer.avatar === 'object' ? reviewer.avatar?.url : reviewer.avatar

  const initials = reviewer.name
    ? reviewer.name.split(' ').map((n) => n[0]).join('').slice(0, 2)
    : '?'

  return (
    <div className="bg-[var(--whiteBackground)] p-6 rounded-2xl border border-[var(--secondary-light)]/10 shadow-[0_2px_12px_rgba(47,151,233,0.07)]">
      <div className="flex items-start justify-between mb-4 gap-3">
        <div className="flex items-center gap-3">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={reviewer.name}
              className="w-11 h-11 rounded-full object-cover border-2 border-[var(--secondary-light)]/20 shrink-0"
            />
          ) : (
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[var(--secondary-light)] to-[var(--primary-light)] flex items-center justify-center text-white font-bold shrink-0">
              {initials}
            </div>
          )}
          <div>
            <h4 className="font-bold text-[var(--black-text)] text-sm">
              {reviewer.name || 'Anonymous'}
            </h4>
            <p className="text-xs text-[var(--gray-text)]">{formatDate(review?.createdAt)}</p>
          </div>
        </div>
        <StarRating rating={review?.rating ?? 0} size="sm" />
      </div>
      <p className="text-sm text-[var(--gray-text)] leading-relaxed">{review?.comment}</p>
    </div>
  )
}

export default UserReviewCard