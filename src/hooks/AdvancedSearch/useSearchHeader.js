import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { fetchUsersService } from '../../services/authentication/AdvancedSearch/search'

export default function useSearchHeader() {
  const [searchParams, setSearchParams] = useSearchParams()

  const queryKeyword = searchParams.get('keyword') || ''
  const queryPage = parseInt(searchParams.get('page')) || 1
  const currentFilter = searchParams.get('type') || 'all'

  const [keywordInput, setKeywordInput] = useState(queryKeyword)

  const [searchResults, setSearchResults] = useState([])
  const [resultsLoading, setResultsLoading] = useState(false)
  const [totalPages, setTotalPages] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  useEffect(() => {
    if (
      !searchParams.has('keyword') &&
      !searchParams.has('page') &&
      !searchParams.has('type')
    ) {
      return
    }

    const fetchResults = async () => {
      setResultsLoading(true)
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

          setSearchResults(usersList)
          setTotalPages(
            resData.pagination?.totalPages || resData.totalPages || 1
          )
          setTotalResults(
            resData.pagination?.totalCount ||
              resData.totalCount ||
              usersList.length ||
              0
          )
        } else {
          setSearchResults([])
          setTotalResults(0)
          setTotalPages(1)
        }
      } catch (error) {
        console.error('Fetch error using service:', error)
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
    setSearchParams({ keyword: keywordInput.trim(), page: 1, type: 'all' })
  }

  const handleFilterAll = () => {
    setSearchParams({ keyword: queryKeyword, page: 1, type: 'all' })
  }

  const handleFilterPeople = () => {
    setSearchParams({ keyword: queryKeyword, page: 1, type: 'people' })
  }

  const handlePageChange = (pageAction) => {
    const nextPage =
      typeof pageAction === 'function' ? pageAction(queryPage) : pageAction
    setSearchParams({
      keyword: queryKeyword,
      page: nextPage,
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
    handleSearchSubmit,
    handlePageChange,
    handleFilterAll,
    handleFilterPeople,
  }
}
