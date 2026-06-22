const DeactivateButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        padding: '9px',
        border: 'none',
        borderRadius: '9px',
        backgroundColor: 'transparent',
        color: 'var(--danger)',
        fontSize: '13px',
        fontWeight: '500',
        cursor: 'pointer',
        fontFamily: 'Poppins, sans-serif',
        transition: 'all 0.15s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--backgDanger)';
        e.currentTarget.style.color = 'var(--whiteBackground)';
        const iconContainer = e.currentTarget.firstElementChild;
        if (iconContainer) {
          iconContainer.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
          iconContainer.firstElementChild.setAttribute('stroke', 'var(--whiteBackground)');
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
        e.currentTarget.style.color = 'var(--danger)';
        const iconContainer = e.currentTarget.firstElementChild;
        if (iconContainer) {
          iconContainer.style.backgroundColor = 'var(--backgDangerOpacity)';
          iconContainer.firstElementChild.setAttribute('stroke', 'var(--danger)');
        }
      }}
    >
      <div
        style={{
          width: '28px',
          height: '28px',
          borderRadius: '7px',
          backgroundColor: 'var(--backgDangerOpacity)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.15s ease',
          flexShrink: 0,
        }}
      >
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="var(--danger)" style={{ transition: 'all 0.15s ease' }}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
        </svg>
      </div>

      Deactivate Me
    </button>
  );
};

export default DeactivateButton;
