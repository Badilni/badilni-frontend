import { FaStar } from 'react-icons/fa6'

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
  const reviewer = review?.reviewer || {}
  const avatar = typeof reviewer.avatar === 'object' ? reviewer.avatar?.url : reviewer.avatar
  const reviewerName = reviewer.name || 'Anonymous'

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

        <div className="flex gap-0.5 text-amber-400 text-xs mt-1">
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
      </div>
      
      {review.comment && (
        <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed pl-1 pt-0.5 break-words">
          {review.comment}
        </p>
      )}
    </div>
  )
}
