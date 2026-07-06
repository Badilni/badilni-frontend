import useAdvancedSearch from '../../hooks/AdvancedSearch/useSearchHeader'

export default function AdvancedSearchSystem({ compact = false }) {
  const { keywordInput, setKeywordInput, handleSearchSubmit } =
    useAdvancedSearch()

  return (
    <div className="w-full font-sans">
      <form
        onSubmit={handleSearchSubmit}
        className="group relative flex w-full items-center"
      >
        <div className="relative flex w-full items-center rounded-xl border border-slate-200 bg-white/95 p-1 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <span className="pointer-events-none absolute left-2.5 z-10 flex items-center justify-center text-slate-400 transition-colors duration-200 group-focus-within:text-indigo-500 dark:text-slate-500 dark:group-focus-within:text-indigo-400">
            <svg
              width="14"
              height="14"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <circle cx="11" cy="11" r="8" />
              <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
            </svg>
          </span>

          <input
            type="text"
            value={keywordInput}
            onChange={(e) => setKeywordInput(e.target.value)}
            placeholder="Search people, offers or requests…"
            className={`w-full rounded-lg border border-transparent bg-transparent outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:bg-slate-950 ${compact ? 'py-1 pl-8 pr-8 text-xs font-semibold' : 'py-1.5 pl-9 pr-9 text-sm font-medium'}`}
          />

          <button
            type="submit"
            aria-label="Submit search"
            className={`absolute right-1 flex items-center justify-center rounded-lg p-1 text-indigo-600 transition-all duration-200 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 dark:text-indigo-400 dark:hover:bg-indigo-950/40 ${keywordInput ? 'pointer-events-auto scale-100 opacity-100' : 'pointer-events-none scale-95 opacity-0'}`}
          >
            <svg
              width="13"
              height="13"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  )
}
