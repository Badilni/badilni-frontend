const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md',       
  className = '', 
  ...props 
}) => {
  

  const variants = {
    primary:'border-none rounded-[60px] overflow-hidden bg-[linear-gradient(to_bottom,#2f97e9,#2d94e6,#2c92e3,#2a8fe0,#298ddd,#278ada,#2688d7,#2485d5,#2383d2,#2180cf,#207ecc,#1e7bc9)] text-white',
    secondary:'border-none rounded-[60px] overflow-hidden bg-[linear-gradient(to_left,#2f97e9,#2d94e6,#2c92e3,#2a8fe0,#298ddd,#278ada,#2688d7,#2485d5,#2383d2,#2180cf,#207ecc,#1e7bc9)] text-white',
    outline:'border-1 rounded-[60px] border-[#2F97E9] text-[#1A1D2E] hover:text-[#2F97E9]',
    danger:'bg-white border border-[#FF6B6B] text-[#FF6B6B] rounded-[60px] hover:text-white hover:bg-[#FF6B6B]',
    skills :'bg-white  border-1 border-white rounded-[60px] text-[#1A1D2E] hover:border-[#2F97E9] hover:text-[#2F97E9] hover:bg-[#2f97e9]/10',
    Skip : 'bg-[#f5f5f5] border-none rounded-[60px] text-[#6B7280] hover:text-[#2F97E9]',
    Disable:'border-none rounded-[60px] bg-[#737373] text-white ',
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