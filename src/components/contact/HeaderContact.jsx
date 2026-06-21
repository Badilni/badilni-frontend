export default function HelpHeroSection() {
  return (
    <div className="relative w-full bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-900 pt-16 pb-36 text-white overflow-hidden font-poppins">
      <header className="relative z-10 text-center max-w-2xl mx-auto px-4 mb-6">
        <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-5 drop-shadow-md">
          We are here to help you
        </h1>
        <p className="text-sm md:text-base text-blue-100/80 max-w-lg mx-auto leading-relaxed">
          Have a question about skill exchange? Or want to report an issue? Our
          team is ready to answer all your questions.
        </p>
      </header>

      <div className="absolute bottom-0 left-0 right-0 w-full pointer-events-none leading-none overflow-hidden">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-[120px] text-[var(--background-light)] fill-current transition-colors duration-300 transform translate-y-1"
        >
          <path d="M0,32 C300,90 600,-10 900,70 C1050,110 1150,90 1200,80 V120 H0 Z"></path>
        </svg>
      </div>
    </div>
  )
}
