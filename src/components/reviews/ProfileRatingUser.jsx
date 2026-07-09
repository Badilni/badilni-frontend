import { motion } from 'motion/react'
import { StarRating } from '../profile/ReviewCard'
import { useUserReviews } from '../../hooks/Review/useUserReviews'
import { useMyReviews } from '../../hooks/Review/useMyReviews'

// Helper function to calculate rating distribution percentages
const buildRatingBars = (reviews = []) => {
  const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
  reviews.forEach((r) => {
    const star = Math.round(r?.rating)
    if (counts[star] !== undefined) counts[star] += 1
  })
  const total = reviews.length || 1
  return [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    pct: Math.round((counts[stars] / total) * 100),
  }))
}

// Presentational component to render the rating statistics UI
const RatingsCard = ({ averageRating = 0, reviewsCount = 0, reviews = [] }) => {
  const ratingBars = buildRatingBars(reviews)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-[var(--whiteBackground)] rounded-2xl p-6 border border-[var(--secondary-light)]/10 shadow-[0_2px_12px_rgba(47,151,233,0.07)]"
    >
      <h2 className="font-bold text-[var(--black-text)] text-lg mb-6">
        Ratings &amp; Reviews
      </h2>
      <div className="flex flex-col sm:flex-row gap-8 items-center">
        <div className="text-center shrink-0">
          <div className="text-6xl font-extrabold text-[var(--primary-light)] leading-none mb-2">
            {Number(averageRating).toFixed(1)}
          </div>
          <StarRating rating={Math.round(averageRating)} />
          <div className="text-xs text-[var(--gray-text)] mt-2">
            {reviewsCount} {reviewsCount === 1 ? 'Review' : 'Total Reviews'}
          </div>
        </div>

        <div className="flex-1 w-full space-y-2">
          {ratingBars.map(({ stars, pct }) => (
            <div key={stars} className="flex items-center gap-3">
              <span className="w-3 text-xs text-[var(--gray-text)] text-right shrink-0">
                {stars}
              </span>
              <div className="flex-1 h-2.5 bg-[var(--background-light)] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[var(--secondary-light)] to-[var(--primary-light)] transition-all duration-700"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="w-8 text-xs text-[var(--gray-text)]">
                {pct}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// Container component to manage data fetching for both own profile and other users
const ProfileRatingContainer = ({ userId, averageRating, reviewsCount }) => {
  // Fetch reviews for another user
  const userReviewsQuery = useUserReviews({
    userId: userId,
    type: 'received',
    limit: 100,
    fields: 'rating',
    enabled: !!userId,
  })

  console.log(userReviewsQuery)

  // Fetch reviews for the logged-in user
  const myReviewsQuery = useMyReviews({
    type: 'received',
    limit: 100,
    fields: 'rating',
    enabled: !userId,
  })

  console.log(myReviewsQuery)

  // Determine which data source to use based on profile ownership
  const query = userId ? userReviewsQuery : myReviewsQuery
  const statsReviews = query?.data?.data?.reviews || []

  return (
    <RatingsCard
      averageRating={averageRating}
      reviewsCount={reviewsCount ?? statsReviews.length}
      reviews={statsReviews}
    />
  )
}

export default ProfileRatingContainer
