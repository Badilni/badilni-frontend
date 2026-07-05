import api from './axios'

export const getBookingsRequest = (params) =>
  api.get('/bookings', { params }).then((r) => r.data)
