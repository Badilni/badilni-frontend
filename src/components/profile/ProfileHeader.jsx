import { useNavigate } from 'react-router-dom'
import { MdVerified } from 'react-icons/md'
import { FiEdit2, FiShare2, FiMessageCircle, FiCalendar } from 'react-icons/fi'
import { BsStarFill } from 'react-icons/bs'
import { motion } from 'motion/react'
// import SkillBadge from './SkillBadge'
import { useReviewsCount } from '../../hooks/Review/RatingProfileHeader'

const formatJoinDate = (dateStr) => {
  if (!dateStr) return null
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })
}

/**
 * Presentational header for the Profile page.
 *
 * Reusable for both the logged-in user's own profile (Edit/Share CTAs)
 * and a public read-only view of someone else's profile (Start Chat CTA),
 * toggled via `isOwnProfile`.
 */
const ProfileHeader = ({
  profile,
  onEdit,
  isOwnProfile = true,
  onStartChat,
  isStartingChat = false,
}) => {
  const navigate = useNavigate()

  const reviewsCount = useReviewsCount(profile?._id, isOwnProfile)

  const displayName = profile?.name
  const email = profile?.email
  const bio = profile?.bio?.trim() || "This user hasn't added a bio yet."
  // const skillTags = Array.isArray(profile?.skillTags) ? profile.skillTags : []
  // Defensive: avatar can be `{ url }` (own profile shape) or a plain
  // string (shape used elsewhere, e.g. UserCard).
  const avatarUrl =
    (typeof profile?.avatar === 'object'
      ? profile?.avatar?.url
      : profile?.avatar) || undefined
  const isVerified = Boolean(profile?.isVerified)
  const joinDate = formatJoinDate(profile?.createdAt)
  const averageRating = Number(profile?.averageRating ?? 0)

  const handleEditClick = () => {
    if (onEdit) {
      onEdit()
    } else {
      navigate('/profile/edit')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.75 }}
      className="mb-8 bg-[var(--whiteBackground)] rounded-3xl p-8 border border-[var(--secondary-light)]/10 relative overflow-hidden shadow-[0_4px_24px_rgba(47,151,233,0.10)]"
    >
      <div className="absolute top-0 left-0 w-full h-28 bg-gradient-to-r from-[var(--secondary-light)]/20 to-[var(--primary-light)]/10 pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-center md:items-end gap-8">
        <div className="w-36 h-36 rounded-full border-4 border-white shadow-xl overflow-hidden shrink-0 bg-[var(--background-light)]">
          <img
            src={avatarUrl}
            alt={displayName}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 text-center md:text-left pb-2">
          <div className="flex flex-col md:flex-row md:items-center gap-3 mb-1 justify-center md:justify-start">
            <h1 className="text-2xl md:text-3xl font-extrabold text-[var(--black-text)]">
              {displayName}
            </h1>

            {isVerified && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-[var(--secondary-light)]/10 text-[var(--secondary-light)] text-sm rounded-full font-bold border border-[var(--secondary-light)]/20">
                <MdVerified /> Verified
              </span>
            )}

            <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-50 text-yellow-600 text-sm rounded-full font-bold border border-yellow-200">
              <BsStarFill size={11} /> {averageRating.toFixed(1)} ·{' '}
              {reviewsCount} reviews
            </span>
          </div>

          {email && (
            <p className="text-sm text-[var(--gray-text)] mb-1">{email}</p>
          )}
          {joinDate && (
            <p className="text-xs text-[var(--gray-text)] mb-3 flex items-center gap-1 justify-center md:justify-start">
              <FiCalendar size={12} /> Joined {joinDate}
            </p>
          )}

          <p className="text-[var(--gray-text)] max-w-2xl mb-4 text-sm md:text-base leading-relaxed mx-auto md:mx-0">
            {bio}
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-3">
            {isOwnProfile ? (
              <>
                <button
                  onClick={handleEditClick}
                  className="flex items-center gap-2 bg-gradient-to-r from-[var(--secondary-light)] to-[var(--primary-light)] text-white px-6 py-2.5 rounded-full font-semibold hover:opacity-90 transition-all active:scale-95 shadow-md text-sm"
                >
                  <FiEdit2 size={14} /> Edit Profile
                </button>
                <button className="flex items-center gap-2 bg-[var(--background-light)] text-[var(--gray-text)] border border-[var(--gray-text)]/20 px-6 py-2.5 rounded-full font-semibold hover:bg-[var(--secondary-light)]/5 transition-all active:scale-95 text-sm">
                  <FiShare2 size={14} /> Share
                </button>
              </>
            ) : (
              <button
                onClick={onStartChat}
                disabled={isStartingChat}
                className="flex items-center gap-2 bg-gradient-to-r from-[var(--secondary-light)] to-[var(--primary-light)] text-white px-6 py-2.5 rounded-full font-semibold hover:opacity-90 transition-all active:scale-95 shadow-md text-sm disabled:opacity-60"
              >
                <FiMessageCircle size={14} />
                {isStartingChat ? 'Starting…' : 'Start Chat'}
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ProfileHeader
