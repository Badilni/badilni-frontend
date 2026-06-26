import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaEllipsisVertical, FaStar } from 'react-icons/fa6'
import useAuthStore from '../../store/authStore'
import { isOwner as checkIsOwner } from '../../utils/isOwner'
import { getAccentColor } from '../../utils/getAccentColor'

export default function OfferCard({ offer, onEdit, onDelete }) {
  const [showMenu, setShowMenu] = useState(false)
  const currentUser = useAuthStore((state) => state.user)
  const navigate = useNavigate()
  const owner = checkIsOwner(currentUser, offer.user)
  const accentColor = getAccentColor(offer.category?.name)

  const handleCardClick = () => navigate(`/offers/${offer._id ?? offer.id}`)

  return (
    <div
      onClick={handleCardClick}
      className="relative bg-[var(--whiteBackground)] dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1.5 hover:border-blue-200 dark:hover:border-blue-800 flex flex-col overflow-hidden transition-all duration-300"
    >
      <div className={`h-1 w-full bg-gradient-to-r ${accentColor}`} />

      {owner && (
        <div className="absolute top-4 right-4 z-20">
          <button
            onClick={(e) => {
              e.stopPropagation()
              setShowMenu((prev) => !prev)
            }}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-500"
          >
            <FaEllipsisVertical size={20} />
          </button>

          {showMenu && (
            <div
              className="absolute right-0 mt-2 w-40 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl shadow-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => {
                  onEdit?.(offer)
                  setShowMenu(false)
                }}
                className="w-full px-4 py-3 text-left text-sm hover:bg-gray-100 dark:hover:bg-slate-800"
              >
                Edit Offer
              </button>
              <button
                onClick={() => {
                  onDelete?.(offer)
                  setShowMenu(false)
                }}
                className="w-full px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                Delete Offer
              </button>
            </div>
          )}
        </div>
      )}

      <span
        className={`absolute top-5 left-5 text-xs font-bold px-3 py-0.5 rounded-full z-10 ${
          offer.isActive
            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400'
            : 'bg-gray-100 text-gray-500 dark:bg-slate-800 dark:text-gray-400'
        }`}
      >
        {offer.isActive ? 'Active' : 'Inactive'}
      </span>

      {offer.sampleWork?.[0]?.url && (
        <img
          src={offer.sampleWork[0].url}
          alt=""
          className="w-full h-40 object-cover mt-8"
        />
      )}

      <div className="p-7 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 truncate">
            {offer.category?.name}
          </span>
          <span className="text-sm font-black text-gray-900 dark:text-white shrink-0">
            {offer.hourlyRate} Credits/hr
          </span>
        </div>

        <h2 className="text-base font-black text-gray-900 dark:text-white mb-2 leading-snug">
          {offer.title}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-5 flex-1 line-clamp-3">
          {offer.description}
        </p>

        {offer.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-5">
            {offer.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center gap-3 pt-5 border-t border-gray-100 dark:border-slate-800">
          <img
            src={offer.user?.avatar?.url || 'https://via.placeholder.com/80'}
            alt={offer.user?.name || 'User'}
            className="w-11 h-11 rounded-full object-cover border-2 border-gray-100 dark:border-slate-700 shadow-sm shrink-0"
          />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
              {offer.user?.name || 'Anonymous User'}
            </p>
            <div className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500">
              <FaStar className="text-amber-400 w-3 h-3" />
              <span className="font-semibold text-gray-600 dark:text-gray-300">
                {typeof offer.averageRating === 'number'
                  ? offer.averageRating.toFixed(1)
                  : 'New'}
              </span>
              <span>·</span>
              <span>{offer.totalBookings ?? 0} bookings</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
