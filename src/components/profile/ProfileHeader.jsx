import { useNavigate } from 'react-router-dom'
import useAuthStore from '../../store/authStore'
import { MdVerified } from 'react-icons/md'
import { FiEdit2, FiShare2 } from 'react-icons/fi'

const ProfileHeader = () => {
  const navigate = useNavigate()
  const user = useAuthStore((s) => s.user)

  const displayName = user?.name || user?.username || 'Skill Master'
  const title = user?.title || 'Verified Mentor'
  const bio =
    user?.bio ||
    'Senior UI/UX Designer and Frontend Architect with over 12 years of experience building scalable design systems and mentoring rising talent in the tech industry.'
  const avatarUrl =
    user?.avatar?.url ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=2f97e9&color=fff&size=160`

  return (
    <section className="mb-8 bg-[var(--whiteBackground)] rounded-3xl p-8 border border-[var(--secondary-light)]/10 relative overflow-hidden shadow-[0_4px_24px_rgba(47,151,233,0.10)]">
      {/* gradient strip */}
      <div className="absolute top-0 left-0 w-full h-28 bg-gradient-to-r from-[var(--secondary-light)]/20 to-[var(--primary-light)]/10 pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-center md:items-end gap-8">
        {/* Avatar */}
        <div className="w-36 h-36 rounded-full border-4 border-white shadow-xl overflow-hidden shrink-0">
          <img
            src={avatarUrl}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex-1 text-center md:text-left pb-2">
          <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
            <h1 className="text-2xl md:text-3xl font-extrabold text-[var(--black-text)]">
              {displayName}
            </h1>
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-[var(--secondary-light)]/10 text-[var(--secondary-light)] text-sm rounded-full font-bold border border-[var(--secondary-light)]/20">
              <MdVerified /> {title}
            </span>
          </div>

          <p className="text-[var(--gray-text)] max-w-2xl mb-5 text-sm md:text-base leading-relaxed">
            {bio}
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-3">
            <button
              onClick={() => navigate('/profile/edit')}
              className="flex items-center gap-2 bg-gradient-to-r from-[var(--secondary-light)] to-[var(--primary-light)] text-white px-6 py-2.5 rounded-full font-semibold hover:opacity-90 transition-all active:scale-95 shadow-md text-sm"
            >
              <FiEdit2 size={14} /> Edit Profile
            </button>
            <button className="flex items-center gap-2 bg-[var(--background-light)] text-[var(--gray-text)] border border-[var(--gray-text)]/20 px-6 py-2.5 rounded-full font-semibold hover:bg-[var(--secondary-light)]/5 transition-all active:scale-95 text-sm">
              <FiShare2 size={14} /> Share
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProfileHeader
