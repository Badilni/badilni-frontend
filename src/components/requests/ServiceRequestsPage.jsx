import { useMemo, useState } from 'react'
import { useServiceRequests } from '../../hooks/Timeline/useServiceRequests'
import { useCategories } from '../../hooks/Timeline/useCategories'
import { useProposeSession } from '../../hooks/Timeline/useProposeSession'
import RequestsHeader from './RequestsHeader'
import RequestFilters from './RequestFilters'
import RequestCard from './RequestCard'
import RequestsCTA from './RequestsCTA'
import CreateServiceRequestModal from './CreateServiceRequestModel'
import RequestCardSkeleton from '../shared/RequestCardSkeleton'
import EmptyState from '../shared/EmptyState'
import ErrorState from '../shared/ErrorState'

const PAGE_SIZE = 10

export default function ServiceRequestsPage() {
  const [category, setCategory] = useState('')
  const [status, setStatus] = useState('')
  const [sort, setSort] = useState('-averageRating')
  const [page, setPage] = useState(1)
  const [createOpen, setCreateOpen] = useState(false)

  const filters = useMemo(
    () => ({ category, status, sort, page, limit: PAGE_SIZE }),
    [category, status, sort, page]
  )

  const { data, isLoading, isFetching, isError, error, refetch } =
    useServiceRequests(filters)
  const { data: categoriesData } = useCategories()
  const categories = categoriesData?.data?.categories ?? []
  const proposeSession = useProposeSession()
  const [proposingId, setProposingId] = useState(null)
  const [proposedIds, setProposedIds] = useState(() => new Set())
  const requests = data?.data.serviceRequests ?? []
  const totalCount = data?.total ?? requests.length
  const hasActiveFilters = Boolean(category || status)

  const handlePropose = (request) => {
    const id = request.id ?? request._id
    setProposingId(id)
    proposeSession.mutate(
      { serviceRequestId: id, payload: {} },
      {
        onSuccess: () => setProposedIds((prev) => new Set(prev).add(id)),
        onSettled: () => setProposingId(null),
      }
    )
  }

  const clearFilters = () => {
    setCategory('')
    setStatus('')
    setPage(1)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <RequestsHeader
        sortBy={sort}
        onSortChange={(v) => {
          setSort(v)
          setPage(1)
        }}
        totalCount={totalCount}
      />

      <RequestFilters
        activeCategory={category}
        onCategoryChange={(v) => {
          setCategory(v)
          setPage(1)
        }}
        activeStatus={status}
        onStatusChange={(v) => {
          setStatus(v)
          setPage(1)
        }}
      />

      {isError && <ErrorState message={error?.message} onRetry={refetch} />}

      {!isError && isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <RequestCardSkeleton key={i} />
          ))}
        </div>
      )}

      {!isError && !isLoading && requests.length === 0 && (
        <EmptyState
          hasActiveFilters={hasActiveFilters}
          onClearFilters={clearFilters}
          onPostRequest={() => setCreateOpen(true)}
        />
      )}

      {!isError && !isLoading && requests.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((request) => {
            const id = request.id ?? request._id
            return (
              <RequestCard
                key={id}
                request={request}
                categories={categories}
                onPropose={handlePropose}
                isProposing={proposingId === id}
                isProposed={proposedIds.has(id)}
              />
            )
          })}
        </div>
      )}

      {!isError && requests.length > 0 && (
        <RequestsCTA
          totalShowing={requests.length}
          totalCount={totalCount}
          isLoadingMore={isFetching}
          onLoadMore={() => setPage((p) => p + 1)}
          onPostRequest={() => setCreateOpen(true)}
        />
      )}

      <CreateServiceRequestModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreated={() => setPage(1)}
      />
    </div>
  )
}
