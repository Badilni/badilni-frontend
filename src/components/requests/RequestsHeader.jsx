/**
 * Only '-averageRating' is directly confirmed by Postman (img 4 / img 9).
 * The rest are reasonable guesses based on common REST sort conventions —
 * confirm the backend's actual allow-list before shipping; an unsupported
 * `sort` value will most likely just be silently ignored server-side.
 */
const SORT_OPTIONS = [
  { label: 'Best Match', value: '-averageRating' }, // confirmed
  { label: 'Newest First', value: '-createdAt' }, // unconfirmed
  { label: 'Oldest First', value: 'createdAt' }, // unconfirmed
  { label: 'Highest Reward', value: '-creditsOffered' }, // unconfirmed
  { label: 'Deadline Approaching', value: 'deadline' }, // unconfirmed
]

export default function RequestsHeader({
  sortBy,
  onSortChange,
  totalCount = 0,
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
      <div>
        <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 text-xs font-bold px-3 py-1.5 rounded-full mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          {totalCount} requests found
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-2 leading-tight">
          Skill Requests
        </h1>
        <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 max-w-xl leading-relaxed">
          Find someone who needs your expertise or explore what the community is
          looking to learn today.
        </p>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
          Sort by:
        </span>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="bg-[var(--whiteBackground)] dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/40 cursor-pointer shadow-sm"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
