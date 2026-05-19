const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  const variants = {
    primary:
      'border-none rounded-[60px] overflow-hidden bg-[linear-gradient(to_bottom,var(--secondary-light),var(--primary-light))] text-white hover:opacity-90 transition-all shadow-md',
    secondary:
      'border-none rounded-[60px] overflow-hidden bg-[linear-gradient(to_left,var(--secondary-light),var(--primary-light))] text-white hover:opacity-90 transition-all shadow-md',
    outline:
      'border border-[var(--primary-light)] rounded-[60px] text-[var(--black-text)] hover:text-white hover:bg-[var(--primary-light)] bg-transparent transition-all',
    danger:
      'bg-[var(--whiteBackground)] border border-[var(--danger)] text-[var(--danger)] rounded-[60px] hover:text-white hover:bg-[var(--backgDanger)] transition-all',
    skills:
      'bg-[var(--whiteBackground)] border border-transparent rounded-[60px] text-[var(--black-text)] hover:border-[var(--primary-light)] hover:text-[var(--primary-light)] hover:bg-[var(--primary-light)]/10 transition-all',
    Skip: 'bg-[var(--background-light)] border-none rounded-[60px] text-[var(--grat-text)] hover:text-[var(--primary-light)] transition-all',
    Disable:
      'border-none rounded-[60px] bg-[var(--Disabled)] text-white cursor-not-allowed opacity-50',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5',
    lg: 'px-8 py-2 text-lg ',
  }

  return (
    <button
      className={`font-poppins font-medium transition-all duration-300 shadow-sm active:scale-95 
        ${variants[variant]}
        ${sizes[size]}
        ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
