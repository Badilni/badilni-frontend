import { useQuery } from '@tanstack/react-query'
import { fetchBookings } from '../../services/booking/fetchBookings'
import { getBooking } from '../../api/posts'

export const bookingKeys = {
  all: ['bookings'],
  list: (filters) => [...bookingKeys.all, 'list', filters],
  detail: (id) => [...bookingKeys.all, 'detail', id],
}

export function useBookings(filters = {}, options = {}) {
  return useQuery({
    queryKey: bookingKeys.list(filters),
    queryFn: () => fetchBookings(filters),
    placeholderData: (prev) => prev,
    staleTime: 30_000,
    ...options,
  })
}

export function useBooking(id) {
  return useQuery({
    queryKey: bookingKeys.detail(id),
    queryFn: () => getBooking(id),
    enabled: Boolean(id),
    staleTime: 30_000,
  })
}