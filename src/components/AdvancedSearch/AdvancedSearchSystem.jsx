import useAdvancedSearch from '../../hooks/AdvancedSearch/useSearchHeader'

export default function AdvancedSearchSystem({ compact = false }) {
  const { keywordInput, setKeywordInput, handleSearchSubmit } =
    useAdvancedSearch()

  return (
    <div className="w-full font-sans">
      <form
        onSubmit={handleSearchSubmit}
        className="relative w-full flex items-center group"
      >
        {/* Search Icon Left */}
        {/* <span className="absolute left-3.5 z-10 pointer-events-none flex items-center justify-center text-gray-400 dark:text-slate-500 group-focus-within:text-blue-500 dark:group-focus-within:text-blue-400 transition-colors duration-200">
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
        </span> */}

        {/* Stable Search Input field
        <input
          type="text"
          value={keywordInput}
          onChange={(e) => setKeywordInput(e.target.value)}
          placeholder="Search skills, people…"
          className={`w-full font-medium text-sm rounded-xl outline-none border transition-all duration-200 peer
            bg-gray-50 dark:bg-slate-800/60 
            border-gray-200 dark:border-slate-700/80 
            text-slate-800 dark:text-slate-100
            placeholder-gray-400 dark:placeholder-slate-500
            focus:bg-white dark:focus:bg-slate-900 
            focus:border-blue-500 dark:focus:border-blue-400
            focus:ring-4 focus:ring-blue-500/15 dark:focus:ring-blue-400/10
            ${compact ? 'py-2 pl-10 pr-10' : 'py-2.5 pl-10 pr-10'}
          `}
        /> */}

        {/* Submit Action Button Arrow (Fades in without moving the layout container) */}
        {/* <button
          type="submit"
          aria-label="Submit search"
          className={`absolute right-2 p-1.5 rounded-lg flex items-center justify-center 
            text-blue-600 dark:text-blue-400 
            hover:bg-blue-50 dark:hover:bg-blue-950/40 
            focus:outline-none focus:ring-2 focus:ring-blue-500/40 
            transition-all duration-200 cursor-pointer
            ${keywordInput ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}
          `}
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
        </button> */}
      </form>
    </div>
  )
}
