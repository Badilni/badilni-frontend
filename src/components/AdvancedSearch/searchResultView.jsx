import Pagination from './Pagination'
import NoResults from './ResultNotFound'
import SearchResultCard from './SearchResultCards'
import OfferCard from '../offers/OfferCard'
import RequestCard from '../requests/RequestCard'

const filterStyles = {
  all: {
    label: 'All results',
    accent: 'from-indigo-500 to-violet-500',
  },
  people: {
    label: 'People',
    accent: 'from-sky-500 to-cyan-500',
  },
  offers: {
    label: 'Offers',
    accent: 'from-emerald-500 to-lime-500',
  },
  requests: {
    label: 'Requests',
    accent: 'from-amber-500 to-orange-500',
  },
}

export default function AdvancedResultsView({
  searchResults = [],
  resultsLoading,
  currentPage = 1,
  totalPages = 1,
  setCurrentPage,
  totalResults = 0,
  onFilterAll,
  onFilterPeople,
  onFilterOffers,
  onFilterRequests,
  currentFilter = 'all',
  queryKeyword = '',
}) {
  const isAllActive = currentFilter === 'all'
  const isPeopleActive = currentFilter === 'people'
  const isOffersActive = currentFilter === 'offers'
  const isRequestsActive = currentFilter === 'requests'

  const peopleResults = searchResults.filter((item) => item?.kind === 'people')
  const offerResults = searchResults.filter((item) => item?.kind === 'offers')
  const requestResults = searchResults.filter(
    (item) => item?.kind === 'requests'
  )

  const previewItems = (items = [], limit = 3) => items.slice(0, limit)

  const renderGridResults = (items = [], kind) => {
    if (!items?.length) return null

    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {items.map((result, index) => {
          const itemKey = `${kind}-${result.data?._id || result.data?.id || index}`

          if (kind === 'offers') {
            return <OfferCard key={itemKey} offer={result.data} />
          }

          if (kind === 'requests') {
            return <RequestCard key={itemKey} request={result.data} />
          }

          return (
            <div key={itemKey}>
              <SearchResultCard result={result} />
            </div>
          )
        })}
      </div>
    )
  }

  const renderCategorySection = (title, items, kind, onSeeMore) => {
    if (!items?.length) return null
    const preview = previewItems(items, 3)

    return (
      <div className="rounded-[1.75rem] border border-slate-200/80 bg-slate-50/70 p-4 shadow-sm backdrop-blur-sm dark:border-slate-800/70 dark:bg-slate-900/70">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {title}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {items.length} {items.length === 1 ? 'match' : 'matches'}
            </p>
          </div>
          {items.length > 3 && (
            <button
              type="button"
              onClick={onSeeMore}
              className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 transition-all hover:border-indigo-300 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-indigo-500 dark:hover:text-indigo-400"
            >
              See more
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {preview.map((result, index) => (
            <div
              key={`${kind}-${result.data?._id || result.data?.id || index}`}
            >
              <SearchResultCard result={result} />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 p-5 shadow-[0_30px_80px_rgba(15,23,42,0.10)] backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-900/80 sm:p-7">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-300">
              Discover with confidence
            </span>
            <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              {queryKeyword
                ? `Results for “${queryKeyword}”`
                : 'Search people, offers and requests'}
            </h1>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
              Find the right people, skill offers, and open requests in one
              beautiful search experience.
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-slate-200/80 bg-slate-50/70 p-4 text-sm text-slate-600 shadow-inner dark:border-slate-700/70 dark:bg-slate-800/70 dark:text-slate-300">
            <p className="font-semibold">Showing</p>
            <p className="mt-1 text-2xl font-black text-slate-900 dark:text-white">
              {totalResults || searchResults?.length || 0}
            </p>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
              matches
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2 border-t border-slate-200/70 pt-5 dark:border-slate-800/80">
          {[
            { key: 'all', onClick: onFilterAll },
            { key: 'people', onClick: onFilterPeople },
            { key: 'offers', onClick: onFilterOffers },
            { key: 'requests', onClick: onFilterRequests },
          ].map((filter) => {
            const active =
              filter.key === 'all'
                ? isAllActive
                : filter.key === 'people'
                  ? isPeopleActive
                  : filter.key === 'offers'
                    ? isOffersActive
                    : isRequestsActive
            return (
              <button
                key={filter.key}
                onClick={filter.onClick}
                className="rounded-full border px-4 py-2 text-sm font-semibold shadow-sm transition-all duration-200"
                style={{
                  backgroundColor: active ? 'white' : 'var(--whiteBackground)',
                  borderColor: active
                    ? 'var(--primary-light)'
                    : 'var(--border-color)',
                  color: active ? 'var(--primary-light)' : 'var(--black-text)',
                  boxShadow: active
                    ? '0 10px 24px rgba(99, 102, 241, 0.16)'
                    : 'none',
                }}
              >
                {filterStyles[filter.key].label}
                {filter.key === 'all' &&
                  ` (${totalResults || searchResults?.length || 0})`}
              </button>
            )
          })}
        </div>
      </div>

      <section className="mt-7">
        {resultsLoading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {[...Array(4)].map((_, idx) => (
              <div
                key={idx}
                className="h-80 w-full animate-pulse rounded-[1.75rem] border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
              />
            ))}
          </div>
        ) : searchResults?.length > 0 ? (
          <div className="flex flex-col gap-8">
            {isAllActive ? (
              <div className="flex flex-col gap-6">
                {renderCategorySection(
                  'People',
                  peopleResults,
                  'people',
                  onFilterPeople
                )}
                {renderCategorySection(
                  'Offers',
                  offerResults,
                  'offers',
                  onFilterOffers
                )}
                {renderCategorySection(
                  'Requests',
                  requestResults,
                  'requests',
                  onFilterRequests
                )}
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                <div className="rounded-[1.75rem] border border-slate-200/80 bg-slate-50/70 p-4 shadow-sm backdrop-blur-sm dark:border-slate-800/70 dark:bg-slate-900/70">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div>
                      <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                        {filterStyles[currentFilter]?.label || 'Results'}
                      </h2>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {searchResults.length}{' '}
                        {searchResults.length === 1 ? 'match' : 'matches'}
                      </p>
                    </div>
                  </div>

                  {renderGridResults(searchResults, currentFilter)}
                </div>

                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                  />
                )}
              </div>
            )}
          </div>
        ) : (
          <NoResults queryKeyword={queryKeyword} activeFilter={currentFilter} />
        )}
      </section>
    </div>
  )
}
