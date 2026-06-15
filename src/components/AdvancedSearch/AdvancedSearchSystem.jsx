import { useSearchParams } from 'react-router-dom'
import AdvancedResultsView from '../AdvancedSearch/searchResultView'
import useAdvancedSearch from '../../hooks/AdvancedSearch/useSearchHeader'
import HeadPasswordReset from '../common/HeadPasswordReset'

export default function AdvancedSearchSystem() {
  const {
    queryPage,
    currentFilter,
    keywordInput,
    setKeywordInput,
    searchResults,
    resultsLoading,
    totalPages,
    totalResults,
    handleSearchSubmit,
    handlePageChange,
    handleFilterAll,
    handleFilterPeople,
  } = useAdvancedSearch()

  const [searchParams] = useSearchParams()
  const hasSearched = searchParams.has('keyword')

  return (
    <div className="bg-[var(--whiteBackground)] dark:bg-[#0f172a] min-h-screen pb-12 transition-colors duration-200">
      <div className="bg-white dark:bg-[#1e293b] border-b border-gray-100 dark:border-[#334155] py-6 mb-6 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 items-center">
          <HeadPasswordReset />

          <form
            onSubmit={handleSearchSubmit}
            className="relative w-full max-w-3xl mx-auto mt-4"
          >
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
              🔍
            </div>
            <input
              type="text"
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
              placeholder="Search by keyword and press Enter..."
              className="w-full pl-12 pr-24 py-3 bg-gray-50 dark:bg-[#1e293b] border border-gray-200 dark:border-[#334155] rounded-xl text-sm font-medium text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:bg-white dark:focus:bg-[#0f172a] focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/30 transition-all text-left"
            />
            <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
              <button
                type="submit"
                className="px-5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>

      {hasSearched ? (
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
      ) : (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300">
            Advanced Search System
          </h3>
          <p className="text-sm text-gray-400 mt-1">
            Type your keyword above and press Enter to discover speakers.
          </p>
        </div>
      )}
    </div>
  )
}
