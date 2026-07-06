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

        if (filterType === 'people') {
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

          const normalizedResults = activeUsers.map((user) => ({
            kind: 'people',
            data: user,
          }))
          setSearchResults(normalizedResults)
          setTotalPages(
            resData?.pagination?.totalPages || resData?.totalPages || 1
          )
          setTotalResults(
            resData?.pagination?.totalCount ||
              resData?.totalCount ||
              normalizedResults.length ||
              0
          )
          return
        }

        if (filterType === 'offers') {
          const resData = await fetchOffers({
            keyword,
            page: queryPage,
            limit: SEARCH_LIMIT,
          })
          const offersList = extractCollection(resData, [
            'skillListings',
            'data',
          ])
          const normalizedResults = offersList.map((offer) => ({
            kind: 'offers',
            data: offer,
          }))
          setSearchResults(normalizedResults)
          setTotalPages(
            resData?.pagination?.totalPages || resData?.totalPages || 1
          )
          setTotalResults(
            resData?.pagination?.totalCount ||
              resData?.totalCount ||
              normalizedResults.length ||
              0
          )
          return
        }

        if (filterType === 'requests') {
          const resData = await fetchServiceRequests({
            keyword,
            page: queryPage,
            limit: SEARCH_LIMIT,
          })
          const requestsList = extractCollection(resData, [
            'serviceRequests',
            'data',
          ])
          const normalizedResults = requestsList.map((request) => ({
            kind: 'requests',
            data: request,
          }))
          setSearchResults(normalizedResults)
          setTotalPages(
            resData?.pagination?.totalPages || resData?.totalPages || 1
          )
          setTotalResults(
            resData?.pagination?.totalCount ||
              resData?.totalCount ||
              normalizedResults.length ||
              0
          )
          return
        }

        const [usersResponse, offersResponse, requestsResponse] =
          await Promise.allSettled([
            fetchUsersService({
              keyword,
              page: queryPage,
              limit: SEARCH_LIMIT,
              sort: 'averageRating',
            }),
            fetchOffers({ keyword, page: queryPage, limit: SEARCH_LIMIT }),
            fetchServiceRequests({
              keyword,
              page: queryPage,
              limit: SEARCH_LIMIT,
            }),
          ])

        const userItems =
          usersResponse.status === 'fulfilled'
            ? extractCollection(usersResponse.value, ['users', 'data'])
            : []
        const offerItems =
          offersResponse.status === 'fulfilled'
            ? extractCollection(offersResponse.value, ['skillListings', 'data'])
            : []
        const requestItems =
          requestsResponse.status === 'fulfilled'
            ? extractCollection(requestsResponse.value, [
                'serviceRequests',
                'data',
              ])
            : []

        const activeUsers = userItems.filter(
          (user) =>
            user?.isDeactivated !== true && user?.status !== 'deactivated'
        )

        const normalizedResults = [
          ...activeUsers.map((user) => ({ kind: 'people', data: user })),
          ...offerItems.map((offer) => ({ kind: 'offers', data: offer })),
          ...requestItems.map((request) => ({
            kind: 'requests',
            data: request,
          })),
        ]

        setSearchResults(normalizedResults)
        setTotalResults(normalizedResults.length)
        setTotalPages(
          Math.max(1, Math.ceil(normalizedResults.length / SEARCH_LIMIT))
        )
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

  const handleFilterOffers = () => {
    setSearchParams({ q: queryKeyword, page: '1', type: 'offers' })
  }

  const handleFilterRequests = () => {
    setSearchParams({ q: queryKeyword, page: '1', type: 'requests' })
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
    handleFilterOffers,
    handleFilterRequests,
  }
}
