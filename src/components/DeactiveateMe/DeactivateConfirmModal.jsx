const DeactivateConfirmModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        backgroundColor: 'rgba(0,0,0,0.5)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Poppins, sans-serif',
        padding: '20px',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: 'var(--whiteBackground)',
          border: '1px solid #d1d5db',
          borderRadius: '16px',
          padding: '32px',
          width: '420px',
          maxWidth: '100%',
          boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
          textAlign: 'center',
          transition: 'all 0.3s ease-out',
        }}
      >
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: '#fee2e2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
          }}
        >
          <svg
            width="32"
            height="32"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#dc2626"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <h3
          style={{
            fontSize: '18px',
            fontWeight: '700',
            color: 'var(--black-text)',
            margin: '0 0 12px',
          }}
        >
          Deactivate Account
        </h3>

        <p
          style={{
            fontSize: '14px',
            color: 'var(--gray-text)',
            margin: '0 0 32px',
            lineHeight: '1.6',
          }}
        >
          Are you sure you want to deactivate your account? This action cannot
          be undone. You can restore your account by logging back in.
        </p>

        <div style={{ display: 'flex', gap: '16px' }}>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: '12px',
              borderRadius: '10px',
              border: '1px solid #d1d5db',
              backgroundColor: 'transparent',
              color: 'var(--black-text)',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background-color 0.2s ease',
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#f3f4f6')}
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = 'transparent')
            }
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            style={{
              flex: 1,
              padding: '12px',
              borderRadius: '10px',
              border: 'none',
              backgroundColor: '#dc2626',
              color: '#fff',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background-color 0.2s ease',
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#b91c1c')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#dc2626')}
          >
            Deactivate
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeactivateConfirmModal
