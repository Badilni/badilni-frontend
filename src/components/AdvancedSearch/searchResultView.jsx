import UserCard from '../../components/AdvancedSearch/peopleCard'
import Pagination from '../../components/AdvancedSearch/Pagination'
import NoResults from './ResultNotFound'

export default function AdvancedResultsView({
  searchResults = [],
  resultsLoading,
  currentPage = 1,
  totalPages = 1,
  setCurrentPage,
  totalResults = 0,
  onFilterAll,
  onFilterPeople,
  currentFilter = 'all',
}) {
  const isAllActive = currentFilter === 'all'
  const isPeopleActive = currentFilter === 'people'

  return (
    <div
      className="w-full px-4 py-4 text-left transition-colors duration-300 min-h-screen"
      style={{
        backgroundColor: 'var(--background-light)',
        color: 'var(--black-text)',
      }}
    >
      <div className="max-w-4xl mx-auto">
        <div
          className="flex flex-wrap items-center gap-2 pb-4 mb-4 overflow-x-auto whitespace-nowrap scrollbar-none"
          style={{
            borderBottom: '1px solid var(--border-color)',
          }}
        >
          <button
            onClick={onFilterAll}
            className="px-4 py-2 border rounded-full text-xs font-bold shadow-sm transition-all duration-200 cursor-pointer text-[var(--black-text)] dark:text-white"
            style={{
              backgroundColor: isAllActive
                ? 'var(--primary-light)'
                : 'var(--whiteBackground)',
              borderColor: isAllActive
                ? 'var(--primary-light)'
                : 'var(--border-color)',
              color: isAllActive ? 'white' : 'var(--black-text)',
            }}
          >
            All results ({totalResults || searchResults?.length || 0})
          </button>

          <button
            onClick={onFilterPeople}
            className="px-5 py-2 border rounded-full text-xs font-bold shadow-sm transition-all duration-200 flex items-center gap-1 cursor-pointer text-[var(--black-text)] dark:text-white"
            style={{
              backgroundColor: isPeopleActive
                ? 'var(--primary-light)'
                : 'var(--whiteBackground)',
              borderColor: isPeopleActive
                ? 'var(--primary-light)'
                : 'var(--border-color)',
              color: isPeopleActive ? 'white' : 'var(--black-text)',
            }}
          >
            People
          </button>

          {/* زر Skills */}
          <button
            onClick={() => {
              /* تفاعلات المستقبل */
            }}
            className="px-5 py-2 border rounded-full text-xs font-bold shadow-sm transition-all flex items-center gap-1 cursor-pointer hover:opacity-80"
            style={{
              backgroundColor: 'var(--whiteBackground)',
              borderColor: 'var(--border-color)',
              color: 'var(--black-text)',
            }}
          >
            Skills
          </button>
        </div>

        <section className="space-y-6">
          {resultsLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, idx) => (
                <div
                  key={idx}
                  className="rounded-3xl h-80 w-full animate-pulse shadow-sm"
                  style={{
                    backgroundColor: 'var(--whiteBackground)',
                    borderColor: 'var(--border-color)',
                    border: '1px solid var(--border-color)',
                  }}
                ></div>
              ))}
            </div>
          ) : searchResults?.length > 0 ? (
            <div className="flex flex-col gap-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {searchResults.map((user) => (
                  <UserCard key={user._id || user.id} user={user} />
                ))}
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
              />
            </div>
          ) : (
            <NoResults />
          )}
        </section>
      </div>
    </div>
  )
}
