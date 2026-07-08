import { StarRating } from './ReviewCard'
import { Link } from 'react-router-dom'

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

const UserReviewCard = ({ review, user }) => {
  // إذا لم توجد بيانات للمستخدم، لا نعرض الكارت
  if (!user) return null

  const avatarUrl =
    typeof user?.avatar === 'object' ? user?.avatar?.url : user?.avatar
  const initials = user?.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : '?'

  return (
    <div className="bg-[var(--whiteBackground)] p-6 rounded-2xl border border-[var(--secondary-light)]/10 shadow-[0_2px_12px_rgba(47,151,233,0.07)]">
      <div className="flex items-start justify-between mb-4 gap-3">
        <div className="flex items-center gap-3">
          <Link to={`/profile/${user?._id}`} className="shrink-0">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={user?.name || 'User'}
                className="w-11 h-11 rounded-full object-cover border-2 border-[var(--secondary-light)]/20"
              />
            ) : (
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[var(--secondary-light)] to-[var(--primary-light)] flex items-center justify-center text-white font-bold text-xs uppercase">
                {initials}
              </div>
            )}
          </Link>

          <div>
            <Link to={`/profile/${user?._id}`}>
              <h4 className="font-bold text-[var(--black-text)] text-sm hover:text-[var(--primary-light)] transition-colors">
                {user?.name || 'Anonymous User'}
              </h4>
            </Link>
            <div className="flex flex-col gap-0.5">
              <p className="text-[11px] text-[var(--gray-text)]">
                {formatDate(review?.createdAt)}
              </p>
              {review?.listing?.title && (
                <p className="text-[11px] text-[var(--primary-light)] font-medium">
                  For: {review.listing.title}
                </p>
              )}
            </div>
          </div>
        </div>
        <StarRating rating={review?.rating ?? 0} size="sm" />
      </div>

      <p className="text-sm text-[var(--gray-text)] leading-relaxed italic">
        "{review?.comment}"
      </p>
    </div>
  )
}

export default UserReviewCard
