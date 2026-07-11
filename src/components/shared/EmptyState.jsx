export default function EmptyState({
  onPostRequest,
  onClearFilters,
  hasActiveFilters = false,
  title,
  description,
  actionLabel = 'Post a Request',
}) {
  const resolvedTitle =
    title ??
    (hasActiveFilters ? 'No requests match these filters' : 'No requests yet')
  const resolvedDescription =
    description ??
    (hasActiveFilters
      ? 'Try a different category, status, or sort order.'
      : 'Post the first request and start matching with people who can help.')

  return (
    <div className="flex flex-col items-center text-center py-20 px-6">
      <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950/30 flex items-center justify-center mb-5">
        <svg
          className="w-7 h-7 text-blue-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.8}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
        {resolvedTitle}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mb-6">
        {resolvedDescription}
      </p>
      <div className="flex gap-3">
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="px-5 py-2.5 rounded-xl text-sm font-bold border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800"
          >
            Clear filters
          </button>
        )}
        <button
          onClick={onPostRequest || (() => navigate('/'))}
          className="px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:brightness-110"
        >
          {actionLabel || 'Go to Home Page'}
        </button>
      </div>
    </div>
  )
}
