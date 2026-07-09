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

// Helper to generate cleaner avatar fallbacks safely
const getInitials = (name) => {
  if (!name) return '?'
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

const UserReviewCard = ({ review, user }) => {
  if (!user) return null

  const reviewerAvatar =
    typeof user?.avatar === 'object' ? user?.avatar?.url : user?.avatar
  const reviewerInitials = getInitials(user?.name)

  const revieweeAvatar = review?.reviewee?.avatar?.url
  const revieweeInitials = getInitials(review?.reviewee?.name)

  return (
    <div className="group relative bg-[var(--whiteBackground)] p-6 rounded-2xl border border-[var(--secondary-light)]/10 shadow-[0_4px_20px_rgba(47,151,233,0.04)] hover:shadow-[0_8px_30px_rgba(47,151,233,0.08)] transition-all duration-300 flex flex-col gap-5 overflow-hidden">
      {/* Decorative Top Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[var(--primary-light)]/40 to-[var(--secondary-light)]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Header Layout */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        {/* User to User Relationship Flow */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Reviewer */}
          <div className="flex items-center gap-2.5">
            <Link
              to={`/profile/${user?._id}`}
              className="shrink-0 group/avatar"
            >
              {reviewerAvatar ? (
                <img
                  src={reviewerAvatar}
                  alt={user?.name || 'User'}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-transparent group-hover/avatar:ring-[var(--primary-light)] transition-all"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--secondary-light)]/20 to-[var(--primary-light)]/20 text-[var(--primary-light)] flex items-center justify-center font-bold text-xs uppercase">
                  {reviewerInitials}
                </div>
              )}
            </Link>
            <div>
              <Link to={`/profile/${user?._id}`}>
                <h4 className="font-bold text-[var(--black-text)] text-sm hover:text-[var(--primary-light)] transition-colors line-clamp-1">
                  {user?.name || 'Anonymous User'}
                </h4>
              </Link>
            </div>
          </div>

          {/* Directional Indicator */}
          <span className="text-[11px] text-[var(--gray-text)] font-extrabold bg-[var(--secondary-light)]/5 px-2 py-0.5 rounded-md align-items tracking-wider text-center">
             →
          </span>

          {/* Reviewee */}
          <div className="flex items-center gap-2.5">
            <Link
              to={`/profile/${review?.reviewee?._id}`}
              className="shrink-0 group/avatar"
            >
              {revieweeAvatar ? (
                <img
                  src={revieweeAvatar}
                  alt={review?.reviewee?.name || 'User'}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-transparent group-hover/avatar:ring-[var(--primary-light)] transition-all"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--secondary-light)]/10 to-[var(--primary-light)]/10 text-[var(--gray-text)] flex items-center justify-center font-bold text-[10px] uppercase">
                  {revieweeInitials}
                </div>
              )}
            </Link>
            <Link to={`/profile/${review?.reviewee?._id}`}>
              <h5 className="font-semibold text-[var(--primary-light)] text-xs hover:text-[var(--primary-light)] transition-colors line-clamp-1">
                {review?.reviewee?.name || 'Anonymous User'}
              </h5>
            </Link>
          </div>
        </div>

        {/* Right Side: Ratings Column */}
        <div className="flex sm:flex-col items-end justify-between sm:justify-start gap-2 shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-[var(--secondary-light)]/10">
          <StarRating rating={review?.rating ?? 0} size="sm" />
        </div>
      </div>

      {/* Review Comment Body */}
      <div className="relative bg-[var(--secondary-light)]/5 p-4 rounded-xl border border-[var(--secondary-light)]/10">
        {/* Subtle decorative quotation mark icon */}
        <span className="absolute right-3 bottom-1 text-4xl text-[var(--secondary-light)]/10 font-serif select-none pointer-events-none">
          ”
        </span>
        <p className="text-sm text-[var(--black-text)]/80 leading-relaxed relative z-10 font-normal">
          {review?.comment ? (
            `"${review.comment}"`
          ) : (
            <span className="italic text-[var(--gray-text)]">
              No written comment left.
            </span>
          )}
        </p>
      </div>
      <div className="flex justify-between">
        {review?.listing?.title && (
          <Link
            to={`/offers/${review.listing._id}`}
            className="inline-flex items-center gap-1.5 text-[11px] text-[var(--primary-light)] font-medium bg-[var(--primary-light)]/5 hover:bg-[var(--primary-light)]/10 px-2.5 py-1 rounded-full transition-all border border-[var(--primary-light)]/10"
          >
            <span className="w-1 h-1 rounded-full bg-[var(--primary-light)]" />
            Offer:{' '}
            <span className="font-semibold max-w-[120px] truncate">
              {review.listing.title}
            </span>
          </Link>
        )}

        {review?.request?.title && (
          <Link
            to={`/requests/${review.request._id}`}
            className="inline-flex items-center gap-1.5 text-[11px] text-[var(--primary-light)] font-medium bg-[var(--secondary-light)]/5 hover:bg-[var(--secondary-light)]/10 px-2.5 py-1 rounded-full transition-all border border-[var(--secondary-light)]/20"
          >
            <span className="w-1 h-1 rounded-full bg-[var(--secondary-light)]" />
            Request:{' '}
            <span className="font-semibold max-w-[120px] truncate">
              {review.request.title}
            </span>
          </Link>
        )}
        <p className="text-[11px] text-[var(--gray-text)] font-medium flex justify-end">
          {formatDate(review?.createdAt)}
        </p>
      </div>
    </div>
  )
}

export default UserReviewCard
