export default function ExploreHero() {
  return (
    <section className="relative overflow-hidden bg-slate-900 py-24 md:py-32">
      {/* Background Neon glow shapes */}
      <div className="absolute top-[-10%] left-[20%] w-[350px] md:w-[600px] h-[350px] md:h-[600px] rounded-full bg-blue-500/10 blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-[10%] right-[10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-purple-500/10 blur-[100px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-blue-300 text-xs font-bold px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Join over 5,000+ members swapping skills
        </div>

        <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-blue-200 mb-5 leading-tight tracking-tight">
          Explore Our Creative{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
            Community
          </span>
        </h1>

        <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-2xl font-medium">
          Discover talented members, inspect verified ratings, and start exchanging your skills instantly through real-time communication.
        </p>
      </div>

      {/* Wave bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            d="M0 60L1440 60L1440 0C1200 50 960 70 720 40C480 10 240 50 0 0L0 60Z"
            fill="var(--background-light)"
            className="dark:fill-slate-950 transition-colors duration-300"
          />
        </svg>
      </div>
    </section>
  )
}
