import { useQuery } from '@tanstack/react-query'
import { fetchBookings } from '../../services/booking/fetchBookings'
import { getBooking } from '../../api/posts'
import { getBookings } from '../../services/booking/bookingService.js'

export const bookingKeys = {
  all: ['bookings'],
  list: (filters) => [...bookingKeys.all, 'list', filters],
  detail: (id) => [...bookingKeys.all, 'detail', id],
}

export function useBookings(filters = {}) {
  return useQuery({
    queryKey: bookingKeys.list(filters),
    queryFn: () => fetchBookings(filters),
    placeholderData: (prev) => prev,
    staleTime: 30_000,
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

export const useBookingsLegacy = (params, enabled = true) => {
  const query = useQuery({
    queryKey: ['bookings', params],
    queryFn: () => getBookings(params),
    enabled: Boolean(enabled),
    select: (res) => res?.data?.bookings ?? res?.bookings ?? [],
  })

  return { ...query, bookings: query.data ?? [] }
}
