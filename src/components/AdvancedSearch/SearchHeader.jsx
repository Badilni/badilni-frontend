import { useSearchParams } from 'react-router-dom'

export default function SearchHeader({ searchResults = [], totalResults = 0 }) {
  const [searchParams] = useSearchParams()
  const keyword = searchParams.get('keyword') || ''

  return (
    <></>
    // <div className="w-full bg-[var(--whiteBackground)] border-b border-gray-200 dark:bg-[var(--background-light)] dark:border-[#334155] py-6">
    //   <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
    //     {/* <div>
    //       <h1 className="text-xl font-bold text-[var(--black-text)]">
    //         {keyword ? `Results for "${keyword}"` : 'All Speakers'}
    //       </h1>
    //       <p className="text-xs text-[var(--gray-text)] mt-1">
    //         Found {totalResults || searchResults?.length || 0} speakers matching
    //         the criteria.
    //       </p>
    //     </div> */}
    //   </div>
    // </div>
  )
}
