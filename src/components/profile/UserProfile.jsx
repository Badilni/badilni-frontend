import { useParams, Navigate } from 'react-router-dom'
import { FiAlertTriangle } from 'react-icons/fi'
import { FaGraduationCap } from 'react-icons/fa'
import { motion } from 'motion/react'
import useAuthStore from '../../store/authStore'
import ProfileHeader from './ProfileHeader'
import { useUserProfile } from '../../hooks/Profile/useUserProfile'
import ProfileReviewsSection from '../reviews/ProfileReviewsMe'
import { useStartChat } from '../../hooks/Chat/useStartChat'
import SkillBadge from './SkillBadge'
import ProfileActivityTabs from '../profile/ProfileActiveTabs'
import ProfileRatingSection from '../reviews/ProfileRatingUser'

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
      {/* <div
        className="text-sm text-[var(--gray-text)] mb-6"
      >
        walletBalance: {profile?.walletBalance ?? 0} credits
      </div> */}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 space-y-5">
          <div className="bg-[var(--whiteBackground)] rounded-2xl p-4 border border-[var(--secondary-light)]/10 shadow-[0_6px_24px_rgba(15,23,42,0.04)]">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs uppercase font-semibold opacity-90">
                    Wallet Balance
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold mt-1">
                    {Number(profile?.walletBalance ?? 0).toLocaleString()}
                    <span className="text-sm font-semibold ml-2 text-blue-100">
                      credits
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <AccountCard email={profile?.email} />
          <SkillsCard skills={skillTags} />
          {/* Review submission form */}
          {/* <ReviewForm reviewedUserId={userId} /> */}
        </div>

        <div className="lg:col-span-8 space-y-6">
          {/* User ratings summary and breakdown */}
          <ProfileRatingSection
            userId={userId}
            averageRating={profile?.averageRating}
            reviewsCount={profile?.reviewsCount}
          />
          {/* List of user reviews */}
          <ProfileReviewsSection userId={userId} />
        </div>
      </div>

      <div className="mt-8">
        <ProfileActivityTabs userId={userId} />
      </div>
    </main>
  )
}

export default UserProfile
