export default function NoResults({ onClearFilters }) {
  return (
    <div className="relative w-full flex flex-col items-center justify-center rounded-[2rem] border-2 border-dashed border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/20 py-20 px-6 text-center overflow-hidden animate-fade-in">
      {/* Subtle Background Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40 dark:opacity-20">
        <div className="w-72 h-72 bg-indigo-500/20 dark:bg-indigo-500/30 rounded-full blur-[80px]"></div>
      </div>

      {/* Icon Wrapper */}
      <div className="relative z-10 mb-8 flex items-center justify-center group">
        {/* Pulsing ring behind the icon */}
        <div className="absolute inset-0 bg-indigo-100 dark:bg-indigo-900/30 rounded-full animate-ping opacity-30 duration-1000"></div>

        {/* Main Icon Box */}
        <div className="relative flex items-center justify-center w-20 h-20 bg-white dark:bg-gray-800 rounded-2xl shadow-xl shadow-indigo-100/50 dark:shadow-none ring-1 ring-gray-100 dark:ring-gray-700 -rotate-3 transition-transform duration-300 group-hover:rotate-3 group-hover:scale-105">
          <svg
            className="w-10 h-10 text-indigo-500 dark:text-indigo-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            {/* Magnifying glass with a subtle "no results" look */}
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </div>

      {/* Typography */}
      <h3 className="relative z-10 text-xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">
        No Speakers Found
      </h3>
      <p className="relative z-10 text-sm md:text-base text-gray-500 dark:text-gray-400 max-w-[280px] sm:max-w-sm leading-relaxed mb-8">
        We couldn't find any exact matches for your search. Try tweaking your
        filters or adjusting your keywords.
      </p>

      {/* Action Button (Pass onClearFilters as a prop to show it) */}
      {onClearFilters && (
        <button
          onClick={onClearFilters}
          className="relative z-10 inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-semibold text-indigo-600 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-500/10 rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
        >
          Clear Filters
        </button>
      )}
    </div>
  )
}
