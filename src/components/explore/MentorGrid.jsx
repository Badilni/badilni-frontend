import { useState, useEffect } from 'react'
import MentorCard from './MentorCard'
import { fetchUsersService } from '../../services/AdvancedSearch/search'

const FILTERS = [
  'All Members',
  'Top Rated',
  'Newest',
]

function CardSkeleton() {
  return (
    <div className="flex flex-col h-[400px] bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl overflow-hidden animate-pulse shadow-sm">
      <div className="h-52 w-full bg-gray-200 dark:bg-slate-800" />
      <div className="p-6 flex-1 space-y-4">
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-slate-800 rounded-md w-3/4" />
          <div className="h-3 bg-gray-200 dark:bg-slate-800 rounded-md w-1/2" />
        </div>
        <div className="flex gap-2">
          <div className="h-6 bg-gray-200 dark:bg-slate-800 rounded-lg w-12" />
          <div className="h-6 bg-gray-200 dark:bg-slate-800 rounded-lg w-16" />
        </div>
        <div className="h-3 bg-gray-200 dark:bg-slate-800 rounded-md w-full" />
      </div>
    </div>
  )
}

export default function MentorGrid({ searchQuery = '', activeCategory = null }) {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [activeFilter, setActiveFilter] = useState('All Members')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  // Reset pagination state when filters change
  useEffect(() => {
    setPage(1)
  }, [searchQuery, activeFilter, activeCategory])

  useEffect(() => {
    const fetchRealData = async () => {
      try {
        setLoading(true)
        setError(false)

        let sort = 'averageRating'
        if (activeFilter === 'Top Rated') {
          sort = '-averageRating'
        } else if (activeFilter === 'Newest') {
          sort = '-createdAt'
        }

        let finalKeyword = searchQuery || undefined
        if (activeCategory && activeCategory.name) {
          finalKeyword = activeCategory.name
        }

        const resData = await fetchUsersService({
          keyword: finalKeyword,
          page,
          limit: 12,
          sort,
        })

        if (resData) {
          const usersList =
            resData.data?.users ||
            resData.users ||
            resData.data ||
            (Array.isArray(resData) ? resData : [])

          const activeUsers = usersList.filter(
            (user) =>
              user.isDeactivated !== true && user.status !== 'deactivated'
          )

          if (page === 1) {
            setUsers(activeUsers)
          } else {
            setUsers((prev) => [...prev, ...activeUsers])
          }

          setTotalPages(
            resData.pagination?.totalPages || resData.totalPages || 1
          )
          setTotalResults(
            resData.pagination?.totalCount ||
              resData.totalCount ||
              activeUsers.length ||
              0
          )
        } else {
          if (page === 1) {
            setUsers([])
          }
          setTotalPages(1)
          setTotalResults(0)
        }
      } catch (err) {
        console.error('Error fetching Explore users:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchRealData()
  }, [searchQuery, activeFilter, activeCategory, page])

  const handleLoadMore = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1)
    }
  }

  return (
    <section className="py-8">
      {/* Header + filter pills */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-black text-slate-800 dark:text-white mb-1">
            Community Members
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
            Showing{' '}
            <span className="font-semibold text-blue-600 dark:text-blue-400">
              {users.length}
            </span>{' '}
            of {totalResults} active profiles
          </p>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                activeFilter === filter
                  ? 'bg-blue-600 dark:bg-blue-500 text-white shadow-md'
                  : 'bg-[var(--whiteBackground)] dark:bg-slate-900 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-600'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Loading Skeletons */}
      {loading && page === 1 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, idx) => (
            <CardSkeleton key={idx} />
          ))}
        </div>
      ) : error ? (
        <div className="w-full flex flex-col items-center justify-center py-12 bg-white dark:bg-slate-900 border border-dashed border-gray-200 dark:border-slate-800 rounded-2xl p-6 text-center">
          <p className="text-sm font-medium text-red-500 dark:text-red-400">
            Failed to load members. Please check your connection or try again later.
          </p>
        </div>
      ) : users.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300 mb-2">
            No members found
          </h3>
          <p className="text-sm text-gray-450 dark:text-gray-500 mb-6">
            Try adjusting your category selection or filter choice
          </p>
          <button
            onClick={() => {
              setActiveFilter('All Members')
            }}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-500 transition-colors"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {users.map((user, idx) => (
              <MentorCard key={user._id || user.id} mentor={user} index={idx} />
            ))}
          </div>

          {/* Load more button */}
          {page < totalPages && (
            <div className="mt-16 flex flex-col items-center gap-3">
              <button
                onClick={handleLoadMore}
                disabled={loading}
                className="group flex items-center gap-3 bg-[var(--whiteBackground)] dark:bg-slate-900 border border-gray-200 dark:border-slate-800 hover:border-blue-450 dark:hover:border-blue-500 text-gray-700 dark:text-gray-300 px-10 py-4 rounded-2xl text-sm font-bold transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer disabled:opacity-50"
              >
                <span>{loading ? 'Loading...' : 'Load More Members'}</span>
                {!loading && (
                  <svg
                    className="w-4 h-4 text-blue-500 group-hover:rotate-180 transition-transform duration-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                )}
              </button>
              <p className="text-xs text-gray-400 dark:text-gray-500">
                Showing {users.length} of {totalResults} members
              </p>
            </div>
          )}
        </>
      )}
    </section>
  )
}
