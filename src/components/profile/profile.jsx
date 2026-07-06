import { useState, useEffect } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { FaGraduationCap } from 'react-icons/fa'
import { FiSettings, FiLock, FiKey } from 'react-icons/fi'
import ProfileHeader from './ProfileHeader'
import ProfileActivityTabs from './ProfileActiveTabs'
import ProfileReviewsSection from '../reviews/ProfileReviewsMe'
import RatingsCard from '../reviews/RatingsCard'
import DeactivateButton from '../DeactiveateMe/Deactiveate'
import DeactivateConfirmModal from '../DeactiveateMe/DeactivateConfirmModal'
import { useProfile } from '../../hooks/Profile/useProfile'

const openConfirmModal = () => {
  window.dispatchEvent(new CustomEvent('trigger-deactivate-modal'))
}

// --- Sub-components ---

const SkillsCard = ({ skills }) => (
  <div className="bg-[var(--whiteBackground)] rounded-2xl p-6 border border-[var(--secondary-light)]/10 shadow-[0_2px_12px_rgba(47,151,233,0.07)]">
    <h2 className="font-bold text-[var(--black-text)] text-lg flex items-center gap-2 mb-5">
      <FaGraduationCap className="text-[var(--primary-light)]" /> Skills
    </h2>
    {skills?.length > 0 ? (
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span key={skill} className="px-4 py-1.5 bg-[var(--primary-light)]/10 text-[var(--primary-light)] rounded-full text-sm font-medium border border-[var(--primary-light)]/20">
            {skill}
          </span>
        ))}
      </div>
    ) : (
      <p className="text-sm text-[var(--gray-text)]">No skills added yet.</p>
    )}
  </div>
)

const AccountCard = ({ email, isOwnProfile }) => {
  const navigate = useNavigate()
  if (!isOwnProfile) return null

  return (
    <div className="bg-[var(--whiteBackground)] rounded-2xl p-6 border border-[var(--secondary-light)]/10 shadow-[0_2px_12px_rgba(47,151,233,0.07)]">
      <h2 className="font-bold text-[var(--black-text)] text-lg flex items-center gap-2 mb-5">
        <FiSettings className="text-[var(--primary-light)]" /> Account Settings
      </h2>
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-[var(--gray-text)] mb-1.5 uppercase">Email Address</label>
          <div className="p-3 bg-[var(--background-light)] rounded-lg border border-[var(--gray-text)]/20 flex justify-between items-center">
            <span className="text-sm text-[var(--black-text)]">{email || '—'}</span>
            <FiLock size={14} className="text-[var(--gray-text)]" />
          </div>
        </div>
        <button onClick={() => navigate('/resetEmail')} className="w-full flex items-center justify-center gap-2 border border-[var(--primary-light)] text-[var(--primary-light)] font-semibold py-2.5 rounded-xl text-sm">
          <FiKey size={15} /> Reset Email
        </button>
        <DeactivateButton onClick={openConfirmModal} />
      </div>
    </div>
  )
}

// --- Main Profile Component ---

const ProfileScreen = () => {
  const { userId } = useParams()
  const { profile, isLoading } = useProfile(userId)
  const currentLoggedUserId = localStorage.getItem('userId')
  const isOwnProfile = !userId || userId === currentLoggedUserId

  const navigate = useNavigate()
  const location = useLocation()
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)

  useEffect(() => {
    const handleTrigger = () => setIsConfirmOpen(true)
    window.addEventListener('trigger-deactivate-modal', handleTrigger)
    return () => window.removeEventListener('trigger-deactivate-modal', handleTrigger)
  }, [])

  // Handle smooth scroll to reviews if redirected from notification click
  useEffect(() => {
    if (location.hash === '#reviews' || location.state?.scrollToReviews) {
      // Small timeout to allow element rendering to complete
      const t = setTimeout(() => {
        const element = document.getElementById('profile-reviews-section')
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 300)
      return () => clearTimeout(t)
    }
  }, [location.hash, location.state])

  if (isLoading) return <div className="py-20 text-center">Loading profile...</div>

  return (
    <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 pb-24">
      <ProfileHeader profile={profile} isOwnProfile={isOwnProfile} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        {/* Left column */}
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
          <AccountCard email={profile?.email} isOwnProfile={isOwnProfile} />
          <SkillsCard skills={Array.isArray(profile?.skillTags) ? profile.skillTags : []} />
        </div>

        {/* Right column */}
        <div className="lg:col-span-8 space-y-6">
          <div id="profile-reviews-section" className="space-y-6 scroll-mt-20">
            <RatingsCard profile={profile} />
            <ProfileReviewsSection userId={userId ? userId : null} />
          </div>
          <ProfileActivityTabs isOwnProfile={isOwnProfile} />
        </div>
      </div>

      <DeactivateConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={() => { setIsConfirmOpen(false); navigate('/signIn') }}
      />
    </main>
  )
}

export default ProfileScreen
