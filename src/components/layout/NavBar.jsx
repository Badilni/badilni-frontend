import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../../store/authStore'
import ThemeToggle from '../common/ThemeToggle'
import Button from '../common/Button'
import Logo from '../../../public/logo.png'
import AdvancedSearchSystem from '../AdvancedSearch/AdvancedSearchSystem'
import UserSidebar from './UserSidebar'

const NAV_LINKS = ['Explore', 'Requests', 'Skills', 'About Us', 'Contact']

const navbarStyle = {
  backgroundColor: 'var(--whiteBackground)',
  borderBottom: '1px solid var(--border-color, #e2e8f0)',
  fontFamily: 'Poppins, sans-serif',
}

const navLinkStyle = {
  color: 'var(--black-text)',
  background: 'none',
  border: 'none',
  padding: '6px 12px',
  borderRadius: '8px',
  fontSize: '14px',
  fontWeight: '500',
  cursor: 'pointer',
  transition: 'background 0.15s, color 0.15s',
  fontFamily: 'Poppins, sans-serif',
}

const iconBtnStyle = {
  background: 'none',
  border: 'none',
  color: 'var(--gray-text)',
  padding: '8px',
  borderRadius: '8px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'background 0.15s, color 0.15s',
}

const mobileMenuStyle = {
  backgroundColor: 'var(--whiteBackground)',
  borderTop: '1px solid var(--border-color, #e2e8f0)',
  padding: '12px 16px 16px',
}

const NavBar = () => {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)

  const [menuOpen, setMenuOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [hoveredLink, setHoveredLink] = useState(null)

  const handleLogin = () => navigate('/SignIn')
  const handleSignOut = async () => {
    setSidebarOpen(false)
    await logout(navigate)
  }

  return (
    <>
      <header
        className="w-full sticky top-0 z-40 shadow-sm"
        style={navbarStyle}
      >
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">

          {/* Logo */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 shrink-0 hover:opacity-80 transition-opacity"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            aria-label="Go to homepage"
          >
            <img src={Logo} alt="" className="w-9 h-9 object-contain" />
            <span
              className="text-2xl font-bold hidden sm:block"
              style={{ color: 'var(--secondary-light)', fontFamily: 'Poppins, sans-serif' }}
            >
              Badilni
            </span>
          </button>

          {/* Desktop nav links */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                style={{
                  ...navLinkStyle,
                  backgroundColor: hoveredLink === link ? 'var(--background-light)' : 'transparent',
                  color: hoveredLink === link ? 'var(--primary-light)' : 'var(--black-text)',
                }}
                onMouseEnter={() => setHoveredLink(link)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                {link}
              </button>
            ))}
          </nav>

          {/* Search — desktop */}
          <div className="hidden md:flex flex-1 max-w-xs lg:max-w-sm">
            <AdvancedSearchSystem compact />
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2 shrink-0">

            {/* Chat icon */}
            <button
              onClick={() => navigate('/chat')}
              style={iconBtnStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--background-light)'
                e.currentTarget.style.color = 'var(--primary-light)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.color = 'var(--gray-text)'
              }}
              aria-label="Open chat"
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </button>

            <ThemeToggle />

            {!user ? (
              <Button variant="outline" size="sm" onClick={handleLogin}>
                Sign In
              </Button>
            ) : (
              <button
                onClick={() => setSidebarOpen(true)}
                className="flex items-center gap-2"
                style={{
                  background: 'none',
                  border: '1px solid var(--border-color, #e2e8f0)',
                  borderRadius: '99px',
                  padding: '4px 12px 4px 4px',
                  cursor: 'pointer',
                  transition: 'background 0.15s',
                  fontFamily: 'Poppins, sans-serif',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--background-light)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                aria-label="Open profile"
              >
                <img
                  src={user.avatar?.url}
                  alt={user.name || 'User avatar'}
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '2px solid var(--primary-light)',
                  }}
                />
                <span
                  className="hidden sm:block text-sm font-medium max-w-[100px] truncate"
                  style={{ color: 'var(--black-text)' }}
                >
                  {user.name?.split(' ')[0] || 'User'}
                </span>
              </button>
            )}

            {/* Mobile hamburger */}
            <button
              className="lg:hidden"
              onClick={() => setMenuOpen((v) => !v)}
              style={{
                ...iconBtnStyle,
                color: menuOpen ? 'var(--primary-light)' : 'var(--gray-text)',
              }}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile expanded menu */}
        {menuOpen && (
          <div className="lg:hidden" style={mobileMenuStyle}>
            {/* Mobile search */}
            <div className="md:hidden pb-2">
              <AdvancedSearchSystem compact />
            </div>

            <nav className="flex flex-col gap-1 pt-1" aria-label="Mobile navigation">
              {NAV_LINKS.map((link) => (
                <button
                  key={link}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    ...navLinkStyle,
                    textAlign: 'left',
                    padding: '10px 12px',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--background-light)'
                    e.currentTarget.style.color = 'var(--primary-light)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent'
                    e.currentTarget.style.color = 'var(--black-text)'
                  }}
                >
                  {link}
                </button>
              ))}
            </nav>

            {!user && (
              <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid var(--border-color, #e2e8f0)' }}>
                <Button variant="outline" size="sm" onClick={handleLogin} className="w-full">
                  Sign In
                </Button>
              </div>
            )}
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

export default NavBar