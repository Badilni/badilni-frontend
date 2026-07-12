import { usePWAInstall } from '../../hooks/usePWAInstall'

export default function PWAInstallButton({ inMobileMenu = false }) {
  const { canInstall, install } = usePWAInstall()

  if (!canInstall) return null

  // Mobile/tablet drawer style — matches the nav link buttons
  if (inMobileMenu) {
    return (
      <button
        type="button"
        onClick={install}
        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800/50"
      >
        <svg
          width="18"
          height="18"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3"
          />
        </svg>
        Install App
      </button>
    )
  }

  // Desktop/header style — identical to chat & notification icon buttons
  return (
    <button
      type="button"
      onClick={install}
      title="Install App"
      aria-label="Install app"
      className="relative p-2.5 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/40 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400"
    >
      <svg
        width="20"
        height="20"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3"
        />
      </svg>
    </button>
  )
}