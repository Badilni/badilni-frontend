const StarRating = ({ rating = 5, size = 'md' }) => {
  const sizeClass = size === 'sm' ? 'text-sm' : 'text-base'
  return (
    <div className={`flex gap-0.5 text-yellow-400 ${sizeClass}`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i}>{i <= rating ? '★' : '☆'}</span>
      ))}
    </div>
  )
}

const ReviewCard = ({ name, session, time, img, comment, rating = 5 }) => {
  const initials = name
    ? name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
    : '?'

  return (
    <div className="bg-[var(--whiteBackground)] p-6 rounded-2xl border border-[var(--secondary-light)]/10 shadow-[0_2px_12px_rgba(47,151,233,0.07)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(47,151,233,0.12)]">
      <div className="flex items-start justify-between mb-4 gap-3">
        <div className="flex items-center gap-3">
          {img ? (
            <img
              src={img}
              alt={name}
              className="w-11 h-11 rounded-full object-cover border-2 border-[var(--secondary-light)]/20 shrink-0"
            />
          ) : (
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[var(--secondary-light)] to-[var(--primary-light)] flex items-center justify-center text-white font-bold shrink-0">
              {initials}
            </div>
          )}
          <div>
            <h4 className="font-bold text-[var(--black-text)] text-sm">
              {name}
            </h4>
            <p className="text-xs text-[var(--gray-text)]">
              {session && `Session: ${session} • `}
              {time}
            </p>
          </div>
        </div>
        <StarRating rating={rating} size="sm" />
      </div>
      <p className="text-sm text-[var(--gray-text)] leading-relaxed">
        {comment}
      </p>
    </div>
  )
}

export { StarRating }
export default ReviewCard
