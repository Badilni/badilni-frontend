import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { fetchUsersService } from '../../services/AdvancedSearch/search'

export default function useSearchHeader() {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  // Track state against standard 'q' key query parameter
  const queryKeyword = searchParams.get('q') || ''
  const queryPage = parseInt(searchParams.get('page')) || 1
  const currentFilter = searchParams.get('type') || 'all'

  const [keywordInput, setKeywordInput] = useState(queryKeyword)
  const [searchResults, setSearchResults] = useState([])
  const [resultsLoading, setResultsLoading] = useState(false)
  const [totalPages, setTotalPages] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const [searchError, setSearchError] = useState(null)

  // Synchronize input bar state when user uses browser back/forward buttons
  useEffect(() => {
    setKeywordInput(queryKeyword)
  }, [queryKeyword])

  useEffect(() => {
    // If no active search query exists in the URL parameters, clear out elements safely
    if (!searchParams.has('q')) {
      setSearchResults([])
      setTotalResults(0)
      setTotalPages(1)
      return
    }

    const fetchResults = async () => {
      setResultsLoading(true)
      setSearchError(null)
      try {
        const resData = await fetchUsersService({
          keyword: queryKeyword.trim() || undefined,
          page: queryPage,
          limit: 10,
          sort: 'averageRating',
        })

        if (resData) {
          const usersList =
            resData.data?.users ||
            resData.users ||
            resData.data ||
            (Array.isArray(resData) ? resData : [])


          const activeUsers = usersList.filter(
            (user) => user.isDeactivated !== true && user.status !== 'deactivated'
          )

          setSearchResults(activeUsers)
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
          setSearchResults([])
          setTotalResults(0)
          setTotalPages(1)
        }
      } catch (error) {
        console.error('Fetch error using service:', error)
        setSearchError(
          'Failed to fetch data. Please check your internet connection.'
        )
        setSearchResults([])
        setTotalResults(0)
        setTotalPages(1)
      } finally {
        setResultsLoading(false)
      }
    }

    fetchResults()
  }, [searchParams, queryKeyword, queryPage, currentFilter])

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    const trimmed = keywordInput.trim()
    if (trimmed) {
      // Force navigation onto our dedicated search dashboard view with clean state params
      navigate(`/search?q=${encodeURIComponent(trimmed)}&page=1&type=all`)
    } else {
      navigate('/search')
    }
  }

  const handleFilterAll = () => {
    setSearchParams({ q: queryKeyword, page: '1', type: 'all' })
  }

  const handleFilterPeople = () => {
    setSearchParams({ q: queryKeyword, page: '1', type: 'people' })
  }

  const handlePageChange = (pageAction) => {
    const nextPage =
      typeof pageAction === 'function' ? pageAction(queryPage) : pageAction
    setSearchParams({
      q: queryKeyword,
      page: String(nextPage),
      type: currentFilter,
    })
  }

  return {
    queryKeyword,
    queryPage,
    currentFilter,
    keywordInput,
    setKeywordInput,
    searchResults,
    resultsLoading,
    totalPages,
    totalResults,
    searchError,
    handleSearchSubmit,
    handlePageChange,
    handleFilterAll,
    handleFilterPeople,
  }
}
