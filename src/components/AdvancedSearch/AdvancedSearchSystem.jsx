import { useSearchParams } from 'react-router-dom'
import AdvancedResultsView from '../AdvancedSearch/searchResultView'
import useAdvancedSearch from '../../hooks/AdvancedSearch/useSearchHeader'

export default function AdvancedSearchSystem({ compact = false }) {
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
    <div style={{ width: '100%', fontFamily: 'Poppins, sans-serif' }}>
      <form
        onSubmit={handleSearchSubmit}
        style={{ position: 'relative', width: '100%' }}
      >
        {/* Search icon */}
        <span style={{
          position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)',
          pointerEvents: 'none', display: 'flex', alignItems: 'center',
        }}>
          <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="var(--gray-text)" strokeWidth={2}>
            <circle cx="11" cy="11" r="8" />
            <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
          </svg>
        </span>

        <input
          type="text"
          value={keywordInput}
          onChange={(e) => setKeywordInput(e.target.value)}
          placeholder="Search skills, people…"
          style={{
            width: '100%',
            padding: compact ? '7px 36px 7px 32px' : '10px 36px 10px 32px',
            backgroundColor: 'var(--background-light)',
            border: '1px solid var(--border-color, #e2e8f0)',
            borderRadius: '10px',
            fontSize: '13px',
            color: 'var(--black-text)',
            outline: 'none',
            transition: 'border-color 0.15s, background 0.15s',
            fontFamily: 'Poppins, sans-serif',
            boxSizing: 'border-box',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = 'var(--primary-light)'
            e.target.style.backgroundColor = 'var(--whiteBackground)'
            e.target.style.boxShadow = '0 0 0 3px color-mix(in srgb, var(--primary-light) 12%, transparent)'
          }}
          onBlur={(e) => {
            e.target.style.borderColor = 'var(--border-color, #e2e8f0)'
            e.target.style.backgroundColor = 'var(--background-light)'
            e.target.style.boxShadow = 'none'
          }}
        />

        {/* Submit arrow — visible only when there's input */}
        {keywordInput && (
          <button
            type="submit"
            aria-label="Submit search"
            style={{
              position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)',
              background: 'none', border: 'none', cursor: 'pointer', padding: '4px',
              display: 'flex', alignItems: 'center', color: 'var(--primary-light)',
            }}
          >
            <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        )}
      </form>

      {!compact && hasSearched && (
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
  )
}
