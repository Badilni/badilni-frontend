import UserReviewCard from './UserReviewCard'

const ReviewsList = ({ reviews = [], isLoading, isError }) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="h-28 rounded-2xl bg-[var(--background-light)] animate-pulse"
          />
        ))}
      </div>
    )
  }

  if (isError) {
    return (
      <p className="text-sm text-[var(--gray-text)] text-center py-8">
        Couldn&apos;t load reviews. Please try again later.
      </p>
    )
  }

  if (!reviews.length) {
    return (
      <p className="text-sm text-[var(--gray-text)] text-center py-8">
        No reviews yet.
      </p>
    )
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <UserReviewCard key={review._id || review.id} review={review} />
      ))}
    </div>
  )
}

export default ReviewsList
