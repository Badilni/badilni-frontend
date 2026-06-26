import { useEffect, useState } from 'react'

/**
 * Only '-averageRating' is directly confirmed by Postman (img 9). The
 * other sort values are reasonable guesses — confirm the backend's actual
 * allow-list before shipping.
 */
const SORT_OPTIONS = [
  { label: 'Best Match', value: '-averageRating' },
  { label: 'Newest First', value: '-createdAt' },
  { label: 'Oldest First', value: 'createdAt' },
  { label: 'Lowest Rate', value: 'hourlyRate' },
  { label: 'Highest Rate', value: '-hourlyRate' },
]

export default function OfferFilters({
  categories = [],
  filters,
  onChange,
  onReset,
}) {
  const [keyword, setKeyword] = useState(filters.keyword || '')

  // Debounce the free-text search before it hits the URL / query.
  useEffect(() => {
    const handle = setTimeout(() => {
      if (keyword !== (filters.keyword || ''))
        onChange({ keyword: keyword || undefined })
    }, 400)
    return () => clearTimeout(handle)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword])

  return (
    <div className="bg-[var(--whiteBackground)] dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm mb-10 space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search offers…"
          className="bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-white"
        />

        <select
          value={filters.category || ''}
          onChange={(e) => onChange({ category: e.target.value || undefined })}
          className="bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-300"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        <select
          value={filters.isActive ?? ''}
          onChange={(e) => onChange({ isActive: e.target.value || undefined })}
          className="bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-300"
        >
          <option value="">All Statuses</option>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <input
          type="number"
          min={0}
          placeholder="Min rate"
          value={filters.hourlyRateGreaterThan || ''}
          onChange={(e) =>
            onChange({ hourlyRateGreaterThan: e.target.value || undefined })
          }
          className="bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm text-gray-900 dark:text-white"
        />
        <input
          type="number"
          min={0}
          placeholder="Max rate"
          value={filters.hourlyRateLessThan || ''}
          onChange={(e) =>
            onChange({ hourlyRateLessThan: e.target.value || undefined })
          }
          className="bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm text-gray-900 dark:text-white"
        />
        <input
          type="number"
          min={0}
          max={5}
          step={0.5}
          placeholder="Min rating"
          value={filters.averageRatingGreaterThan || ''}
          onChange={(e) =>
            onChange({ averageRatingGreaterThan: e.target.value || undefined })
          }
          className="bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm text-gray-900 dark:text-white"
        />
        <input
          type="date"
          value={filters.createdAtGreaterThan || ''}
          onChange={(e) =>
            onChange({ createdAtGreaterThan: e.target.value || undefined })
          }
          className="bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm text-gray-900 dark:text-white"
        />
        <input
          type="date"
          value={filters.createdAtLessThan || ''}
          onChange={(e) =>
            onChange({ createdAtLessThan: e.target.value || undefined })
          }
          className="bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm text-gray-900 dark:text-white"
        />
      </div>

      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
            Sort by:
          </span>
          <select
            value={filters.sort}
            onChange={(e) => onChange({ sort: e.target.value })}
            className="bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={() => {
            setKeyword('')
            onReset()
          }}
          className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline"
        >
          Reset filters
        </button>
      </div>
    </div>
  )
}
