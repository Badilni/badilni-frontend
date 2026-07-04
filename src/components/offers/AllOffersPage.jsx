import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useOffers } from '../../hooks/Timeline/useOffer'
import { useDeleteOffer } from '../../hooks/Timeline/useOfferMutation'
import { useCategories } from '../../hooks/useCategories'
import OffersHeader from './OffersHeader'
import OfferFilters from './OfferFilters'
import OfferCard from './OfferCard'
import OffersCTA from './OffersCTA'
import CreateOfferModal from './CreateOfferModal'
import EditOfferModal from './EditOfferModal'
import ConfirmDeleteModal from '../shared/ConfirmDeleteModal'
import OfferCardSkeleton from './OfferCardSkeleton'
import EmptyState from '../shared/EmptyState'
import ErrorState from '../shared/ErrorState'

const PAGE_SIZE = 9
const DEFAULT_SORT = '-averageRating'

export default function AllOffersPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [createOpen, setCreateOpen] = useState(false)
  const [editingOffer, setEditingOffer] = useState(null)
  const [deletingOffer, setDeletingOffer] = useState(null)

  const filters = useMemo(() => {
    const page = Number(searchParams.get('page') || 1)
    return {
      keyword: searchParams.get('keyword') || undefined,
      category: searchParams.get('category') || undefined,
      isActive: searchParams.get('isActive') || undefined,
      hourlyRateGreaterThan: searchParams.get('hourlyRateMin') || undefined,
      hourlyRateLessThan: searchParams.get('hourlyRateMax') || undefined,
      averageRatingGreaterThan: searchParams.get('ratingMin') || undefined,
      createdAtGreaterThan: searchParams.get('dateFrom') || undefined,
      createdAtLessThan: searchParams.get('dateTo') || undefined,
      sort: searchParams.get('sort') || DEFAULT_SORT,
      page,
      limit: PAGE_SIZE,
    }
  }, [searchParams])

  // Maps our internal filter keys to short, readable query-string keys and
  // writes them into the URL so filters survive a refresh / are shareable.
  const KEY_MAP = {
    keyword: 'keyword',
    category: 'category',
    isActive: 'isActive',
    hourlyRateGreaterThan: 'hourlyRateMin',
    hourlyRateLessThan: 'hourlyRateMax',
    averageRatingGreaterThan: 'ratingMin',
    createdAtGreaterThan: 'dateFrom',
    createdAtLessThan: 'dateTo',
    sort: 'sort',
    page: 'page',
  }

  const updateParams = (patch, { resetPage = true } = {}) => {
    const next = new URLSearchParams(searchParams)
    Object.entries(patch).forEach(([key, value]) => {
      const urlKey = KEY_MAP[key] || key
      if (value === undefined || value === '') next.delete(urlKey)
      else next.set(urlKey, value)
    })
    if (resetPage) next.set('page', '1')
    setSearchParams(next)
  }

  const resetFilters = () => setSearchParams({})

  const { data, isLoading, isFetching, isError, error, refetch } =
    useOffers(filters)
  const { categories, loading, error: categoriesError } = useCategories()
  const deleteOffer = useDeleteOffer()

  const offers = data?.data?.skillListings ?? []
  const pagination = data?.pagination ?? {}
  const totalCount = pagination.totalCount ?? offers.length
  const totalPages = pagination.totalPages ?? 1

  const hasActiveFilters = Boolean(
    filters.keyword ||
    filters.category ||
    filters.isActive ||
    filters.hourlyRateGreaterThan ||
    filters.hourlyRateLessThan ||
    filters.averageRatingGreaterThan ||
    filters.createdAtGreaterThan ||
    filters.createdAtLessThan
  )

  const handleConfirmDelete = () => {
    if (!deletingOffer) return
    deleteOffer.mutate(deletingOffer._id ?? deletingOffer.id, {
      onSuccess: () => setDeletingOffer(null),
    })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <OffersHeader totalCount={totalCount} />

      <OfferFilters
        categories={categories}
        filters={filters}
        onChange={updateParams}
        onReset={resetFilters}
      />

      {isError && <ErrorState message={error?.message} onRetry={refetch} />}

      {!isError && isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <OfferCardSkeleton key={i} />
          ))}
        </div>
      )}

      {!isError && !isLoading && offers.length === 0 && (
        <EmptyState
          hasActiveFilters={hasActiveFilters}
          onClearFilters={resetFilters}
          onPostRequest={() => setCreateOpen(true)}
          title={
            hasActiveFilters ? 'No offers match these filters' : 'No offers yet'
          }
          description={
            hasActiveFilters
              ? 'Try a different category, rate range, or sort order.'
              : 'Post the first offer and start getting booked for your skills.'
          }
          actionLabel="Create an Offer"
        />
      )}

      {!isError && !isLoading && offers.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer) => (
            <OfferCard
              key={offer._id ?? offer.id}
              offer={offer}
              onEdit={setEditingOffer}
              onDelete={setDeletingOffer}
            />
          ))}
        </div>
      )}

      {!isError && offers.length > 0 && (
        <OffersCTA
          totalShowing={offers.length}
          totalCount={totalCount}
          hasMore={filters.page < totalPages}
          isLoadingMore={isFetching}
          onLoadMore={() =>
            updateParams(
              { page: String(filters.page + 1) },
              { resetPage: false }
            )
          }
          onPostOffer={() => setCreateOpen(true)}
        />
      )}

      <CreateOfferModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
      />
      <EditOfferModal
        open={Boolean(editingOffer)}
        offer={editingOffer}
        onClose={() => setEditingOffer(null)}
      />
      <ConfirmDeleteModal
        open={Boolean(deletingOffer)}
        title="Delete this offer?"
        description="This will permanently remove your offer. This action cannot be undone."
        isDeleting={deleteOffer.isPending}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingOffer(null)}
      />
    </div>
  )
}
