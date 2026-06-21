const CATEGORIES = [
  {
    id: 'design',
    label: 'Design',
    count: '1.2k',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        className="w-8 h-8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
    bg: 'bg-blue-50 dark:bg-blue-950/30',
    iconColor: 'text-blue-600 dark:text-blue-400',
  },
  {
    id: 'development',
    label: 'Development',
    count: '2.5k',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        className="w-8 h-8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
        />
      </svg>
    ),
    bg: 'bg-emerald-50 dark:bg-emerald-950/30',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
  },
  {
    id: 'business',
    label: 'Business',
    count: '800',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        className="w-8 h-8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
    bg: 'bg-purple-50 dark:bg-purple-950/30',
    iconColor: 'text-purple-600 dark:text-purple-400',
  },
  {
    id: 'marketing',
    label: 'Marketing',
    count: '1.5k',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        className="w-8 h-8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
        />
      </svg>
    ),
    bg: 'bg-orange-50 dark:bg-orange-950/30',
    iconColor: 'text-orange-600 dark:text-orange-400',
  },
  {
    id: 'growth',
    label: 'Growth',
    count: '600',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        className="w-8 h-8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
        />
      </svg>
    ),
    bg: 'bg-teal-50 dark:bg-teal-950/30',
    iconColor: 'text-teal-600 dark:text-teal-400',
  },
  {
    id: 'music',
    label: 'Music',
    count: '450',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        className="w-8 h-8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
        />
      </svg>
    ),
    bg: 'bg-pink-50 dark:bg-pink-950/30',
    iconColor: 'text-pink-600 dark:text-pink-400',
  },
]

function CategoryCard({ category, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`group flex flex-col items-center text-center p-6 rounded-2xl border transition-all duration-200 cursor-pointer ${
        isActive
          ? `${category.bg} border-blue-400 dark:border-blue-500 shadow-md`
          : `bg-[var(--whiteBackground)] dark:bg-slate-900 border-gray-100 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-md`
      }`}
    >
      <div
        className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-3 transition-transform duration-200 group-hover:scale-110 ${category.bg} ${category.iconColor}`}
      >
        {category.icon}
      </div>
      <span className="text-sm font-bold text-gray-800 dark:text-gray-100 mb-1">
        {category.label}
      </span>
      <span className="text-xs text-gray-400 dark:text-gray-500">
        {category.count} Mentors
      </span>
    </button>
  )
}

export default function ExploreCategoryGrid({
  activeCategory,
  onCategoryChange,
}) {
  return (
    <section className="mb-16">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-1">
            Explore Categories
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Find the right path for your next career move
          </p>
        </div>
        <button className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
          See all
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {CATEGORIES.map((cat) => (
          <CategoryCard
            key={cat.id}
            category={cat}
            isActive={activeCategory === cat.id}
            onClick={() =>
              onCategoryChange(activeCategory === cat.id ? null : cat.id)
            }
          />
        ))}
      </div>
    </section>
  )
}
