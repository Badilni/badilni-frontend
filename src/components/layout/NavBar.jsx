import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import useAuthStore from '../../store/authStore'
import ThemeToggle from '../common/ThemeToggle'
import Button from '../common/Button'
import Logo from '../../../public/logo.png'
import AdvancedSearchSystem from '../AdvancedSearch/AdvancedSearchSystem'
import UserSidebar from './UserSidebar'
import HeaderChatDropdown from '../Chat/HeaderChatDropdown'
import NotificationDropdown from '../notifications/NotificationDropdown'
import PWAInstallButton from './PWAInstallButton'

// Centralized Navigation Config with Labels and Routes
const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'Explore', path: '/explore' },
  { label: 'Requests', path: '/requests' },
  { label: 'Offers', path: '/offers' },
  { label: 'Bookings', path: '/booking' },
  { label: 'Matches', path: '/matches' },
  { label: 'About Us', path: '/about' },
  { label: 'Contact', path: '/contact' },
]

export default function NavBar() {
  const navigate = useNavigate()
  const location = useLocation()

  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)

  const [menuOpen, setMenuOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const handleOpenSidebar = () => setSidebarOpen(true)
    window.addEventListener('open-user-sidebar', handleOpenSidebar)
    return () =>
      window.removeEventListener('open-user-sidebar', handleOpenSidebar)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  const handleLogin = () => navigate('/SignIn')

  const handleSignOut = async () => {
    setSidebarOpen(false)
    await logout(navigate)
  }

  const isActiveRoute = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <>
      <header className="w-full sticky top-0 z-40 border-b border-gray-200/80 dark:border-slate-800/80 bg-[var(--whiteBackground)]/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm transition-colors duration-200">
        <div className="w-full max-w-[1600px] mx-auto px-3 sm:px-5 h-16 flex items-center gap-2">

          {/* ── LOGO — always visible ─────────────────────────────────────── */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 shrink-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/40 p-1 hover:opacity-90 transition-opacity duration-200"
            aria-label="Go to homepage"
          >
            <img
              src={Logo}
              alt="Badilni Logo"
              className="w-8 h-8 sm:w-9 sm:h-9 object-contain"
            />
            <span className="text-xl sm:text-2xl font-black tracking-tight bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-300">
              Badilni
            </span>
          </button>

          {/* ── DESKTOP NAV LINKS — 2xl+ only (≥1536px) ──────────────────── */}
          <nav
            className="hidden 2xl:flex items-center gap-0.5 shrink-0 ml-2"
            aria-label="Main navigation"
          >
            {NAV_ITEMS.map((item) => {
              const active = isActiveRoute(item.path)
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`px-3 py-2 text-sm font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/40 whitespace-nowrap ${
                    active
                      ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              )
            })}
          </nav>

          {/* ── SEARCH — xl+ inline; below xl it goes into drawer ─────────── */}
          <div className="hidden xl:flex flex-1 justify-center items-center min-w-0 px-3">
            <AdvancedSearchSystem compact />
          </div>

          {/* ── RIGHT ACTIONS ──────────────────────────────────────────────── */}
          <div className="flex items-center gap-1 sm:gap-1.5 ml-auto shrink-0">

            {/* Chat — sm+ header (component hides itself when not logged in) */}
            <div className="hidden sm:block">
              <HeaderChatDropdown />
            </div>

            {/* Notifications — sm+ header */}
            <div className="hidden sm:block">
              <NotificationDropdown />
            </div>

            {/* Install — sm+ header */}
            <div className="hidden sm:block">
              <PWAInstallButton />
            </div>

            {/* Theme toggle — always visible */}
            <ThemeToggle />

            {/* Auth button — hidden below sm (available in drawer) */}
            {!user ? (
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogin}
                className="hidden sm:flex whitespace-nowrap"
              >
                Sign In
              </Button>
            ) : (
              <AvatarButton user={user} onClick={() => setSidebarOpen(true)} />
            )}

            {/* Hamburger — visible below 2xl */}
            <button
              className="2xl:hidden p-2.5 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* ── DRAWER — below 2xl ──────────────────────────────────────────── */}
        {menuOpen && (
          <div className="2xl:hidden border-t border-gray-100 dark:border-slate-800 bg-[var(--whiteBackground)] dark:bg-slate-900 px-4 py-4 space-y-2 shadow-inner">

            {/* Search — below xl only */}
            <div className="xl:hidden pb-1">
              <AdvancedSearchSystem compact />
            </div>

            {/* Nav links */}
            <nav className="flex flex-col gap-0.5" aria-label="Mobile navigation">
              {NAV_ITEMS.map((item) => {
                const active = isActiveRoute(item.path)
                return (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className={`w-full text-left px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 ${
                      active
                        ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    {item.label}
                  </button>
                )
              })}
            </nav>

            {/* Utility section */}
            <div className="border-t border-gray-100 dark:border-slate-800 pt-3 space-y-1">

              {/* Icons row — only below sm (sm+ already in header) */}
              <div className="sm:hidden flex items-center gap-2 px-1 pb-1">
                <HeaderChatDropdown />
                <NotificationDropdown />
                <PWAInstallButton />
              </div>

              {/* Install as full-width labelled button — sm to 2xl */}
              <div className="hidden sm:block">
                <PWAInstallButton inMobileMenu />
              </div>

              {/* Sign In — below sm only */}
              {!user && (
                <div className="sm:hidden pt-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLogin}
                    className="w-full justify-center py-2.5"
                  >
                    Sign In
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {user && (
        <UserSidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          user={user}
          onSignOut={handleSignOut}
        />
      )}
    </>
  )
}

function AvatarButton({ user, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 p-1 border border-gray-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 rounded-full cursor-pointer transition-all duration-200 bg-gray-50 dark:bg-slate-800/40 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
      aria-label="Open user profile drawer"
    >
      <img
        src={user.avatar?.url}
        alt={user.name || 'User avatar'}
        className="w-7 h-7 rounded-full object-cover border-2 border-[var(--primary-light)] shadow-sm shrink-0"
      />
      <span className="hidden sm:block text-xs font-semibold text-gray-700 dark:text-gray-200 pr-2 max-w-[90px] truncate select-none">
        {user.name?.split(' ')[0] || 'User'}
      </span>
    </button>
  )
}
