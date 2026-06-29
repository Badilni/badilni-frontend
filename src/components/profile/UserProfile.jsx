import { useParams, Navigate } from 'react-router-dom'
import { FiAlertTriangle, FiSettings } from 'react-icons/fi'
import { FaGraduationCap } from 'react-icons/fa'
import { motion } from 'motion/react'
import useAuthStore from '../../store/authStore'
import ProfileHeader from './ProfileHeader'
import ReviewsList from './ReviewsList'
import ReviewForm from './ReviewForm'
import { StarRating } from './ReviewCard'
import { useUserProfile } from '../../hooks/Profile/useUserProfile'
import { useUserReviews } from '../../hooks/Review/useReviews'
import { useStartChat } from '../../hooks/Chat/useStartChat'
import SkillBadge from './SkillBadge'
import ProfileActivityTabs from './ProfileActiveTabs'

// Backend only returns an averageRating + reviewsCount, no per-star
// breakdown — so the bars are derived from the reviews list we already
// fetch for this profile, instead of being hardcoded or invented.
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

const SkillsCard = ({ skills }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-[var(--whiteBackground)] rounded-2xl p-6 border border-[var(--secondary-light)]/10 shadow-[0_2px_12px_rgba(47,151,233,0.07)]"
    >
      <div className="flex justify-between items-center mb-5">
        <h2 className="font-bold text-[var(--black-text)] text-lg flex items-center gap-2">
          <FaGraduationCap className="text-[var(--primary-light)]" /> Skills
        </h2>
      </div>
      {skills.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <SkillBadge key={skill} skill={skill} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-[var(--gray-text)]">No skills added yet.</p>
      )}
    </motion.div>
  )
}

const AccountCard = ({ email }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-[var(--whiteBackground)] rounded-2xl p-6 border border-[var(--secondary-light)]/10 shadow-[0_2px_12px_rgba(47,151,233,0.07)]"
    >
      {/* <h2 className="font-bold text-[var(--black-text)] text-lg flex items-center gap-2 mb-5">
        <FiSettings className="text-[var(--primary-light)]" /> Contact Info
      </h2> */}
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-[var(--gray-text)] mb-1.5 uppercase tracking-wide">
            Email Address
          </label>
          <div className="p-3 bg-[var(--background-light)] rounded-lg border border-[var(--gray-text)]/20 flex justify-between items-center">
            <span className="text-sm text-[var(--black-text)]">
              {email || '—'}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

const UserProfile = () => {
  const { userId } = useParams()
  const currentUser = useAuthStore((s) => s.user)
  const isOwnProfile = Boolean(currentUser?._id) && currentUser._id === userId

  const { profile, isLoading, isError, error, refetch } = useUserProfile(
    isOwnProfile ? null : userId
  )
  const {
    reviews,
    isLoading: reviewsLoading,
    isError: reviewsError,
  } = useUserReviews(isOwnProfile ? null : userId)
  const startChatMutation = useStartChat()

  if (isOwnProfile) {
    return <Navigate to="/profile" replace />
  }

  if (isLoading) {
    return (
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-16 flex items-center justify-center">
        <p className="text-[var(--gray-text)] text-sm">Loading profile…</p>
      </main>
    )
  }

  if (isError) {
    return (
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-[var(--whiteBackground)] border border-red-200 rounded-2xl p-8 text-center max-w-md mx-auto"
        >
          <FiAlertTriangle className="mx-auto text-red-500 mb-3" size={28} />
          <p className="text-[var(--black-text)] font-semibold mb-1">
            Couldn&apos;t load this profile
          </p>
          <p className="text-sm text-[var(--gray-text)] mb-5">
            {error?.response?.data?.message ||
              'Something went wrong. Please try again.'}
          </p>
          <button
            onClick={() => refetch()}
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[var(--secondary-light)] to-[var(--primary-light)] text-white text-sm font-semibold hover:opacity-90 transition-all active:scale-95"
          >
            Try Again
          </button>
        </motion.div>
      </main>
    )
  }

  const skillTags = Array.isArray(profile?.skillTags) ? profile.skillTags : []

  return (
    <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 pb-24 md:pb-8">
      <ProfileHeader
        profile={profile}
        isOwnProfile={false}
        onStartChat={() => startChatMutation.mutate(userId)}
        isStartingChat={startChatMutation.isPending}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left column */}
        <div className="lg:col-span-4 space-y-5">
          <AccountCard email={profile?.email} />
          <SkillsCard skills={skillTags} />
          <ReviewForm reviewedUserId={userId} />
        </div>

        {/* Right column */}
        <div className="lg:col-span-8 space-y-6">
          <RatingsCard
            averageRating={profile?.averageRating}
            reviewsCount={profile?.reviewsCount ?? reviews.length}
            reviews={reviews}
          />

          <div className="space-y-4">
            <h3 className="font-bold text-[var(--black-text)] text-lg">
              Reviews ({profile?.reviewsCount ?? reviews.length})
            </h3>
            <ReviewsList
              reviews={reviews}
              isLoading={reviewsLoading}
              isError={reviewsError}
            />
          </div>
        </div>
      </div>

      {/* This user's Service Requests / Offers */}
      <div className="mt-8">
        <ProfileActivityTabs userId={userId} />
      </div>
    </main>
  )
}

export default UserProfile