import { useState } from 'react'

const POPULAR_TAGS = ['UI Design', 'React.js', 'Marketing', 'Python', 'Data Science', 'iOS']

export default function ExploreHero({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [locationQuery, setLocationQuery] = useState('')

  const handleSearch = () => onSearch?.(searchQuery)

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 dark:from-blue-800 dark:via-blue-900 dark:to-indigo-950">
      {/* Decorative blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 flex flex-col items-center text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/90 text-xs font-semibold px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          2,450+ expert mentors online
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-5 leading-tight tracking-tight">
          Learn anything from{' '}
          <span className="relative inline-block">
            <span className="relative z-10">anyone.</span>
            <span className="absolute inset-x-0 bottom-1 h-3 bg-white/20 rounded-full -z-0" />
          </span>
        </h1>

        <p className="text-white/75 text-base md:text-lg leading-relaxed mb-10 max-w-2xl">
          Discover thousands of mentors ready to share their expertise and help you grow your career through skill exchange.
        </p>

        {/* Search Bar */}
        <div className="w-full max-w-3xl bg-white dark:bg-slate-900 rounded-2xl p-2 flex flex-col sm:flex-row gap-2 shadow-2xl">
          <div className="flex-1 flex items-center gap-3 px-4 py-2 border-b sm:border-b-0 sm:border-r border-gray-100 dark:border-slate-700">
            <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Skill, tool, or mentor name..."
              className="w-full text-sm bg-transparent border-none outline-none text-gray-800 dark:text-gray-100 placeholder:text-gray-400"
            />
          </div>
          <div className="flex-1 flex items-center gap-3 px-4 py-2">
            <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <input
              type="text"
              value={locationQuery}
              onChange={(e) => setLocationQuery(e.target.value)}
              placeholder="Location or Remote"
              className="w-full text-sm bg-transparent border-none outline-none text-gray-800 dark:text-gray-100 placeholder:text-gray-400"
            />
          </div>
          <button
            onClick={handleSearch}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-8 py-3 rounded-xl text-sm font-bold transition-all duration-200 hover:shadow-lg active:scale-95 shrink-0"
          >
            Search Mentors
          </button>
        </div>

        {/* Popular tags */}
        <div className="flex flex-wrap justify-center items-center gap-2 mt-6">
          <span className="text-white/50 text-xs font-semibold">Popular:</span>
          {POPULAR_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => { setSearchQuery(tag); onSearch?.(tag) }}
              className="text-xs font-semibold text-white/80 hover:text-white bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/30 px-4 py-1.5 rounded-full transition-all duration-200"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Wave bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
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
