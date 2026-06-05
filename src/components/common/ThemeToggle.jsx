import { useThemeStore } from '../../store/themeStore'

const ThemeToggle = ({ className = '' }) => {
  const { isDarkMode, toggleTheme } = useThemeStore()

  return (
    <button
      onClick={toggleTheme}
      className={`relative flex items-center justify-between w-16 h-8 p-1 rounded-full cursor-pointer bg-slate-200 dark:bg-slate-700 transition-colors duration-300 shadow-inner focus:outline-none border border-slate-300/50 dark:border-slate-600/50 ${className}`}
      aria-label="Toggle Theme"
    >
      <div
        className={`absolute w-6 h-6 rounded-full shadow-md flex items-center justify-center transform transition-transform duration-300 ${
          isDarkMode
            ? 'translate-x-8 bg-slate-900 text-yellow-400'
            : 'translate-x-0 bg-white text-amber-500'
        }`}
      >
        {isDarkMode ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4 animate-[spin_10s_linear_infinite]"
          >
            <circle cx="12" cy="12" r="5" fill="currentColor" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-4 h-4 text-slate-700"
          >
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        )}
      </div>

      <span className="ml-1.5 opacity-30 dark:opacity-10">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 text-slate-900">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      </span>
      <span className="mr-1.5 opacity-10 dark:opacity-40">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-yellow-500">
          <circle cx="12" cy="12" r="5" />
        </svg>
      </span>
    </button>
  )
}

export default ThemeToggle
