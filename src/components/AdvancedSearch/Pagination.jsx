export default function Pagination({
  currentPage,
  totalPages,
  setCurrentPage,
}) {
  if (totalPages <= 1) return null

  return (
    <div className="flex justify-center items-center gap-1.5 pt-6" dir="ltr">
      {/* Previous Button */}
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((prev) => prev - 1)}
        className="px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200"
        style={{
          backgroundColor: 'var(--whiteBackground)',
          borderColor: 'var(--border-color)',
          color: currentPage === 1 ? 'var(--Disabled)' : 'var(--black-text)',
          border: '1px solid var(--border-color)',
          opacity: currentPage === 1 ? 0.4 : 1,
          cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
        }}
        onMouseEnter={(e) => {
          if (currentPage !== 1) {
            e.currentTarget.style.backgroundColor =
              'var(--background-secondary)'
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--whiteBackground)'
        }}
      >
        Previous
      </button>

      {/* Page Numbers */}
      {[...Array(totalPages)].map((_, i) => {
        const pageNumber = i + 1
        const isActive = currentPage === pageNumber

        return (
          <button
            key={i}
            onClick={() => setCurrentPage(pageNumber)}
            className="w-8 h-8 text-xs font-semibold rounded-lg transition-all duration-200"
            style={{
              backgroundColor: isActive
                ? 'var(--primary-light)'
                : 'var(--whiteBackground)',
              borderColor: isActive
                ? 'var(--primary-light)'
                : 'var(--border-color)',
              color: isActive ? 'white' : 'var(--black-text)',
              border: `1px solid ${isActive ? 'var(--primary-light)' : 'var(--border-color)'}`,
              boxShadow: isActive ? '0 2px 8px rgba(37, 99, 235, 0.3)' : 'none',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.currentTarget.style.backgroundColor =
                  'var(--background-secondary)'
                e.currentTarget.style.borderColor = 'var(--primary-light)'
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.backgroundColor = 'var(--whiteBackground)'
                e.currentTarget.style.borderColor = 'var(--border-color)'
              }
            }}
          >
            {pageNumber}
          </button>
        )
      })}

      {/* Next Button */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage((prev) => prev + 1)}
        className="px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200"
        style={{
          backgroundColor: 'var(--whiteBackground)',
          borderColor: 'var(--border-color)',
          color:
            currentPage === totalPages
              ? 'var(--Disabled)'
              : 'var(--black-text)',
          border: '1px solid var(--border-color)',
          opacity: currentPage === totalPages ? 0.4 : 1,
          cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
        }}
        onMouseEnter={(e) => {
          if (currentPage !== totalPages) {
            e.currentTarget.style.backgroundColor =
              'var(--background-secondary)'
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--whiteBackground)'
        }}
      >
        Next
      </button>
    </div>
  )
}
