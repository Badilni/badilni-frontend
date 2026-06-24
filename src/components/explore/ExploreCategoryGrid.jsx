import CategoryCard from '../common/CategoryCard'
import { useCategories } from '../../hooks/useCategories'

function CategorySkeleton() {
  return (
    <div className="flex flex-col items-center p-6 rounded-2xl border border-gray-100 dark:border-slate-800 bg-[var(--whiteBackground)] dark:bg-slate-900 animate-pulse">
      <div className="w-14 h-14 rounded-2xl bg-gray-200 dark:bg-slate-700 mb-3" />
      <div className="h-3 w-20 rounded bg-gray-200 dark:bg-slate-700" />
    </div>
  )
}

export default function ExploreCategoryGrid({ activeCategory, onCategoryChange }) {
  const { categories, loading, error } = useCategories()

  const handleClick = (category) => {
   
    const isCurrentlyActive = activeCategory === category._id
    onCategoryChange(isCurrentlyActive ? null : category)
  }

  return (
    <section className="mb-16">
      {/* Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-1">
            Explore Categories
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Find the right path for your next career move
          </p>
        </div>
        {!loading && categories.length > 0 && (
          <span className="text-sm text-gray-400 dark:text-gray-500">
            {categories.length} categories
          </span>
        )}
      </div>

      {/* Error state */}
      {error && (
        <div className="text-center py-10 text-sm text-red-500 dark:text-red-400">
          Failed to load categories. Please try again later.
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 gap-4">
        {loading
          ? Array.from({ length: 13 }).map((_, i) => <CategorySkeleton key={i} />)
          : categories.map((cat) => (
              <CategoryCard
                key={cat._id}
                category={cat}
                isActive={activeCategory === cat._id}
                onClick={handleClick}
                variant="grid"
              />
            ))}
      </div>
    </section>
  )
}
