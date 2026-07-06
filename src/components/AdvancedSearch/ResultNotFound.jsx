export default function NoResults({
  onClearFilters,
  queryKeyword = '',
  activeFilter = 'all',
}) {
  const filterLabel =
    activeFilter === 'people'
      ? 'people'
      : activeFilter === 'offers'
        ? 'offers'
        : activeFilter === 'requests'
          ? 'service requests'
          : 'people, offers, or requests'

  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-[2rem] border border-dashed border-slate-300 bg-white/70 px-6 py-20 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900/40">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-40 dark:opacity-20">
        <div className="h-72 w-72 rounded-full bg-indigo-500/20 blur-[80px]" />
      </div>

      <div className="relative z-10 mb-8 flex items-center justify-center">
        <div className="absolute inset-0 animate-ping rounded-full bg-indigo-100 opacity-30 duration-1000 dark:bg-indigo-900/30" />
        <div className="relative flex h-20 w-20 -rotate-3 items-center justify-center rounded-2xl bg-white shadow-xl ring-1 ring-slate-100 transition-transform duration-300 hover:rotate-3 hover:scale-105 dark:bg-slate-800 dark:ring-slate-700">
          <svg
            className="h-10 w-10 text-indigo-500 dark:text-indigo-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </div>

      <h3 className="relative z-10 mb-2 text-xl font-bold tracking-tight text-slate-900 dark:text-white">
        Nothing matched yet
      </h3>
      <p className="relative z-10 mb-8 max-w-[320px] text-sm leading-7 text-slate-500 dark:text-slate-400 sm:max-w-sm sm:text-base">
        {queryKeyword
          ? `No ${filterLabel} matched “${queryKeyword}”. Try another keyword or switch filters.`
          : `No ${filterLabel} are available right now. Try a broader search.`}
      </p>

      {onClearFilters && (
        <button
          onClick={onClearFilters}
          className="relative z-10 inline-flex items-center justify-center gap-2 rounded-full bg-indigo-50 px-6 py-2.5 text-sm font-semibold text-indigo-600 transition-all duration-200 hover:bg-indigo-100 active:scale-95 dark:bg-indigo-500/10 dark:text-indigo-300 dark:hover:bg-indigo-500/20"
        >
          Clear filters
        </button>
      )}
    </div>
  )
}
