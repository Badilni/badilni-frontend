import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import useAuthStore from '../../store/authStore'
import ThemeToggle from '../common/ThemeToggle'
import Button from '../common/Button'
import Logo from '../../../public/logo.png'
import AdvancedSearchSystem from '../AdvancedSearch/AdvancedSearchSystem'
import UserSidebar from './UserSidebar'

// Centralized Navigation Config with Labels and Routes
const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'Explore', path: '/explore' },
  { label: 'Requests', path: '/requests' },
  { label: 'Skills', path: '/skills' },
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

  // Automatically close mobile hamburger menu on route changes
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  const handleLogin = () => navigate('/SignIn')
  
  const handleSignOut = async () => {
    setSidebarOpen(false)
    await logout(navigate)
  }

  // Checks if a navigation tab matches the active window path
  const isActiveRoute = (path) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <>
      <header className="w-full sticky top-0 z-40 transition-colors duration-200 border-b border-gray-200/80 dark:border-slate-800/80 bg-[var(--whiteBackground)]/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          
          {/* Brand Logo Group */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 shrink-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/40 p-1 hover:opacity-90 transition-all duration-200"
            aria-label="Go to homepage"
          >
            <img src={Logo} alt="Badilni Logo" className="w-9 h-9 object-contain" />
            <span className="text-2xl font-black tracking-tight hidden sm:block bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-300 font-sans">
              Badilni
            </span>
          </button>

          {/* Desktop Links (Hidden below Large Viewports to secure room for inputs) */}
          <nav className="hidden xl:flex items-center gap-1" aria-label="Main navigation">
            {NAV_ITEMS.map((item) => {
              const active = isActiveRoute(item.path)
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`px-3.5 py-2 text-sm font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/40 ${
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

          {/* Persistent Dynamic Search Field (Expanded desktop layout) */}
          <div className="hidden md:block flex-1 max-w-sm lg:max-w-md transition-all duration-200">
            <AdvancedSearchSystem compact />
          </div>

          {/* Header Action Utilities */}
          <div className="flex items-center gap-2 shrink-0">
            
            {/* Inbox Chat Triggers */}
            <button
              onClick={() => navigate('/chat')}
              className="p-2.5 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
              aria-label="Open chat application wrapper"
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </button>

            {/* Dark Mode Switcher */}
            <ThemeToggle />

            {/* Secure Authentication Access Nodes */}
            {!user ? (
              <Button variant="outline" size="sm" onClick={handleLogin}>
                Sign In
              </Button>
            ) : (
              <AvatarButton user={user} onClick={() => setSidebarOpen(true)} />
            )}

            {/* Tablet/Mobile Hamburger Control Button */}
            <button
              className="xl:hidden p-2.5 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={menuOpen ? 'Close system navigation menu' : 'Open system navigation menu'}
              aria-expanded={menuOpen}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Responsive Drawer Menu Expansion Panel */}
        {menuOpen && (
          <div className="xl:hidden border-t border-gray-100 dark:border-slate-800 bg-[var(--whiteBackground)] dark:bg-slate-900 transition-all duration-300 ease-in-out px-4 py-4 space-y-4 shadow-inner">
            
            {/* Mobile View Standalone Search Input Overlay */}
            <div className="md:hidden">
              <AdvancedSearchSystem compact />
            </div>

            <nav className="flex flex-col gap-1" aria-label="Mobile navigation configuration context">
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

            {!user && (
              <div className="pt-3 border-t border-gray-100 dark:border-slate-800">
                <Button variant="outline" size="sm" onClick={handleLogin} className="w-full justify-center py-2.5">
                  Sign In
                </Button>
              </div>
            )}
          </div>
        )}
      </header>

      {/* Global Context User Navigation Drawer */}
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

/**
 * Reusable Local Avatar Button Component
 * Eliminates layout logic duplication across viewport breakpoints.
 */
function AvatarButton({ user, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 p-1 border border-gray-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 rounded-full cursor-pointer transition-all duration-200 bg-gray-50 dark:bg-slate-800/40 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
      aria-label="Open personalized user profile settings drawer"
    >
      <img
        src={user.avatar?.url}
        alt={user.name || 'User configuration profile image'}
        className="w-7 h-7 rounded-full object-cover border-2 border-[var(--primary-light)] shadow-sm shrink-0"
      />
      <span className="hidden sm:block text-xs font-semibold text-gray-700 dark:text-gray-200 pr-2 max-w-[90px] truncate select-none">
        {user.name?.split(' ')[0] || 'User'}
      </span>
    </button>
  )
}