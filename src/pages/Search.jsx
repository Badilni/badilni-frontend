import { useEffect } from 'react'
import useAdvancedSearch from '../hooks/AdvancedSearch/useSearchHeader'
import SearchHeader from '../components/AdvancedSearch/SearchHeader'
import AdvancedResultsView from '../components/AdvancedSearch/searchResultView'
import AdvancedSearchSystem from '../components/AdvancedSearch/AdvancedSearchSystem'

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
  } = useAdvancedSearch()

  // Scroll smoothly to top when current page indices change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [queryPage, queryKeyword])

  return (
    <div className="w-full min-h-screen flex flex-col" style={{ backgroundColor: 'var(--background-light, #f8fafc)' }}>
      {/* Dynamic Header Section */}
      <SearchHeader searchResults={searchResults} totalResults={totalResults} />

      <div className="max-w-4xl w-full mx-auto px-4 pt-6">
        {/* Persistent top query management search field */}
        <AdvancedSearchSystem compact={false} />
      </div>

      {/* Main Results Board Context */}
      <div className="flex-grow">
        {searchError ? (
          <div className="max-w-4xl mx-auto px-4 py-12 text-center">
            <div className="inline-flex p-4 bg-red-50 dark:bg-red-950/30 rounded-full text-red-500 mb-4">
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-1">Search Request Failed</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{searchError}</p>
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
            currentFilter={currentFilter}
          />
        )}
      </div>
    </div>
  )
}