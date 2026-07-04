import { useCategories } from '../../hooks/useCategories';
import CategoryCard from '../common/CategoryCard';

const ALL = { _id: '', name: 'All Requests', slug: 'all' };

export default function RequestFilters({
  activeCategory,
  onCategoryChange,
  activeStatus,
  onStatusChange,
  matchScore = 85,
}) {
  const { categories = [], loading, error: categoriesError } = useCategories();

  const combinedCategories = [ALL, ...categories];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-10">
      {/* Categories Wrapper Section */}
      <div className="lg:col-span-8 bg-[var(--whiteBackground)] dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm overflow-hidden">
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

        {/* Horizontal Scroll Container */}
        <div className="flex overflow-x-auto gap-3 pb-2 w-full snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-40 h-[140px] rounded-2xl bg-gray-100 dark:bg-slate-800 animate-pulse snap-start"
                />
              ))
            : combinedCategories.map((cat) => (
                <div key={cat._id} className="flex-shrink-0 w-40 h-[140px] snap-start">
                  <CategoryCard
                    category={cat}
                    isActive={activeCategory === cat._id}
                    onClick={() => onCategoryChange(cat._id)}
                    variant="compact"
                  />
                </div>
              ))}
        </div>
      </div>

      {/* Status Filtering Section */}
      <div className="lg:col-span-4 relative overflow-hidden bg-gradient-to-br from-blue-900 to-indigo-300 dark:from-blue-700 dark:to-black p-6 rounded-2xl shadow-lg text-white">
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
              className="flex items-center gap-3 cursor-pointer group select-none font-medium"
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
              <span className="text-xl italic font-serif ">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}