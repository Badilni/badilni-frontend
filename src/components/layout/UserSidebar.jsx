import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import DeactivateButton from '../DeactiveateMe/Deactiveate'
import DeactivateConfirmModal from '../DeactiveateMe/DeactivateConfirmModal'
import { deactivateMeRequest } from '../../api/authApi'
import { handleToastMessage } from '../../utils/helper'
import { useWalletBalance } from '../../hooks/Profile/transactions/useWalletBalance'
import { useTransactions } from '../../hooks/Profile/transactions/useTransations'
import {
  getTransactionDirection,
  getTransactionLabel,
} from '../../utils/transactionDisplay'
import { useBookings } from '../../hooks/booking/useBookings'
import { getBookingRole } from '../../utils/bookingPermissions'
import { BOOKING_STATUS } from '../../utils/bookingStatus'
import BookingStatusBadge from '../bookings/BookingStatusBadge'

const TABS = [
  {
    id: 'profile',
    label: 'Profile',
    icon: (
      <svg
        width="15"
        height="15"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    ),
  },
  {
    id: 'credits',
    label: 'Credits',
    icon: (
      <svg
        width="15"
        height="15"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    id: 'sessions',
    label: 'Sessions',
    icon: (
      <svg
        width="15"
        height="15"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
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
const ProfileTab = ({ user, navigate, openConfirmModal }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    {/* Avatar */}
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        padding: '12px 0',
      }}
    >
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
          onClick={() => navigate('/profile/edit')} // FIX: was navigation.navigate('/#/profile/edit')
        >
          <svg
            width="11"
            height="11"
            fill="none"
            viewBox="0 0 24 24"
            stroke="var(--gray-text)"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        </button>
      </div>
      <div style={{ textAlign: 'center' }}>
        <p
          style={{
            fontWeight: '600',
            fontSize: '15px',
            color: 'var(--black-text)',
            margin: 0,
          }}
        >
          {user.name || 'User'}
        </p>
        <p style={{ fontSize: '12px', color: 'var(--gray-text)', margin: 0 }}>
          {user.email || ''}
        </p>
      </div>
    </div>

    {/* Fields */}
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {[
        { label: 'Full name', value: user.name || '—' },
        { label: 'Email', value: user.email || '—' },
        {
          label: 'Member since',
          value: user.createdAt
            ? new Date(user.createdAt).toLocaleDateString()
            : '—',
        },
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
      onMouseEnter={(e) =>
        (e.currentTarget.style.backgroundColor = 'var(--background-light)')
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.backgroundColor = 'transparent')
      }
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
      onMouseEnter={(e) =>
        (e.currentTarget.style.backgroundColor = 'var(--background-light)')
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.backgroundColor = 'transparent')
      }
      // onClick={() => navigate('/profile').navigate('/edit')}
      onClick={() => navigate('/profile/edit')} // FIX: was navigation.navigate('/#/profile/edit')
    >
      Edit profile
    </button>

    {/* ──  DeactivateButton ── */}
    <DeactivateButton onClick={openConfirmModal} />
  </div>
)

/* ── Credits tab ── */
// FIX: was fully hardcoded (240 balance, fake 60/300 progress bar, 3 fake
// transactions). Now backed by GET /transactions/balance + GET /transactions.
const CreditsTab = ({ user }) => {
  const currentUserId = user?._id ?? user?.id

  const {
    data: balanceData,
    isLoading: isBalanceLoading,
    isError: isBalanceError,
    refetch: refetchBalance,
  } = useWalletBalance()

  const {
    data: txData,
    isLoading: isTxLoading,
    isError: isTxError,
    refetch: refetchTransactions,
  } = useTransactions({ limit: 5 })

  // ASSUMPTION: GET /transactions/balance wraps the figures as
  // { data: { walletBalance, creditsInEscrow } } — confirmed by screenshot.
  // Be tolerant of multiple possible response shapes. Backend sometimes
  // returns numbers under different keys depending on endpoint/version.
  const walletBalance =
    balanceData?.data?.walletBalance ??
    balanceData?.walletBalance ??
    (txData?.walletSummary && txData.walletSummary.walletBalance) ??
    txData?.walletBalance

  const creditsInEscrow =
    balanceData?.data?.creditsInEscrow ??
    balanceData?.creditsInEscrow ??
    (txData?.walletSummary && txData.walletSummary.creditsInEscrow) ??
    txData?.creditsInEscrow

  // GET /transactions additionally returns a walletSummary alongside the
  // paginated list (confirmed by screenshot) — reused here instead of
  // making a second call just for totalEarned/totalSpent.
  const walletSummary = txData?.walletSummary ?? txData?.data?.walletSummary
  const transactions = txData?.data?.transactions ?? txData?.transactions ?? []

  // Upcoming sessions: fetch recent bookings and show those scheduled in future
  const { data: bookingsData } = useBookings({ page: 1, limit: 5 })
  const bookings = bookingsData?.data?.bookings ?? []
  const upcoming = bookings
    .filter(
      (b) =>
        b.scheduledAt &&
        new Date(b.scheduledAt) > new Date() &&
        b.status === BOOKING_STATUS.ACCEPTED
    )
    .slice(0, 5)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div
        style={{
          borderRadius: '12px',
          background:
            'linear-gradient(135deg, var(--primary-light), var(--secondary-light))',
          padding: '18px',
          color: '#fff',
        }}
      >
        <p style={{ fontSize: '11px', opacity: 0.8, margin: '0 0 4px' }}>
          Available credits
        </p>

        {isBalanceLoading ? (
          <p
            style={{
              fontSize: '20px',
              fontWeight: '600',
              margin: 0,
              opacity: 0.85,
            }}
          >
            Loading…
          </p>
        ) : isBalanceError ? (
          <button
            onClick={() => refetchBalance()}
            style={{
              fontSize: '13px',
              fontWeight: '600',
              background: 'rgba(255,255,255,0.15)',
              border: 'none',
              borderRadius: '8px',
              color: '#fff',
              padding: '6px 12px',
              cursor: 'pointer',
            }}
          >
            Couldn&apos;t load balance — Retry
          </button>
        ) : (
          <p style={{ fontSize: '30px', fontWeight: '700', margin: 0 }}>
            {walletBalance ?? 0}
          </p>
        )}

        {!isBalanceLoading && !isBalanceError && creditsInEscrow > 0 && (
          <p style={{ fontSize: '11px', opacity: 0.65, margin: '4px 0 0' }}>
            {creditsInEscrow} credit{creditsInEscrow === 1 ? '' : 's'} in escrow
          </p>
        )}
      </div>

      {walletSummary && (
        <div style={{ display: 'flex', gap: '10px' }}>
          <div
            style={{
              ...S.card,
              flex: 1,
              backgroundColor: 'var(--background-light)',
            }}
          >
            <p style={S.label}>Total earned</p>
            <p
              style={{ ...S.value, fontWeight: '600', color: 'var(--success)' }}
            >
              +{walletSummary.totalEarned ?? 0}
            </p>
          </div>
          <div
            style={{
              ...S.card,
              flex: 1,
              backgroundColor: 'var(--background-light)',
            }}
          >
            <p style={S.label}>Total spent</p>
            <p
              style={{ ...S.value, fontWeight: '600', color: 'var(--danger)' }}
            >
              -{walletSummary.totalSpent ?? 0}
            </p>
          </div>
        </div>
      )}

      <div>
        <p style={{ ...S.label, marginBottom: '8px' }}>Recent transactions</p>

        {isTxLoading && (
          <p style={{ fontSize: '12px', color: 'var(--gray-text)' }}>
            Loading…
          </p>
        )}

        {isTxError && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '8px',
            }}
          >
            <p style={{ fontSize: '12px', color: 'var(--danger)', margin: 0 }}>
              Couldn&apos;t load transactions.
            </p>
            <button
              onClick={() => refetchTransactions()}
              style={{
                fontSize: '12px',
                fontWeight: '600',
                color: 'var(--primary-light)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
              }}
            >
              Retry
            </button>
          </div>
        )}

        {!isTxLoading && !isTxError && transactions.length === 0 && (
          <p style={{ fontSize: '12px', color: 'var(--gray-text)' }}>
            No transactions yet.
          </p>
        )}

        {!isTxLoading &&
          !isTxError &&
          transactions.map((transaction) => {
            const direction = getTransactionDirection(
              transaction,
              currentUserId
            )
            const isCredit = direction === 'credit'
            const isEscrow = transaction.type === 'escrow_lock'
            const label =
              transaction.description ||
              getTransactionLabel(transaction, currentUserId)

            const amountText = isEscrow
              ? `±${transaction.amount}`
              : isCredit
                ? `+${transaction.amount}`
                : `-${transaction.amount}`

            const amountColor = isEscrow
              ? 'var(--warning, #D97706)'
              : isCredit
                ? 'var(--success)'
                : 'var(--danger)'

            return (
              <div
                key={transaction._id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '9px 0',
                  borderBottom: '1px solid var(--border-color, #e2e8f0)',
                }}
              >
                <div>
                  <p
                    style={{
                      fontSize: '12px',
                      color: 'var(--black-text)',
                      margin: 0,
                    }}
                  >
                    {label}
                  </p>
                  <p
                    style={{
                      fontSize: '11px',
                      color: 'var(--gray-text)',
                      margin: 0,
                    }}
                  >
                    {new Date(transaction.createdAt).toLocaleDateString(
                      undefined,
                      {
                        month: 'short',
                        day: 'numeric',
                      }
                    )}
                  </p>
                </div>
                <span
                  style={{
                    fontSize: '13px',
                    fontWeight: '600',
                    color: amountColor,
                  }}
                >
                  {amountText}
                </span>
              </div>
            )
          })}
      </div>
    </div>
  )
}

