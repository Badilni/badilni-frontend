import { useMemo, useState } from 'react'
import { useBookings } from '../../hooks/booking/useBookings'
import BookingCard from './BookingCard'
import BookingCardSkeleton from './BookingCardSkeleton'
import EmptyState from '../shared/EmptyState'
import ErrorState from '../shared/ErrorState'
import { BOOKING_STATUS } from '../../utils/bookingStatus'

const PAGE_SIZE = 10

const TYPE_TABS = [
  { key: 'sent', label: 'Sent' },
  { key: 'received', label: 'Received' },
]

const STATUS_OPTIONS = [
  { value: '', label: 'All statuses' },
  { value: BOOKING_STATUS.PENDING, label: 'Pending' },
  { value: BOOKING_STATUS.ACCEPTED, label: 'Accepted' },
  { value: BOOKING_STATUS.COMPLETED, label: 'Completed' },
  { value: BOOKING_STATUS.DECLINED, label: 'Declined' },
  { value: BOOKING_STATUS.CANCELLED, label: 'Cancelled' },
  { value: BOOKING_STATUS.DISPUTED, label: 'Disputed' },
]

export default function BookingsPage() {
  const [type, setType] = useState('sent')
  const [status, setStatus] = useState('')
  const [page, setPage] = useState(1)

  const filters = useMemo(
    () => ({ type, status: status || undefined, page, limit: PAGE_SIZE }),
    [type, status, page]
  )

  const { data, isLoading, isFetching, isError, error, refetch } =
    useBookings(filters)

  // ASSUMPTION: list response wraps as { data: { bookings }, pagination: {...} },
  // consistent with the rest of the project's list endpoint shapes.
  const bookings = data?.data?.bookings ?? []
  const pagination = data?.pagination ?? {}
  const totalCount = pagination.total ?? bookings.length
  const hasMore = page < (pagination.pages ?? 1)

  const handleTypeChange = (t) => {
    setType(t)
    setStatus('')
    setPage(1)
  }
  const handleStatusChange = (s) => {
    setStatus(s)
    setPage(1)
  }

  return (
    <div className="w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 text-xs font-bold px-3 py-1.5 rounded-full mb-4">
          <span className="w-=full h-1.5 rounded-full bg-blue-500 animate-pulse" />
          {totalCount} bookings
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-2 leading-tight">
          My Bookings
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xl">
          Manage all your sent and received session bookings.
        </p>
      </div>

      {/* Tabs + filter */}
      <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
        <div className="flex items-center gap-2 bg-[var(--whiteBackground)] dark:bg-slate-900 rounded-2xl p-1.5 border border-gray-100 dark:border-slate-800">
          {TYPE_TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => handleTypeChange(tab.key)}
              className={`px-5 py-2 rounded-xl text-sm font-semibold transition-colors ${
                type === tab.key
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <select
          value={status}
          onChange={(e) => handleStatusChange(e.target.value)}
          className="bg-[var(--whiteBackground)] dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-300"
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {isError && <ErrorState message={error?.message} onRetry={refetch} />}

      {!isError && isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <BookingCardSkeleton key={i} />
          ))}
        </div>
      )}

      {!isError && !isLoading && bookings.length === 0 && (
        <EmptyState
          title={`No ${status ? STATUS_OPTIONS.find((o) => o.value === status)?.label.toLowerCase() : ''} ${type} bookings`}
          description="When you book or receive a session, it will appear here."
          hasActiveFilters={Boolean(status)}
          onClearFilters={() => handleStatusChange('')}
          actionLabel={null}
        />
      )}

      {!isError && !isLoading && bookings.length > 0 && (
        <div className="flex flex-col gap-6">
          <div className="w-full max-w-5xl mx-auto space-y-6">
            {bookings.map((booking, i) => (
              <div
                key={booking._id ?? booking.id}
                className={`w-full border-b border-gray-100 dark:border-slate-800 ${i === bookings.length - 1 ? 'last:border-b-0' : ''}`}
              >
                <BookingCard booking={booking} />
              </div>
            ))}
          </div>
        </div>
      )}

      {hasMore && (
        <div className="mt-14 flex flex-col items-center gap-3">
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={isFetching}
            className="group flex items-center gap-3 border-2 border-blue-200 dark:border-blue-800 hover:border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 px-10 py-3.5 rounded-2xl text-sm font-bold transition-all duration-200 disabled:opacity-60"
          >
            {isFetching ? 'Loading…' : 'Load More'}
          </button>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            Showing {bookings.length} of {totalCount} bookings
          </p>
        </div>
      )}
    </div>
  )
}
