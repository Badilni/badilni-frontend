import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { fetchUsersService } from '../../services/AdvancedSearch/search'
import { fetchOffers } from '../../services/Posts/fetchOffers'
import { fetchServiceRequests } from '../../services/Posts/serviceRequestsServices'

const SEARCH_LIMIT = 9

export const extractCollection = (payload, keys = []) => {
  if (Array.isArray(payload)) return payload
  if (!payload || typeof payload !== 'object') return []

  const fallbackKeys = [
    'users',
    'skillListings',
    'serviceRequests',
    'results',
    'items',
  ]

  if (Array.isArray(payload.data)) return payload.data
  if (Array.isArray(payload.results)) return payload.results
  if (Array.isArray(payload.items)) return payload.items

  for (const key of fallbackKeys) {
    if (Array.isArray(payload[key])) return payload[key]
  }

  const nestedValue = keys.reduce((acc, key) => {
    if (acc && typeof acc === 'object' && key in acc) return acc[key]
    return undefined
  }, payload)

  if (Array.isArray(nestedValue)) return nestedValue
  if (nestedValue && typeof nestedValue === 'object') {
    const nestedCollection = extractCollection(nestedValue, keys)
    if (Array.isArray(nestedCollection)) return nestedCollection
  }

  if (payload.data && typeof payload.data === 'object') {
    const fromData = extractCollection(payload.data, keys)
    if (Array.isArray(fromData)) return fromData
  }

  return []
}

