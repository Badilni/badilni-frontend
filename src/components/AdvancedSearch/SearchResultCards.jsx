import { useNavigate } from 'react-router-dom'
import { BsChatFill, BsStarFill } from 'react-icons/bs'
import { IoPersonOutline } from 'react-icons/io5'
import { FaBolt, FaCalendarDay } from 'react-icons/fa6'
import { getAccentColor } from '../../utils/getAccentColor'
import OfferCard from '../offers/OfferCard'
import RequestCard from '../requests/RequestCard'

function getAvatarUrl(avatar) {
  if (!avatar) return null
  return typeof avatar === 'object' ? avatar.url : avatar
}

function PersonSearchCard({ user }) {
  const navigate = useNavigate()
  const avatarUrl = getAvatarUrl(user?.avatar)
  const fallbackInitial = user?.name ? user.name.charAt(0).toUpperCase() : 'U'

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white/95 p-3 shadow-[0_10px_30px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_45px_rgba(15,23,42,0.16)] dark:border-slate-700/70 dark:bg-slate-900/90">
      <div className="relative aspect-square overflow-hidden rounded-[1.35rem] bg-gradient-to-br from-indigo-100 via-white to-purple-100 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={user?.name || 'User avatar'}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-indigo-500 to-violet-500 text-4xl font-bold text-white">
            {fallbackInitial}
          </div>
        )}

        <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-black/25 px-2.5 py-1.5 backdrop-blur-md">
          <BsStarFill className="h-3.5 w-3.5 text-amber-400" />
          <span className="text-xs font-bold text-white">
            {Number(user?.averageRating ?? 0).toFixed(1)}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 px-2 pb-1 pt-4">
        <div>
          <h3 className="truncate text-lg font-bold text-slate-900 dark:text-white">
            {user?.name || 'Unknown User'}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-slate-500 dark:text-slate-400">
            {user?.bio || 'Badilni community member'}
          </p>
        </div>

        <div className="mt-auto flex items-center gap-2">
          <button
            onClick={() => {
              if (user?._id) {
                navigate('/chat', { state: { selectUserId: user._id } })
              }
            }}
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:brightness-110 active:scale-95"
          >
            <BsChatFill className="h-4 w-4" />
            <span>Chat</span>
          </button>

          <button
            onClick={() => navigate(`/profile/${user?._id}`)}
            className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 transition-all duration-200 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
            aria-label="View profile"
          >
            <IoPersonOutline className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

function OfferSearchCard({ offer }) {
  const navigate = useNavigate()
  return (
    <OfferCard
      key={offer?._id || offer?.id}
      offer={offer}
      onClick={() => navigate(`/offers/${offer?._id || offer?.id}`)}
    />
  )
}

function RequestSearchCard({ request }) {
  const navigate = useNavigate()
  return (
    <RequestCard
      key={request?._id || request?.id}
      request={request}
      onClick={() => navigate(`/requests/${request?._id || request?.id}`)}
    />
  )
}

export default function SearchResultCard({ result }) {
  if (result?.kind === 'people') return <PersonSearchCard user={result.data} />
  if (result?.kind === 'offers') return <OfferSearchCard offer={result.data} />
  if (result?.kind === 'requests')
    return <RequestSearchCard request={result.data} />

  return null
}
