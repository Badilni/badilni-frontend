import { usePWAInstall } from '../../hooks/usePWAInstall'

export default function PWAInstallButton() {
  const { canInstall, install } = usePWAInstall()

  if (!canInstall) return null

  return (
    <button
      type="button"
      onClick={install}
      className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[var(--secondary-light)] to-[var(--primary-light)] hover:brightness-110 transition-all active:scale-95 shadow-sm"
    >
      <svg
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
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