/* ── Sessions tab ── */
const SessionsTab = ({ user }) => {
  const { data: bookingsData, isLoading } = useBookings({ page: 1, limit: 5 })
  const bookings = bookingsData?.data?.bookings ?? []
  const upcoming = bookings
    .filter(
      (b) =>
        b.scheduledAt &&
        new Date(b.scheduledAt) > new Date() &&
        b.status === BOOKING_STATUS.ACCEPTED
    )
    .slice(0, 5)

  if (isLoading) {
    return (
      <p style={{ fontSize: '12px', color: 'var(--gray-text)' }}>
        Loading upcoming sessions…
      </p>
    )
  }

  if (upcoming.length === 0) {
    return (
      <p style={{ fontSize: '12px', color: 'var(--gray-text)' }}>
        No upcoming sessions.
      </p>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {upcoming.map((b) => {
        const role = getBookingRole(b, user)
        const counterpart = role === 'provider' ? b.receiver : b.provider
        return (
          <div
            key={b._id}
            style={{
              ...S.card,
              display: 'flex',
              gap: '10px',
              alignItems: 'center',
            }}
          >
            <img
              src={counterpart?.avatar?.url}
              alt={counterpart?.name}
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                objectFit: 'cover',
              }}
            />
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: '13px', fontWeight: '600', margin: 0 }}>
                {b.listing?.title ?? b.request?.title ?? 'Session'}
              </p>
              <p
                style={{
                  fontSize: '11px',
                  color: 'var(--gray-text)',
                  margin: '4px 0 0',
                }}
              >
                {counterpart?.name ?? 'Unknown'} ·{' '}
                {new Date(b.scheduledAt).toLocaleString()}
              </p>
            </div>
            <div style={{ flexShrink: 0 }}>
              <BookingStatusBadge status={b.status} />
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ── Main Sidebar ── */
const UserSidebar = ({ open, onClose, user, onSignOut }) => {
  const [activeTab, setActiveTab] = useState('profile')
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const navigate = useNavigate()

  const handleDeactivateAccount = async () => {
    try {
      await deactivateMeRequest()
      handleToastMessage(
        'Your account has been deactivated successfully. 💔',
        'success'
      )
      setIsConfirmOpen(false)
      onClose()
      navigate('/signIn')
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        'Failed to deactivate account.'
      handleToastMessage(msg, 'error')
    }
  }

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        if (isConfirmOpen) setIsConfirmOpen(false)
        else onClose()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose, isConfirmOpen])

  useEffect(() => {
    document.body.style.overflow = open || isConfirmOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open, isConfirmOpen])

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 50,
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
          position: 'fixed',
          top: 0,
          right: 0,
          zIndex: 51,
          height: '100%',
          width: '300px',
          maxWidth: '100%',
          backgroundColor: 'var(--whiteBackground)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-4px 0 24px rgba(0,0,0,0.15)',
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1)',
          fontFamily: 'Poppins, sans-serif',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '14px 18px',
            ...S.divider,
            borderTop: 'none',
            borderLeft: 'none',
            borderRight: 'none',
          }}
        >
          <span
            style={{
              fontWeight: '600',
              fontSize: '15px',
              color: 'var(--black-text)',
            }}
          >
            Account
          </span>
          <button
            onClick={onClose}
            aria-label="Close sidebar"
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '7px',
              background: 'none',
              border: 'none',
              color: 'var(--gray-text)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.15s',
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor =
                'var(--background-light)')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = 'transparent')
            }
          >
            <svg
              width="14"
              height="14"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div
          style={{
            display: 'flex',
            borderBottom: '1px solid var(--border-color, #e2e8f0)',
            padding: '0 8px',
          }}
        >
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '10px 10px',
                  fontSize: '12px',
                  fontWeight: '500',
                  border: 'none',
                  borderBottom: isActive
                    ? '2px solid var(--primary-light)'
                    : '2px solid transparent',
                  background: 'none',
                  cursor: 'pointer',
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
          {activeTab === 'profile' && (
            <ProfileTab
              user={user}
              navigate={navigate}
              openConfirmModal={() => setIsConfirmOpen(true)}
            />
          )}
          {activeTab === 'credits' && <CreditsTab user={user} />}
          {activeTab === 'sessions' && <SessionsTab user={user} />}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '12px 18px',
            borderTop: '1px solid var(--border-color, #e2e8f0)',
          }}
        >
          <button
            onClick={onSignOut}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '7px',
              padding: '9px',
              border: 'none',
              borderRadius: '9px',
              backgroundColor: 'transparent',
              color: 'var(--danger)',
              fontSize: '13px',
              fontWeight: '500',
              cursor: 'pointer',
              fontFamily: 'Poppins, sans-serif',
              transition: 'background 0.15s',
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor =
                'var(--backgDangerOpacity)')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = 'transparent')
            }
          >
            <svg
              width="15"
              height="15"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Sign out
          </button>
        </div>
      </aside>

      <DeactivateConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleDeactivateAccount}
      />
    </>
  )
}

export default UserSidebar
