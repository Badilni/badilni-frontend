const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md',       
  className = '', 
  ...props 
}) => {
  

const variants = {

  primary: 'border-none rounded-[60px] overflow-hidden bg-[linear-gradient(to_bottom,#2f97e9,#2d94e6,#2c92e3,#2a8fe0,#298ddd,#278ada,#2688d7,#2485d5,#2383d2,#2180cf,#207ecc,#1e7bc9)] text-white hover:opacity-90 transition-all',
  secondary: 'border-none rounded-[60px] overflow-hidden bg-[linear-gradient(to_left,#2f97e9,#2d94e6,#2c92e3,#2a8fe0,#298ddd,#278ada,#2688d7,#2485d5,#2383d2,#2180cf,#207ecc,#1e7bc9)] text-white hover:opacity-90 transition-all',
  outline: 'border border-[var(--primary)] rounded-[60px] text-[var(--black-text)] hover:text-[var(--primary)] bg-transparent transition-all',
  danger: 'bg-[var(--whiteBackground)] border border-[var(--danger)] text-[var(--danger)] rounded-[60px] hover:text-white hover:bg-[var(--danger)] transition-all',
  skills: 'bg-[var(--whiteBackground)] border border-transparent rounded-[60px] text-[var(--black-text)] hover:border-[var(--primary)] hover:text-[var(--primary)] hover:bg-[var(--primary)]/10 transition-all',
  Skip: 'bg-[var(--background)] border-none rounded-[60px] text-[var(--grat-text)] hover:text-[var(--primary)] transition-all',
  Disable: 'border-none rounded-[60px] bg-[var(--Disabled)] text-white cursor-not-allowed opacity-70',
};

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5',
    lg: 'px-8 py-2 text-lg ',
  };

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
  );
};

export default Button;