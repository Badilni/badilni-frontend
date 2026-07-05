import api from './axios'

export const getMyReviewsRequest = (params) =>
  api.get('/users/me/reviews', { params }).then((r) => r.data)

export const getUserReviewsRequest = (userId, params) => {
  if (!userId) return Promise.reject(new Error('userId is required'))
  return api.get(`/users/${userId}/reviews`, { params }).then((r) => r.data)
}

export const createReviewRequest = (bookingId, data) =>
  api.post(`/bookings/${bookingId}/reviews`, data).then((r) => r.data)
