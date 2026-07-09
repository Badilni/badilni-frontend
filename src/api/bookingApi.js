import api from './axios'

export const getBookingsRequest = (params) =>
  api.get('/bookings', { params }).then((r) => r.data)

export const getBookingMessages = (bookingId) =>
  api.get(`/bookings/${bookingId}/messages`).then((r) => r.data)

export const sendBookingMessage = (bookingId, formData) =>
  api.post(`/bookings/${bookingId}/messages`, formData).then((r) => r.data)

export const markBookingMessagesAsRead = (bookingId) =>
  api.patch(`/bookings/${bookingId}/messages/read`).then((r) => r.data)
