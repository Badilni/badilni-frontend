import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
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
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)

  useEffect(() => {
    const handleTrigger = () => setIsConfirmOpen(true)
    window.addEventListener('trigger-deactivate-modal', handleTrigger)
    return () => window.removeEventListener('trigger-deactivate-modal', handleTrigger)
  }, [])

  if (isLoading) return <div className="py-20 text-center">Loading profile...</div>

  return (
    <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 pb-24">
      <ProfileHeader profile={profile} isOwnProfile={isOwnProfile} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        {/* Left column */}
        <div className="lg:col-span-4 space-y-5">
          <AccountCard email={profile?.email} isOwnProfile={isOwnProfile} />
          <SkillsCard skills={Array.isArray(profile?.skillTags) ? profile.skillTags : []} />

          <div className="bg-gradient-to-br from-[var(--secondary-light)] to-[var(--primary-light)] rounded-2xl p-6 text-white shadow-lg">
            <p className="font-semibold mb-1">Ready to share your knowledge?</p>
            <button className="w-full bg-white text-[var(--primary-light)] font-bold py-2.5 mt-4 rounded-xl text-sm">
              Start a Session
            </button>
          </div>
        </div>

        {/* Right column */}
        <div className="lg:col-span-8 space-y-6">
          <RatingsCard profile={profile} />

          <ProfileReviewsSection userId={userId ? userId : null} />
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
