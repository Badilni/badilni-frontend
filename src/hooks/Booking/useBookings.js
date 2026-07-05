import { useQuery } from '@tanstack/react-query'
import { getBookings } from '../../services/Booking/bookingService'

export const useBookings = (params, enabled = true) => {
  const query = useQuery({
    queryKey: ['bookings', params],
    queryFn: () => getBookings(params),
    enabled: Boolean(enabled),
    select: (res) => res?.data?.bookings ?? res?.bookings ?? [],
  })

  return { ...query, bookings: query.data ?? [] }
}
