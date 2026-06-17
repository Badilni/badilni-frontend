import { useState } from 'react'

function StarIcon() {
  return (
    <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
      <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  )
}

export default function MentorCard({ mentor }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className={`relative bg-[var(--whiteBackground)] dark:bg-slate-900 rounded-3xl overflow-hidden border flex flex-col transition-all duration-300 cursor-pointer ${
        hovered
          ? 'shadow-2xl -translate-y-2 border-blue-200 dark:border-blue-800'
          : 'shadow-sm border-gray-100 dark:border-slate-800'
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Gradient accent bar */}
      <div className={`h-1 w-full bg-gradient-to-r ${mentor.accentColor}`} />

      {/* Card image */}
      <div className="relative h-52 overflow-hidden bg-gray-100 dark:bg-slate-800">
        <img
          src={mentor.avatar}
          alt={mentor.name}
          className={`w-full h-full object-cover transition-transform duration-500 ${hovered ? 'scale-105' : 'scale-100'}`}
          onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }}
        />
        {/* Fallback avatar */}
        <div className={`absolute inset-0 hidden items-center justify-center bg-gradient-to-br ${mentor.accentColor} text-white text-5xl font-bold`}>
          {mentor.name.charAt(0)}
        </div>

        {/* Rating badge */}
        <div className="absolute top-4 right-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
          <StarIcon />
          <span className="text-xs font-bold text-gray-800 dark:text-gray-100">{mentor.rating}</span>
          <span className="text-xs text-gray-400 dark:text-gray-500">({mentor.reviews})</span>
        </div>

        {/* Available badge */}
        {mentor.available && (
          <div className="absolute top-4 left-4 bg-emerald-500 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            Available
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="p-6 flex flex-col flex-1">
        <div className="mb-3">
          <h3 className="text-base font-bold text-gray-900 dark:text-white mb-0.5">{mentor.name}</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {mentor.role} · <span className="text-blue-600 dark:text-blue-400 font-semibold">{mentor.company}</span>
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {mentor.tags.map((tag) => (
            <span key={tag} className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${mentor.tagColor}`}>
              {tag}
            </span>
          ))}
        </div>

        {/* Bio */}
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2 mb-4 flex-1">
          {mentor.bio}
        </p>

        {/* Footer */}
        <div className="pt-4 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            {mentor.price ? (
              <div>
                <span className="text-base font-bold text-gray-900 dark:text-white">${mentor.price}</span>
                <span className="text-xs text-gray-400 dark:text-gray-500"> / session</span>
              </div>
            ) : (
              <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">Free Session</span>
            )}
          </div>
          <button className={`px-5 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r ${mentor.accentColor} hover:shadow-lg hover:brightness-110 transition-all duration-200 active:scale-95`}>
            View Profile
          </button>
        </div>
      </div>
    </div>
  )
}
