import { useState } from 'react'

function StarIcon() {
  return (
    <svg className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
      <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  )
}

export default function RequestCard({ request }) {
  const [proposed, setProposed] = useState(false)
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className={`relative bg-[var(--whiteBackground)] dark:bg-slate-900 rounded-2xl border flex flex-col overflow-hidden transition-all duration-300 ${
        hovered
          ? 'shadow-xl -translate-y-1.5 border-blue-200 dark:border-blue-800'
          : 'shadow-sm border-gray-100 dark:border-slate-800'
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Gradient accent bar */}
      <div className={`h-1 w-full bg-gradient-to-r ${request.accentColor}`} />

      {request.urgent && (
        <div className="absolute top-5 left-1/2 -translate-x-1/2 bg-red-500 text-white text-xs font-bold px-3 py-0.5 rounded-full tracking-wide shadow-md z-10">
          URGENT
        </div>
      )}

      <div className="p-7 flex flex-col flex-1">
        {/* Badge + time */}
        <div className="flex items-center justify-between mb-5">
          <span className={`text-xs font-bold px-3 py-1 rounded-full ${request.badge.color}`}>
            {request.badge.label}
          </span>
          <span className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {request.postedAt}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-base font-black text-gray-900 dark:text-white mb-3 leading-snug">
          {request.title}
        </h2>

        {/* Description */}
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-5 flex-1 line-clamp-3">
          {request.description}
        </p>

        {/* Offers in exchange */}
        <div className="mb-6">
          <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
            Offering in exchange
          </p>
          <div className="flex flex-wrap gap-2">
            {request.offers.map((offer) => (
              <span
                key={offer}
                className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300"
              >
                {offer}
              </span>
            ))}
          </div>
        </div>

        {/* Author row */}
        <div className="flex items-center gap-3 pt-5 border-t border-gray-100 dark:border-slate-800 mb-5">
          <img
            src={request.author.avatar}
            alt={request.author.name}
            className="w-11 h-11 rounded-full object-cover border-2 border-gray-100 dark:border-slate-700 shadow-sm shrink-0"
            onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }}
          />
          <div
            className={`hidden w-11 h-11 rounded-full items-center justify-center text-white font-bold text-lg bg-gradient-to-br ${request.accentColor} shrink-0`}
          >
            {request.author.name.charAt(0)}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{request.author.name}</p>
            <div className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500">
              <StarIcon />
              <span className="font-semibold text-gray-600 dark:text-gray-300">{request.author.rating}</span>
              <span>({request.author.reviews})</span>
              <span>·</span>
              <span className="truncate">{request.author.role}</span>
            </div>
          </div>
        </div>

        {/* CTA button */}
        <button
          onClick={() => setProposed(!proposed)}
          className={`w-full py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 ${
            proposed
              ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-md'
              : `text-white bg-gradient-to-r ${request.accentColor} hover:shadow-lg hover:brightness-110`
          }`}
        >
          {proposed ? (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Session Proposed!
            </>
          ) : (
            <>
              Propose Session
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </>
          )}
        </button>
      </div>
    </div>
  )
}
