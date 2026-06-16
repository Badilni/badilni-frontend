import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const TABS = [
  {
    id: 'profile',
    label: 'Profile',
    icon: (
      <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    id: 'credits',
    label: 'Credits',
    icon: (
      <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: 'sessions',
    label: 'Sessions',
    icon: (
      <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
]

const S = {
  card: {
    backgroundColor: 'var(--whiteBackground)',
    border: '1px solid var(--border-color, #e2e8f0)',
    borderRadius: '10px',
    padding: '12px',
  },
  label: {
    fontSize: '10px',
    fontWeight: '600',
    color: 'var(--gray-text)',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    marginBottom: '3px',
  },
  value: {
    fontSize: '13px',
    color: 'var(--black-text)',
  },
  divider: {
    borderTop: '1px solid var(--border-color, #e2e8f0)',
  },
}

/* ── Profile tab ── */
// FIX: accept navigate as a prop instead of using undefined `navigation`
const ProfileTab = ({ user, navigate }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    {/* Avatar */}
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', padding: '12px 0' }}>
      <div style={{ position: 'relative' }}>
        <img
          src={user.avatar?.url}
          alt={user.name || 'User'}
          style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            objectFit: 'cover',
            border: '3px solid var(--primary-light)',
          }}
        />
        <button
          aria-label="Edit avatar"
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            backgroundColor: 'var(--whiteBackground)',
            border: '1px solid var(--border-color, #e2e8f0)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          onClick={() => navigate('/profile/edit')}  // FIX: was navigation.navigate('/#/profile/edit')
        >
          <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="var(--gray-text)" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </button>
      </div>
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontWeight: '600', fontSize: '15px', color: 'var(--black-text)', margin: 0 }}>{user.name || 'User'}</p>
        <p style={{ fontSize: '12px', color: 'var(--gray-text)', margin: 0 }}>{user.email || ''}</p>
      </div>
    </div>

    {/* Fields */}
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {[
        { label: 'Full name', value: user.name || '—' },
        { label: 'Email', value: user.email || '—' },
        { label: 'Member since', value: user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '—' },
      ].map(({ label, value }) => (
        <div key={label}>
          <p style={S.label}>{label}</p>
          <p style={S.value}>{value}</p>
        </div>
      ))}
    </div>

    <button
      style={{
        width: '100%',
        padding: '9px',
        border: '1px solid var(--border-color, #e2e8f0)',
        borderRadius: '9px',
        backgroundColor: 'transparent',
        color: 'var(--black-text)',
        fontSize: '13px',
        fontWeight: '500',
        cursor: 'pointer',
        fontFamily: 'Poppins, sans-serif',
        transition: 'background 0.15s',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--background-light)')}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
      onClick={() => navigate('/profile')}
    >
      Show profile
    </button>

    <button
      style={{
        width: '100%',
        padding: '9px',
        border: '1px solid var(--border-color, #e2e8f0)',
        borderRadius: '9px',
        backgroundColor: 'transparent',
        color: 'var(--black-text)',
        fontSize: '13px',
        fontWeight: '500',
        cursor: 'pointer',
        fontFamily: 'Poppins, sans-serif',
        transition: 'background 0.15s',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--background-light)')}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
      // onClick={() => navigate('/profile').navigate('/edit')}
      onClick={() => navigate('/profile/edit')}  // FIX: was navigation.navigate('/#/profile/edit')
    >
      Edit profile
    </button>
  </div>
)

/* ── Credits tab ── */
const CreditsTab = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <div style={{
      borderRadius: '12px',
      background: 'linear-gradient(135deg, var(--primary-light), var(--secondary-light))',
      padding: '18px',
      color: '#fff',
    }}>
      <p style={{ fontSize: '11px', opacity: 0.8, margin: '0 0 4px' }}>Available credits</p>
      <p style={{ fontSize: '30px', fontWeight: '700', margin: 0 }}>240</p>
      <p style={{ fontSize: '11px', opacity: 0.65, margin: '4px 0 0' }}>Resets Jul 1, 2026</p>
    </div>

    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--gray-text)', marginBottom: '6px' }}>
        <span>Used this month</span><span>60 / 300</span>
      </div>
      <div style={{ height: '6px', borderRadius: '99px', backgroundColor: 'var(--background-light)', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: '20%', borderRadius: '99px', backgroundColor: 'var(--primary-light)' }} />
      </div>
    </div>

    <div>
      <p style={{ ...S.label, marginBottom: '8px' }}>Recent transactions</p>
      {[
        { label: 'Skill exchange — Ahmed', change: -5, date: 'Jun 13' },
        { label: 'Bonus reward', change: +20, date: 'Jun 10' },
        { label: 'Skill exchange — Sara', change: -10, date: 'Jun 8' },
      ].map(({ label, change, date }) => (
        <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 0', borderBottom: '1px solid var(--border-color, #e2e8f0)' }}>
          <div>
            <p style={{ fontSize: '12px', color: 'var(--black-text)', margin: 0 }}>{label}</p>
            <p style={{ fontSize: '11px', color: 'var(--gray-text)', margin: 0 }}>{date}</p>
          </div>
          <span style={{ fontSize: '13px', fontWeight: '600', color: change > 0 ? 'var(--success)' : 'var(--danger)' }}>
            {change > 0 ? `+${change}` : change}
          </span>
        </div>
      ))}
    </div>

    <button
      style={{
        width: '100%',
        padding: '9px',
        border: 'none',
        borderRadius: '9px',
        backgroundColor: 'var(--background-light)',
        color: 'var(--primary-light)',
        fontSize: '13px',
        fontWeight: '500',
        cursor: 'pointer',
        fontFamily: 'Poppins, sans-serif',
        transition: 'opacity 0.15s',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
    >
      Buy credits
    </button>
  </div>
)

/* ── Sessions tab ── */
const SessionsTab = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
    <p style={{ fontSize: '12px', color: 'var(--gray-text)' }}>Devices where your account is active</p>

    {[
      { device: 'Chrome on Windows', location: 'Cairo, EG', active: true, time: 'Now' },
      { device: 'Safari on iPhone', location: 'Cairo, EG', active: false, time: '2 days ago' },
      { device: 'Firefox on macOS', location: 'Alexandria, EG', active: false, time: '5 days ago' },
    ].map(({ device, location, active, time }) => (
      <div
        key={device}
        style={{
          ...S.card,
          display: 'flex',
          alignItems: 'flex-start',
          gap: '10px',
          backgroundColor: 'var(--background-light)',
        }}
      >
        <div style={{
          width: '8px', height: '8px', borderRadius: '50%', marginTop: '4px', flexShrink: 0,
          backgroundColor: active ? 'var(--success)' : 'var(--Disabled)',
        }} />
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: '13px', fontWeight: '500', color: 'var(--black-text)', margin: 0 }}>{device}</p>
          <p style={{ fontSize: '11px', color: 'var(--gray-text)', margin: '2px 0 0' }}>{location} · {time}</p>
        </div>
        {!active && (
          <button
            style={{
              fontSize: '11px', fontWeight: '500', color: 'var(--danger)',
              background: 'none', border: 'none', cursor: 'pointer', padding: 0, flexShrink: 0,
            }}
          >
            Revoke
          </button>
        )}
      </div>
    ))}

    <button
      style={{
        width: '100%',
        padding: '9px',
        border: '1px solid var(--danger)',
        borderRadius: '9px',
        backgroundColor: 'var(--backgDangerOpacity)',
        color: 'var(--danger)',
        fontSize: '13px',
        fontWeight: '500',
        cursor: 'pointer',
        fontFamily: 'Poppins, sans-serif',
        transition: 'opacity 0.15s',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
    >
      Sign out all other sessions
    </button>
  </div>
)

/* ── Main Sidebar ── */
const UserSidebar = ({ open, onClose, user, onSignOut }) => {
  const [activeTab, setActiveTab] = useState('profile')
  const navigate = useNavigate()  // FIX: moved here so it can be passed to ProfileTab

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        aria-hidden="true"
        style={{
          position: 'fixed', inset: 0, zIndex: 50,
          backgroundColor: 'rgba(0,0,0,0.35)',
          backdropFilter: 'blur(2px)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 0.25s ease',
        }}
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="User account"
        style={{
          position: 'fixed', top: 0, right: 0, zIndex: 51,
          height: '100%', width: '300px', maxWidth: '100%',
          backgroundColor: 'var(--whiteBackground)',
          display: 'flex', flexDirection: 'column',
          boxShadow: '-4px 0 24px rgba(0,0,0,0.15)',
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1)',
          fontFamily: 'Poppins, sans-serif',
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '14px 18px',
          ...S.divider,
          borderTop: 'none', borderLeft: 'none', borderRight: 'none',
        }}>
          <span style={{ fontWeight: '600', fontSize: '15px', color: 'var(--black-text)' }}>Account</span>
          <button
            onClick={onClose}
            aria-label="Close sidebar"
            style={{
              width: '28px', height: '28px', borderRadius: '7px',
              background: 'none', border: 'none',
              color: 'var(--gray-text)', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--background-light)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color, #e2e8f0)', padding: '0 8px' }}>
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '5px',
                  padding: '10px 10px',
                  fontSize: '12px', fontWeight: '500',
                  border: 'none',
                  borderBottom: isActive ? '2px solid var(--primary-light)' : '2px solid transparent',
                  background: 'none', cursor: 'pointer',
                  color: isActive ? 'var(--primary-light)' : 'var(--gray-text)',
                  transition: 'color 0.15s, border-color 0.15s',
                  fontFamily: 'Poppins, sans-serif',
                }}
              >
                {tab.icon}
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Tab content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '18px' }}>
          {/* FIX: pass navigate down to ProfileTab */}
          {activeTab === 'profile' && <ProfileTab user={user} navigate={navigate} />}
          {activeTab === 'credits' && <CreditsTab />}
          {activeTab === 'sessions' && <SessionsTab />}
        </div>

        {/* Footer */}
        <div style={{ padding: '12px 18px', borderTop: '1px solid var(--border-color, #e2e8f0)' }}>
          <button
            onClick={onSignOut}
            style={{
              width: '100%',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px',
              padding: '9px',
              border: 'none', borderRadius: '9px',
              backgroundColor: 'transparent',
              color: 'var(--danger)',
              fontSize: '13px', fontWeight: '500',
              cursor: 'pointer',
              fontFamily: 'Poppins, sans-serif',
              transition: 'background 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--backgDangerOpacity)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sign out
          </button>
        </div>
      </aside>
    </>
  )
}

export default UserSidebar