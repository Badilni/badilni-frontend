import { useState, useRef, useEffect } from 'react'
import useAdvancedSearch from '../../hooks/AdvancedSearch/useSearchHeader'

const MODES = [
  {
    key: 'smart',
    label: 'Smart Search',
    shortLabel: 'Smart',
    description: 'AI-powered — understands context and intent',
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={1}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    gradient: 'from-violet-500 to-purple-600',
    glow: 'shadow-[0_0_24px_rgba(139,92,246,0.4)]',
    border: 'border-violet-400/60',
    ring: 'focus-within:border-violet-400 focus-within:ring-4 focus-within:ring-violet-500/10',
    textFocus: 'group-focus-within:text-violet-500',
  },
  {
    key: 'normal',
    label: 'Normal Search',
    shortLabel: 'Normal',
    description: 'Keyword match — fast and predictable',
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    gradient: 'from-blue-500 to-indigo-500',
    glow: 'shadow-[0_0_24px_rgba(99,102,241,0.35)]',
    border: 'border-blue-400/60',
    ring: 'focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-500/10',
    textFocus: 'group-focus-within:text-blue-500',
  },
]

export default function AdvancedSearchSystem({ compact = false }) {
  const { keywordInput, setKeywordInput, handleSearchSubmit } =
    useAdvancedSearch()
  const [mode, setMode] = useState('normal')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  const activeMode = MODES.find((m) => m.key === mode)
  const onSubmit = (e) => handleSearchSubmit(e, mode)

  // Handle closing the dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // ── Header (Compact) Variant with Dropdown ────────────────────────────────
  if (compact) {
    return (
      <form
        onSubmit={onSubmit}
        className="flex items-center font-sans relative"
        ref={dropdownRef}
      >
        <div
          className={`group relative flex items-center h-10 w-72 md:w-96 rounded-full border bg-white dark:bg-slate-900 transition-all duration-300 ${
            mode === 'smart'
              ? 'border-slate-200 dark:border-slate-700 focus-within:border-violet-400 focus-within:ring-4 focus-within:ring-violet-500/10'
              : 'border-slate-200 dark:border-slate-700 focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-500/10'
          }`}
        >
          {/* Custom Dropdown Trigger */}
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={`flex items-center gap-1.5 h-full pl-3 pr-2.5 rounded-l-full  font-semibold font-mono tracking-wider transition-all duration-300 whitespace-nowrap border-r border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 ${
              mode === 'smart'
                ? 'text-violet-600 dark:text-violet-400'
                : 'text-blue-600 dark:text-blue-400'
            }`}
          >
            {activeMode.icon}
            <span>{activeMode.shortLabel}</span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {/* Search Input */}
          <input
            type="text"
            value={keywordInput}
            onChange={(e) => setKeywordInput(e.target.value)}
            placeholder={
              mode === 'smart' ? 'Describe what you need...' : 'Search...'
            }
            className="flex-1 bg-transparent py-2 pl-3 pr-9 text-sm font-medium text-slate-800 outline-none placeholder:text-slate-400 placeholder:font-normal dark:text-white dark:placeholder:text-slate-500 w-full min-w-0"
          />

          {/* Arrow Submit Button */}
          <button
            type="submit"
            aria-label="Search"
            className={`absolute right-1.5 flex h-7 w-7 items-center justify-center rounded-full transition-all duration-300 ${
              mode === 'smart'
                ? 'text-violet-500 hover:bg-violet-50 hover:text-violet-600 dark:hover:bg-violet-500/20'
                : 'text-blue-600 hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-500/20'
            } ${keywordInput ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 pointer-events-none'}`}
          >
            <svg
              width="14"
              height="14"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute top-[calc(100%+8px)] left-0 w-52 rounded-xl bg-white dark:bg-slate-800 shadow-xl border border-slate-100 dark:border-slate-700 py-1.5 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
            {MODES.map((m) => {
              const isActive = mode === m.key
              return (
                <button
                  key={m.key}
                  type="button"
                  onClick={() => {
                    setMode(m.key)
                    setIsDropdownOpen(false)
                  }}
                  className={`w-full flex items-start gap-3 px-3 py-2.5 text-left transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/50 ${
                    isActive ? 'bg-slate-50 dark:bg-slate-700/30' : ''
                  }`}
                >
                  <span
                    className={`mt-0.5 shrink-0 ${isActive ? (m.key === 'smart' ? 'text-violet-500' : 'text-blue-500') : 'text-slate-400'}`}
                  >
                    {m.icon}
                  </span>
                  <div>
                    <div
                      className={`text-xs font-bold uppercase tracking-wide ${isActive ? (m.key === 'smart' ? 'text-violet-600 dark:text-violet-400' : 'text-blue-600 dark:text-blue-400') : 'text-slate-700 dark:text-slate-300'}`}
                    >
                      {m.label}
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 leading-tight pr-2">
                      {m.description}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        )}
      </form>
    )
  }

  // ── Full / Page Variant ───────────────────────────────────────────────────
  // (Remains exactly the same as the previous iteration)
  return (
    <div className="w-full font-sans">
      {/* Mode selector cards */}
      <div className="mb-5 grid grid-cols-2 gap-3">
        {MODES.map((m) => {
          const isActive = mode === m.key
          return (
            <button
              key={m.key}
              type="button"
              onClick={() => setMode(m.key)}
              className={`group relative overflow-hidden rounded-2xl border p-4 text-left transition-all duration-300 ${
                isActive
                  ? `${m.border} bg-gradient-to-br ${m.gradient} ${m.glow} text-white`
                  : 'border-slate-200 dark:border-slate-700 bg-[var(--whiteBackground)] dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600 hover:-translate-y-0.5 hover:shadow-md'
              }`}
            >
              {isActive && (
                <div className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-white/20 blur-xl" />
              )}

              <div className="relative flex items-start gap-3">
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition-colors ${
                    isActive ? 'bg-white/20' : 'bg-slate-100 dark:bg-slate-800'
                  }`}
                >
                  <span
                    className={
                      isActive
                        ? 'text-white'
                        : 'text-slate-500 dark:text-slate-400'
                    }
                  >
                    {m.icon}
                  </span>
                </span>
                <div>
                  <p
                    className={`text-sm font-bold ${isActive ? 'text-white' : 'text-slate-900 dark:text-white'}`}
                  >
                    {m.label}
                  </p>
                  <p
                    className={`mt-0.5 text-xs leading-relaxed ${isActive ? 'text-white/75' : 'text-slate-500 dark:text-slate-400'}`}
                  >
                    {m.description}
                  </p>
                </div>
              </div>

              {isActive && (
                <div className="absolute right-3 top-3">
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white/30">
                    <svg
                      className="h-2.5 w-2.5 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </div>
              )}
            </button>
          )
        })}
      </div>

      {/* Search input */}
      <form onSubmit={onSubmit} className="group relative">
        <div
          className={`relative flex items-center overflow-hidden rounded-2xl border bg-[var(--whiteBackground)] dark:bg-slate-900 shadow-sm transition-all duration-300 ${activeMode.ring} ${
            mode === 'smart'
              ? 'border-violet-200 dark:border-violet-800/60'
              : 'border-slate-200 dark:border-slate-700'
          }`}
        >
          <div
            className={`absolute left-0 top-0 h-full w-1 rounded-l-2xl bg-gradient-to-b ${activeMode.gradient}`}
          />

          <span
            className={`ml-4 shrink-0 transition-colors duration-200 text-slate-400 ${activeMode.textFocus}`}
          >
            {activeMode.icon}
          </span>

          <input
            type="text"
            value={keywordInput}
            onChange={(e) => setKeywordInput(e.target.value)}
            placeholder={
              mode === 'smart'
                ? 'Describe what you need — e.g. "someone to help me design a logo in Arabic"'
                : 'Search people, offers or requests...'
            }
            className="flex-1 bg-transparent py-4 pl-3 pr-4 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400 dark:text-white dark:placeholder:text-slate-500"
          />

          <button
            type="submit"
            aria-label="Submit search"
            disabled={!keywordInput.trim()}
            className={`mr-2 flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-40 active:scale-95 bg-gradient-to-r ${activeMode.gradient} hover:brightness-110 hover:shadow-lg`}
          >
            <span className="hidden sm:inline">
              {mode === 'smart' ? 'Smart Search' : 'Search'}
            </span>
            <svg
              width="14"
              height="14"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>

        <p
          className={`mt-2 ml-1 text-xs transition-colors duration-200 ${
            mode === 'smart'
              ? 'text-violet-500 dark:text-violet-400'
              : 'text-slate-400 dark:text-slate-500'
          }`}
        >
          {mode === 'smart'
            ? '✦ Smart Search uses AI to find the best matches for your description'
            : 'Matches exact keywords in titles and descriptions'}
        </p>
      </form>
    </div>
  )
}
