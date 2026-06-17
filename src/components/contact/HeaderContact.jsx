export default function HelpHeroSection() {
  return (
    <div className="relative bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-900 pt-0 pb-28 text-white overflow-hidden font-poppins">

      <header className="relative z-10 text-center max-w-2xl mx-auto pt-12 pb-4 px-4">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4 drop-shadow-sm">
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
          style={{ color: 'var(--background-light)' }}
          className="relative block w-full h-[100px] fill-current transition-colors duration-300 transform translate-y-1"
        >
          <path d="M0,32L120,42.7C240,53,480,75,720,74.7C960,75,1120,53,1200,42.7V120H0Z"></path>
        </svg>
      </div>

    </div>
  );
}
