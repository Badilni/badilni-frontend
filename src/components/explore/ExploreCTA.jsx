export default function ExploreCTA() {
  return (
    <>
      {/* CTA Banner */}
      <section className="mt-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-blue-800 dark:to-indigo-900 p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 blur-2xl" />
          </div>
          <div className="relative z-10 text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-black text-white mb-2">Are you an expert?</h3>
            <p className="text-white/70 text-sm md:text-base max-w-md">
              Share your knowledge, exchange skills, and grow your network. Join thousands of mentors on Badilni.
            </p>
          </div>
          <div className="relative z-10 flex flex-col sm:flex-row gap-3 shrink-0">
            <button className="bg-white text-blue-700 font-bold text-sm px-8 py-3.5 rounded-xl hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95">
              Become a Mentor
            </button>
            <button className="border-2 border-white/30 text-white font-semibold text-sm px-8 py-3.5 rounded-xl hover:bg-white/10 transition-all duration-200 active:scale-95">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* FAB */}
      <button className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-90 transition-all duration-200 z-40 group">
        <svg className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        <span className="absolute right-16 bg-gray-900 dark:bg-gray-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg">
          Create Post
        </span>
      </button>
    </>
  )
}
