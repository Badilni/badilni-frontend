import { useEffect } from 'react'
import useAdvancedSearch from '../hooks/AdvancedSearch/useSearchHeader'
import AdvancedResultsView from '../components/AdvancedSearch/searchResultView'

export default function SearchPage() {
  const {
    queryKeyword,
    queryPage,
    currentFilter,
    searchResults,
    resultsLoading,
    totalPages,
    totalResults,
    searchError,
    handlePageChange,
    handleFilterAll,
    handleFilterPeople,
    handleFilterOffers,
    handleFilterRequests,
  } = useAdvancedSearch()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [queryPage, queryKeyword])

  return (
    <div className="min-h-screen w-full bg-[var(--color-bg)]">
      <div className="flex-grow">
        {searchError ? (
          <div className="mx-auto max-w-4xl px-4 py-16 text-center">
            <div className="mb-4 inline-flex rounded-full bg-red-50 p-4 text-red-500 dark:bg-red-950/30">
              <svg
                width="32"
                height="32"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h3 className="mb-1 text-lg font-bold text-gray-800 dark:text-gray-200">
              Search request failed
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {searchError}
            </p>
          </div>
        ) : (
          <AdvancedResultsView
            searchResults={searchResults}
            resultsLoading={resultsLoading}
            currentPage={queryPage}
            totalPages={totalPages}
            setCurrentPage={handlePageChange}
            totalResults={totalResults}
            onFilterAll={handleFilterAll}
            onFilterPeople={handleFilterPeople}
            onFilterOffers={handleFilterOffers}
            onFilterRequests={handleFilterRequests}
            currentFilter={currentFilter}
            queryKeyword={queryKeyword}
          />
        )}
      </div>
    </div>
  )
}
