import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchUsersService } from '../../services/AdvancedSearch/search'
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

const cardThemes = [
  {
    accentColor: 'from-blue-500 to-indigo-600',
    tagColor: 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300',
  },
  {
    accentColor: 'from-emerald-500 to-teal-600',
    tagColor:
      'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300',
  },
  {
    accentColor: 'from-purple-500 to-pink-600',
    tagColor:
      'bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300',
  },
  {
    accentColor: 'from-orange-500 to-red-600',
    tagColor:
      'bg-orange-50 text-orange-700 dark:bg-orange-950/40 dark:text-orange-300',
  },
]

function LocalMentorCard({ user, theme }) {
  const navigate = useNavigate()
  const [hovered, setHovered] = useState(false)

  const avatarUrl =
    (typeof user.avatar === 'object' ? user.avatar?.url : user.avatar) ||
    user.profilePicture ||
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150'

  const fallbackInitial = user.name ? user.name.charAt(0).toUpperCase() : 'U'
  const rating = Number(user.averageRating ?? 0).toFixed(1)

  const role = user.skillTags?.[0] || 'Skill Share Pro'
  const company = 'Badilni'
  const tags = Array.isArray(user.skillTags) ? user.skillTags.slice(0, 3) : []

  // Dynamic bio fallback based on actual skillTags to avoid identical text across cards
  const bio = user.bio
    ? user.bio
    : user.skillTags && user.skillTags.length > 0
      ? `Interested in sharing skills like ${user.skillTags.slice(0, 3).join(', ')}.`
      : 'Badilni member passionate about swapping skills and learning new things.'

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

        {/* Rating badge (Transparent Glassmorphic style from search page) */}
        <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1.5 ring-1 ring-white/20 shadow-lg transition-transform duration-300 hover:scale-105">
          <StarIcon />
          <span className="text-xs font-bold text-white drop-shadow-sm">
            {rating}
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="p-6 flex flex-col flex-1">
        <div className="mb-3">
          <h3 className="text-base font-bold text-gray-900 dark:text-white mb-0.5">
            {user.name}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {role} ·{' '}
            <span className="text-blue-600 dark:text-blue-400 font-semibold">
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
            className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/40 bg-blue-50/50 dark:bg-blue-950/20 hover:bg-blue-100 dark:hover:bg-blue-950/60 transition-all duration-200 active:scale-95 cursor-pointer shrink-0"
          >
            <BsChatFill className="h-3.5 w-3.5" />
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

export default function TopRatedUsersSection() {
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchTopRatedUsers = async () => {
      try {
        setLoading(true)
        setError(false)

        // Query with sort: '-averageRating' to get the highest-rated users from backend
        const resData = await fetchUsersService({
          page: 1,
          limit: 20, // Fetch more to filter out deactivated users and keep 8
          sort: '-averageRating',
        })

        if (resData) {
          const usersList =
            resData.data?.users ||
            resData.users ||
            resData.data ||
            (Array.isArray(resData) ? resData : [])

          const activeUsers = usersList.filter(
            (user) =>
              user.isDeactivated !== true && user.status !== 'deactivated'
          )

          // Double check sort client-side, and limit to top 8
          const sorted = activeUsers
            .sort(
              (a, b) =>
                Number(b.averageRating || 0) - Number(a.averageRating || 0)
            )
            .slice(0, 8)

          setUsers(sorted)
        } else {
          setUsers([])
        }
      } catch (err) {
        console.error('Error handling Top Rated Users request:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchTopRatedUsers()
  }, [])

  return (
    <section className="w-full py-16 bg-slate-50 dark:bg-slate-950/40 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-black font-sans text-slate-800 dark:text-slate-100 tracking-tight">
              Top Rated Members
            </h2>
            <p className="text-sm text-gray-500 dark:text-slate-400 mt-1.5 font-medium">
              Discover the highest-rated members of the Badilni community.
            </p>
          </div>

          {!loading && !error && users.length > 0 && (
            <button
              onClick={() => navigate('/search')}
              className="group flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white dark:bg-slate-900 text-sm font-bold text-slate-700 dark:text-slate-200 border border-gray-200 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800/80 shadow-sm transition-all duration-200 focus:outline-none cursor-pointer active:scale-95"
            >
              <span>View All Members</span>
              <svg
                className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform text-gray-400 dark:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Grid Container */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, idx) => (
              <div
                key={idx}
                className="flex flex-col h-[400px] bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl overflow-hidden animate-pulse shadow-sm"
              >
                <div className="h-52 w-full bg-gray-200 dark:bg-slate-800" />
                <div className="p-6 flex-1 space-y-4">
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 dark:bg-slate-800 rounded-md w-3/4" />
                    <div className="h-3 bg-gray-200 dark:bg-slate-800 rounded-md w-1/2" />
                  </div>
                  <div className="flex gap-2">
                    <div className="h-6 bg-gray-200 dark:bg-slate-800 rounded-lg w-12" />
                    <div className="h-6 bg-gray-200 dark:bg-slate-800 rounded-lg w-16" />
                  </div>
                  <div className="h-3 bg-gray-200 dark:bg-slate-800 rounded-md w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="w-full flex flex-col items-center justify-center py-10 bg-white dark:bg-slate-900 border border-dashed border-gray-200 dark:border-slate-800 rounded-2xl p-6 text-center">
            <p className="text-sm font-medium text-red-500 dark:text-red-400">
              Failed to load community members. Please check your network
              connection or try again later.
            </p>
          </div>
        ) : users.length === 0 ? (
          <div className="w-full flex flex-col items-center justify-center py-12 bg-white dark:bg-slate-900 border border-dashed border-gray-200 dark:border-slate-800 rounded-2xl p-6 text-center">
            <p className="text-sm font-semibold text-gray-500 dark:text-slate-400">
              No top-rated profiles found at this moment.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {users.map((user, index) => {
              const theme = cardThemes[index % cardThemes.length]
              return (
                <LocalMentorCard
                  key={user?._id || user?.id}
                  user={user}
                  theme={theme}
                />
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
