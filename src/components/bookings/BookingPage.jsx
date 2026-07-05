import { useParams } from 'react-router-dom'
import { useBooking } from '../../hooks/booking/useBookings'
import BookingDetail from './BookingDetail'
import ErrorState from '../shared/ErrorState'

export default function BookingPage() {
  const { bookingId } = useParams()
  const { data, isLoading, isError, error, refetch } = useBooking(bookingId)
  const booking = data?.data?.booking

  if (isLoading) {
    return (
      <div className="p-10 text-center text-gray-500 dark:text-gray-400">
        Loading…
      </div>
    )
  }
  if (isError) {
    return <ErrorState message={error?.message} onRetry={refetch} />
  }
  if (!booking) {
    return (
      <div className="p-10 text-center text-gray-500 dark:text-gray-400">
        Booking not found.
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
          Booking Details
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          View and manage this session
        </p>
      </div>
      <BookingDetail booking={booking} />
    </div>
  )
}
