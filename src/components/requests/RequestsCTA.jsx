export default function RequestsCTA({ totalShowing }) {
  return (
    <>
      {/* Load More */}
      <div className="mt-14 flex flex-col items-center gap-3">
        <button className="group flex items-center gap-3 border-2 border-blue-200 dark:border-blue-800 hover:border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 px-10 py-3.5 rounded-2xl text-sm font-bold transition-all duration-200">
          Load More Requests
          <svg className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
        <p className="text-xs text-gray-400 dark:text-gray-500">
          Showing {totalShowing} of 142 open requests
        </p>
      </div>

      {/* CTA Banner */}
      <section className="mt-16">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 to-blue-700 dark:from-indigo-800 dark:to-blue-900 p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 blur-2xl" />
          </div>
          <div className="relative z-10 text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-black text-white mb-2">Have a skill you need?</h3>
            <p className="text-white/70 text-sm md:text-base max-w-md">
              Post your request and connect with experts who can help — all through skill exchange. No money needed.
            </p>
          </div>
          <div className="relative z-10 flex flex-col sm:flex-row gap-3 shrink-0">
            <button className="bg-white text-blue-700 font-bold text-sm px-8 py-3.5 rounded-xl hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl active:scale-95">
              Post a Request
            </button>
            <button className="border-2 border-white/30 text-white font-semibold text-sm px-8 py-3.5 rounded-xl hover:bg-white/10 transition-all active:scale-95">
              Browse Mentors
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
          Post a Request
        </span>
      </button>
    </>
  )
}
