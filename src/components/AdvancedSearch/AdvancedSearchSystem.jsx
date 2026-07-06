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
        <div className="absolute inset-0 rounded-[1.35rem] bg-gradient-to-r from-indigo-500/10 via-violet-500/10 to-sky-500/10 blur-xl" />
        <div className="relative flex w-full items-center rounded-[1.35rem] border border-slate-200/80 bg-white/90 p-1.5 shadow-[0_12px_35px_rgba(15,23,42,0.10)] backdrop-blur dark:border-slate-700/70 dark:bg-slate-900/80">
          <span className="pointer-events-none absolute left-3.5 z-10 flex items-center justify-center text-slate-400 transition-colors duration-200 group-focus-within:text-indigo-500 dark:text-slate-500 dark:group-focus-within:text-indigo-400">
            <svg
              width="16"
              height="16"
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
            className={`w-full rounded-[1rem] border border-transparent bg-transparent text-sm font-medium outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:bg-slate-950 ${compact ? 'py-2 pl-10 pr-10' : 'py-2.5 pl-10 pr-10'}`}
          />

          <button
            type="submit"
            aria-label="Submit search"
            className={`absolute right-2 flex items-center justify-center rounded-xl p-1.5 text-indigo-600 transition-all duration-200 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 dark:text-indigo-400 dark:hover:bg-indigo-950/40 ${keywordInput ? 'pointer-events-auto scale-100 opacity-100' : 'pointer-events-none scale-95 opacity-0'}`}
          >
            <svg
              width="15"
              height="15"
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
