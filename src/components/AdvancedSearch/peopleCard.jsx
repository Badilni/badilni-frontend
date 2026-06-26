import { useNavigate } from 'react-router-dom'
import { BsChatFill, BsStarFill } from 'react-icons/bs'
import { IoPersonOutline } from 'react-icons/io5'

export default function UserCard({ user }) {
  const navigate = useNavigate()

  const getAvatarUrl = (avatar) => {
    if (!avatar) return null
    return typeof avatar === 'object' ? avatar.url : avatar
  }

  const avatarUrl = getAvatarUrl(user?.avatar)
  const fallbackInitial = user?.name ? user.name.charAt(0).toUpperCase() : 'U'

  return (
    <div className="group relative flex flex-col rounded-[2rem] bg-[var(--whiteBackground,#ffffff)] p-3 shadow-sm ring-1 ring-[var(--border-color,#e5e7eb)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-2xl hover:ring-transparent">

      {/* Avatar Container */}
      <div className="relative aspect-square w-full overflow-hidden rounded-[1.5rem] bg-[var(--background-secondary,#f3f4f6)]">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={user?.name || 'User avatar'}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            onError={(e) => {
              e.target.style.display = 'none'
            }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[var(--primary-light,#6366f1)] to-[var(--secondary-light,#a855f7)] text-4xl font-bold text-white">
            {fallbackInitial}
          </div>
        )}

        {/* Floating Glassmorphism Rating Badge */}
        <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-black/20 px-2.5 py-1.5 backdrop-blur-md ring-1 ring-white/30 shadow-lg transition-transform duration-300 hover:scale-105">
          <BsStarFill className="h-3.5 w-3.5 text-amber-400 drop-shadow-sm" />
          <span className="text-xs font-bold text-white drop-shadow-md">
            {Number(user?.averageRating ?? 0).toFixed(1)}
          </span>
        </div>

        {/* Subtle Bottom Shadow Overlay for seamless blending */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      {/* Identity & Content */}
      <div className="flex flex-col gap-3 px-2 pb-1 pt-4">
        <div className="flex flex-col gap-1">
          <h3 className="truncate text-lg font-bold tracking-tight text-[var(--black-text,#111827)]">
            {user?.name || 'Unknown User'}
          </h3>

          {/* Bio using CSS line-clamp instead of JS string slicing */}
          <span className="inline-flex w-fit items-center rounded-full bg-[var(--background-light,#f3f4f6)] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[var(--primary-light,#6366f1)]">
            <span className="line-clamp-1">{user?.bio || 'Badilni User'}</span>
          </span>
        </div>

        {/* Actions */}
        <div className="mt-1 flex w-full items-center gap-2">
          <button
            onClick={() => {
              if (user?._id) {
                navigate('/chat', { state: { selectUserId: user._id } });
              }
            }}
            className="flex h-11 flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-tr from-[var(--primary-light,#6366f1)] to-[var(--secondary-light,#a855f7)] px-4 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:shadow-lg hover:brightness-110 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <BsChatFill className="h-4 w-4" />
            <span>Chat</span>
          </button>

          <button
            onClick={() => navigate(`/profile/${user?._id}`)}
            aria-label="View profile"
            title="View profile"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--background-light,#f3f4f6)] text-[var(--black-text,#111827)] transition-all duration-200 hover:bg-[var(--primary-light,#6366f1)] hover:text-white active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <IoPersonOutline className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
