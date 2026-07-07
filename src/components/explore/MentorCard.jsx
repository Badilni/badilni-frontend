import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BsChatFill } from 'react-icons/bs'

function StarIcon() {
  return (
    <svg
      className="w-4 h-4 text-amber-400"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  )
}

const CARD_THEMES = [
  {
    accentColor: 'from-blue-500 to-indigo-650',
    tagColor: 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300',
  },
  {
    accentColor: 'from-emerald-500 to-teal-600',
    tagColor:
      'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300',
  },
  {
    accentColor: 'from-purple-500 to-pink-650',
    tagColor:
      'bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300',
  },
  {
    accentColor: 'from-orange-500 to-red-600',
    tagColor:
      'bg-orange-50 text-orange-700 dark:bg-orange-950/40 dark:text-orange-300',
  },
]

export default function MentorCard({ mentor: user, index = 0 }) {
  const navigate = useNavigate()
  const [hovered, setHovered] = useState(false)

  if (!user) return null

  // Pick a dynamic theme color based on index
  const theme = CARD_THEMES[index % CARD_THEMES.length]

  const avatarUrl =
    (typeof user.avatar === 'object' ? user.avatar?.url : user.avatar) ||
    user.profilePicture ||
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150'

  const fallbackInitial = user.name ? user.name.charAt(0).toUpperCase() : 'U'
  const rating = Number(user.averageRating ?? 0).toFixed(1)
  const role = user.skillTags?.[0] || 'Skill Share Pro'
  const company = 'Badilni Member'
  const tags = Array.isArray(user.skillTags) ? user.skillTags.slice(0, 3) : []

  const bio =
    user.description ||
    user.bio ||
    (user.skillTags && user.skillTags.length > 0
      ? `Interested in sharing skills like ${user.skillTags.slice(0, 3).join(', ')}.`
      : 'Badilni member passionate about swapping skills and learning new things.')

  return (
    <div
      onClick={() => navigate(`/profile/${user._id}`)}
      className={`relative bg-[var(--whiteBackground)] dark:bg-slate-900 rounded-3xl overflow-hidden border flex flex-col transition-all duration-300 cursor-pointer ${
        hovered
          ? 'shadow-2xl -translate-y-2 border-blue-200 dark:border-blue-800'
          : 'shadow-sm border-gray-100 dark:border-slate-800'
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Gradient accent bar */}
      <div className={`h-1 w-full bg-gradient-to-r ${theme.accentColor}`} />

      {/* Card image */}
      <div className="relative h-52 overflow-hidden bg-gray-100 dark:bg-slate-800">
        <img
          src={avatarUrl}
          alt={user.name}
          className={`w-full h-full object-cover transition-transform duration-500 ${hovered ? 'scale-105' : 'scale-100'}`}
          onError={(e) => {
            e.target.style.display = 'none'
            e.target.nextSibling.style.display = 'flex'
          }}
        />
        {/* Fallback avatar */}
        <div
          className={`absolute inset-0 hidden items-center justify-center bg-gradient-to-br ${theme.accentColor} text-white text-5xl font-bold`}
        >
          {fallbackInitial}
        </div>

        {/* Rating badge */}
        <div className="absolute top-4 right-4 bg-black/35 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1.5 ring-1 ring-white/20 shadow-lg transition-transform duration-300 hover:scale-105">
          <StarIcon />
          <span className="text-xs font-bold text-white drop-shadow-sm">
            {rating}
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="p-6 flex flex-col flex-1">
        <div className="mb-3">
          <h3 className="text-base font-bold text-slate-850 dark:text-white mb-0.5">
            {user.name}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {role} ·{' '}
            <span className="text-blue-650 dark:text-blue-400 font-bold">
              {company}
            </span>
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${theme.tagColor}`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Bio */}
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2 mb-4 flex-1">
          {bio}
        </p>

        {/* Footer */}
        <div className="pt-4 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation()
              if (user?._id) {
                navigate('/chat', { state: { selectUserId: user._id } })
              }
            }}
            className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 border border-slate-900 dark:text-blue-400 dark:bg-blue-950/20 dark:hover:bg-blue-950/60 dark:border-blue-900/40 transition-all duration-200 active:scale-95 cursor-pointer shrink-0"
          >
            <BsChatFill className="h-3.5 w-3.5 text-white dark:text-blue-400" />
            <span>Chat</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              navigate(`/profile/${user._id}`)
            }}
            className={`flex-1 text-center py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r ${theme.accentColor} hover:shadow-lg hover:brightness-110 transition-all duration-200 active:scale-95`}
          >
            View Profile
          </button>
        </div>
      </div>
    </div>
  )
}
