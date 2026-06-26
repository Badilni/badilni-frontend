const DeactivateButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="group w-full flex items-center justify-center gap-2.5 bg-[var(--backgDanger)] font-medium text-[13px] font-['Poppins',_sans-serif] cursor-pointer text-[var(--whiteBackground)] transition-all duration-200 ease-out border-none hover:-translate-y-1 hover:shadow-lg hover:shadow-red-500/20 active:translate-y-0 active:scale-98"
      style={{ padding: '9px', borderRadius: '9px' }}
    >
      <div className="w-7 h-7 rounded-[7px] flex items-center justify-center flex-shrink-0 transition-all duration-200 ease-out bg-white/10 group-hover:bg-white/20">
        <svg
          width="16"
          height="16"
          fill="none"
          viewBox="0 0 24 24"
          className="transition-all duration-200 ease-out stroke-[var(--whiteBackground)]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>
      Deactivate Me
    </button>
  )
}

export default DeactivateButton
