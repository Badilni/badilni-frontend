import { useNavigate } from 'react-router-dom'
import { MdVerified } from 'react-icons/md'
import { FiEdit2, FiShare2 } from 'react-icons/fi'

const fallbackAvatar = (name) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name || 'User'
  )}&background=2f97e9&color=fff&size=160`

/**
 * Presentational header for the Profile page.
 *
 * Reusable: takes the profile object via props instead of reaching into
 * useAuthStore itself, so it can be reused anywhere (e.g. viewing someone
 * else's public profile later) without being hard-wired to "the current user".
 */
const ProfileHeader = ({ profile, onEdit }) => {
  const navigate = useNavigate()

  const displayName = profile?.name
  const email = profile?.email
  const bio = profile?.bio?.trim() || "This user hasn't added a bio yet."
  const skillTags = Array.isArray(profile?.skillTags) ? profile.skillTags : []
  const avatarUrl = profile?.avatar?.url
  const isVerified = Boolean(profile?.isVerified)
  const role = profile?.role

  const handleEditClick = () => {
    if (onEdit) {
      onEdit()
    } else {
      navigate('/profile/edit')
    }
  }

  return (
    <section className="mb-8 bg-[var(--whiteBackground)] rounded-3xl p-8 border border-[var(--secondary-light)]/10 relative overflow-hidden shadow-[0_4px_24px_rgba(47,151,233,0.10)]">
      {/* gradient strip */}
      <div className="absolute top-0 left-0 w-full h-28 bg-gradient-to-r from-[var(--secondary-light)]/20 to-[var(--primary-light)]/10 pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-center md:items-end gap-8">
        {/* Avatar */}
        <div className="w-36 h-36 rounded-full border-4 border-white shadow-xl overflow-hidden shrink-0 bg-[var(--background-light)]">
          <img
            src={avatarUrl}
            alt={displayName}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info */}
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

            {/* {role && (
              <span className="inline-flex items-center px-3 py-1 bg-[var(--primary-light)]/10 text-[var(--primary-light)] text-xs rounded-full font-semibold uppercase tracking-wide">
                {role}
              </span>
            )} */}
          </div>

          {email && (
            <p className="text-sm text-[var(--gray-text)] mb-3">{email}</p>
          )}

          <p className="text-[var(--gray-text)] max-w-2xl mb-4 text-sm md:text-base leading-relaxed mx-auto md:mx-0">
            {bio}
          </p>

          {/* {skillTags.length > 0 && (
            <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-5">
              {skillTags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-[var(--primary-light)]/10 text-[var(--primary-light)] rounded-full text-xs font-medium border border-[var(--primary-light)]/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          )} */}

          <div className="flex flex-wrap justify-center md:justify-start gap-3">
            <button
              onClick={handleEditClick}
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