export default function useSearchHeader() {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  const queryKeyword =
    searchParams.get('q') || searchParams.get('keyword') || ''
  const queryPage = parseInt(searchParams.get('page')) || 1
  const currentFilter = searchParams.get('type') || 'all'
  // 'smart' | 'normal' — persisted in the URL so results page shows the right mode
  const searchMode = searchParams.get('mode') === 'smart' ? 'smart' : 'normal'
  const isSmartSearch = searchMode === 'smart'

  const [keywordInput, setKeywordInput] = useState(queryKeyword)
  const [searchResults, setSearchResults] = useState([])
  const [resultsLoading, setResultsLoading] = useState(false)
  const [totalPages, setTotalPages] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const [searchError, setSearchError] = useState(null)

  useEffect(() => {
    setKeywordInput(queryKeyword)
  }, [queryKeyword])

  useEffect(() => {
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
        const keyword = queryKeyword.trim() || undefined
        const filterType = currentFilter || 'all'

        // Build the right param object based on mode
        const textParam = isSmartSearch ? { smartSearch: keyword } : { keyword }

        if (filterType === 'people') {
          // People search doesn't have a smartSearch variant yet — fall back to keyword
          const resData = await fetchUsersService({
            keyword,
            page: queryPage,
            limit: SEARCH_LIMIT,
            sort: 'averageRating',
          })
          const usersList = extractCollection(resData, ['users', 'data'])
          const activeUsers = usersList.filter(
            (user) =>
              user?.isDeactivated !== true && user?.status !== 'deactivated'
          )
          setSearchResults(
            activeUsers.map((user) => ({ kind: 'people', data: user }))
          )
          setTotalPages(
            resData?.pagination?.totalPages || resData?.totalPages || 1
          )
          setTotalResults(
            resData?.pagination?.totalCount ||
              resData?.totalCount ||
              activeUsers.length
          )
          return
        }

        if (filterType === 'offers') {
          const resData = await fetchOffers({
            ...textParam,
            page: queryPage,
            limit: SEARCH_LIMIT,
          })
          const offersList = extractCollection(resData, [
            'skillListings',
            'data',
          ])
          setSearchResults(
            offersList.map((offer) => ({ kind: 'offers', data: offer }))
          )
          setTotalPages(
            resData?.pagination?.totalPages || resData?.totalPages || 1
          )
          setTotalResults(
            resData?.pagination?.totalCount ||
              resData?.totalCount ||
              offersList.length
          )
          return
        }

        if (filterType === 'requests') {
          const resData = await fetchServiceRequests({
            ...textParam,
            page: queryPage,
            limit: SEARCH_LIMIT,
          })
          const requestsList = extractCollection(resData, [
            'serviceRequests',
            'data',
          ])
          setSearchResults(
            requestsList.map((request) => ({ kind: 'requests', data: request }))
          )
          setTotalPages(
            resData?.pagination?.totalPages || resData?.totalPages || 1
          )
          setTotalResults(
            resData?.pagination?.totalCount ||
              resData?.totalCount ||
              requestsList.length
          )
          return
        }

        // All — fetch all three in parallel
        const [usersRes, offersRes, requestsRes] = await Promise.allSettled([
          fetchUsersService({
            keyword,
            page: queryPage,
            limit: SEARCH_LIMIT,
            sort: 'averageRating',
          }),
          fetchOffers({ ...textParam, page: queryPage, limit: SEARCH_LIMIT }),
          fetchServiceRequests({
            ...textParam,
            page: queryPage,
            limit: SEARCH_LIMIT,
          }),
        ])

        const userItems =
          usersRes.status === 'fulfilled'
            ? extractCollection(usersRes.value, ['users', 'data'])
            : []
        const offerItems =
          offersRes.status === 'fulfilled'
            ? extractCollection(offersRes.value, ['skillListings', 'data'])
            : []
        const requestItems =
          requestsRes.status === 'fulfilled'
            ? extractCollection(requestsRes.value, ['serviceRequests', 'data'])
            : []

        const activeUsers = userItems.filter(
          (u) => u?.isDeactivated !== true && u?.status !== 'deactivated'
        )

        const normalized = [
          ...activeUsers.map((user) => ({ kind: 'people', data: user })),
          ...offerItems.map((offer) => ({ kind: 'offers', data: offer })),
          ...requestItems.map((request) => ({
            kind: 'requests',
            data: request,
          })),
        ]

        setSearchResults(normalized)
        setTotalResults(normalized.length)
        setTotalPages(Math.max(1, Math.ceil(normalized.length / SEARCH_LIMIT)))
      } catch (error) {
        setSearchError('Failed to fetch results. Please check your connection.')
        setSearchResults([])
        setTotalResults(0)
        setTotalPages(1)
      } finally {
        setResultsLoading(false)
      }
    }

    fetchResults()
  }, [searchParams, queryKeyword, queryPage, currentFilter, isSmartSearch])

  /**
   * mode: 'smart' | 'normal'
   * Called from AdvancedSearchSystem with the current toggle state.
   */
  const handleSearchSubmit = (e, mode = 'normal') => {
    e.preventDefault()
    const trimmed = keywordInput.trim()
    if (trimmed) {
      navigate(
        `/search?q=${encodeURIComponent(trimmed)}&page=1&type=all&mode=${mode}`
      )
    } else {
      navigate('/search')
    }
  }

  const handleFilterAll = () =>
    setSearchParams({
      q: queryKeyword,
      page: '1',
      type: 'all',
      mode: searchMode,
    })
  const handleFilterPeople = () =>
    setSearchParams({
      q: queryKeyword,
      page: '1',
      type: 'people',
      mode: searchMode,
    })
  const handleFilterOffers = () =>
    setSearchParams({
      q: queryKeyword,
      page: '1',
      type: 'offers',
      mode: searchMode,
    })
  const handleFilterRequests = () =>
    setSearchParams({
      q: queryKeyword,
      page: '1',
      type: 'requests',
      mode: searchMode,
    })

  const handlePageChange = (pageAction) => {
    const nextPage =
      typeof pageAction === 'function' ? pageAction(queryPage) : pageAction
    setSearchParams({
      q: queryKeyword,
      page: String(nextPage),
      type: currentFilter,
      mode: searchMode,
    })
  }

  return {
    queryKeyword,
    queryPage,
    currentFilter,
    searchMode,
    isSmartSearch,
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
    handleFilterOffers,
    handleFilterRequests,
  }
}
