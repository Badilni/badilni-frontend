import { useCategories } from '../../hooks/Timeline/useCategories'

const ALL = { _id: '', name: 'All Requests' }

/**
 * BUG FIXED: the old version hardcoded categories with a human `slug`
 * ('languages-and-translation') and sent that slug as the filter value.
 * Every Postman screenshot of a request/response body shows `category` as
 * a 24-char Mongo ObjectId (e.g. 6a353f07d142ee79762ec9bb) — a slug would
 * never match anything server-side. This version sources categories from
 * a real query and filters by `_id`.
 *
 * `useCategories()`'s endpoint is itself an unconfirmed assumption (see
 * hooks/useCategories.js) — until that's verified, this degrades to just
 * the "All Requests" option rather than showing fabricated category names.
 */
export default function RequestFilters({
  activeCategory, // category _id, or '' for "All Requests"
  onCategoryChange,
  activeStatus,
  onStatusChange,
  matchScore = 85,
}) {
  const { data, isLoading } = useCategories()
  const categoriesData = data?.data?.categories ?? []

  const categories = [ALL, ...categoriesData]
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-10">
      <div className="lg:col-span-8 bg-[var(--whiteBackground)] dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2 mb-5">
          <svg
            className="w-4 h-4 text-blue-600 dark:text-blue-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z"
            />
          </svg>
          <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300">
            Categories
          </h3>
        </div>

        <div className="flex flex-wrap gap-2">
          {isLoading
            ? Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="h-9 w-28 rounded-xl bg-gray-100 dark:bg-slate-800 animate-pulse"
                />
              ))
            : categories.map((cat) => (
                <button
                  key={cat._id || 'all'}
                  onClick={() => onCategoryChange(cat._id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                    activeCategory === cat._id
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-50 dark:bg-slate-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
        </div>
      </div>

      <div className="lg:col-span-4 relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-blue-700 dark:to-indigo-800 p-6 rounded-2xl shadow-lg text-white">
        <div className="absolute -right-8 -bottom-8 w-36 h-36 rounded-full bg-white/5 blur-2xl pointer-events-none" />

        <h3 className="text-sm font-bold mb-5 opacity-90">Status</h3>

        <div className="flex flex-col gap-3 mb-6">
          {[
            { value: '', label: 'All Statuses' },
            { value: 'open', label: 'Open' },
            { value: 'matched', label: 'Matched' },
            { value: 'fulfilled', label: 'Fulfilled' },
            { value: 'expired', label: 'Expired' },
          ].map((opt) => (
            <label
              key={opt.value}
              className="flex items-center gap-3 cursor-pointer group"
            >
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
              <span className="text-sm font-semibold">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}
