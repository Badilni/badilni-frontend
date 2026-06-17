const CATEGORIES = [
  'All Requests',
  'UI/UX Design',
  'Backend Dev',
  'Digital Marketing',
  'Data Science',
  'Public Speaking',
  'Photography',
  'Mobile Dev',
  'Languages',
]


export default function RequestFilters({
  activeCategory,
  onCategoryChange,
  activeStatus,
  onStatusChange,
  matchScore,
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-10">

      {/* ── Category chips ──────────────────────────────── */}
      <div className="lg:col-span-8 bg-[var(--whiteBackground)] dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2 mb-5">
          <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
          </svg>
          <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300">Categories</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-50 dark:bg-slate-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── Availability + Match Score ─────────────────── */}
      <div className="lg:col-span-4 relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-blue-700 dark:to-indigo-800 p-6 rounded-2xl shadow-lg text-white">
        <div className="absolute -right-8 -bottom-8 w-36 h-36 rounded-full bg-white/5 blur-2xl pointer-events-none" />

        <h3 className="text-sm font-bold mb-5 opacity-90">Availability</h3>

        <div className="flex flex-col gap-3 mb-6">
          {[
            { value: 'open', label: 'Open', count: 142 },
            { value: 'filled', label: 'Filled', count: 89 },
          ].map((opt) => (
            <label key={opt.value} className="flex items-center gap-3 cursor-pointer group">
              <div
                onClick={() => onStatusChange(opt.value)}
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                  activeStatus === opt.value
                    ? 'border-white bg-white'
                    : 'border-white/50 group-hover:border-white'
                }`}
              >
                {activeStatus === opt.value && (
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                )}
              </div>
              <span className="text-sm font-semibold">
                {opt.label} <span className="opacity-70 font-normal">({opt.count})</span>
              </span>
            </label>
          ))}
        </div>

        <div className="pt-5 border-t border-white/20">
          <p className="text-xs font-bold uppercase tracking-widest opacity-60 mb-3">Your Match Potential</p>
          <div className="flex items-center gap-4">
            <span className="text-3xl font-black">{matchScore}%</span>
            <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-1000"
                style={{ width: `${matchScore}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
