import api from './axios'

export const getMyReviewsRequest = (params) =>
  api.get('/users/me/reviews', { params }).then((r) => r.data)

export const createReviewRequest = (data) =>
  api.post('/reviews', data).then((r) => r.data)

export const getListingReviewsRequest = (listingId, params) =>
  api.get(`/skill-listings/${listingId}/reviews`, { params }).then((r) => r.data)

export const getReviewsRequest = (params) =>
  api.get('/reviews', { params }).then((r) => r.data)

export const getUserReviewsRequest = (userId, params) => {
  if (!userId) return Promise.reject(new Error('userId is required'))
  return api.get(`/users/${userId}/reviews`, { params }).then((r) => r.data)
}

export const createReviewRequests = (bookingId, data) =>
  api.post(`/bookings/${bookingId}/reviews`, data).then((r) => r.data)

export const getBookingReviewsRequest = (bookingId, params) =>
  api.get(`/bookings/${bookingId}/reviews`, { params }).then((r) => r.data)

export const updateReviewRequest = (id, data) =>
  api.patch(`/reviews/${id}`, data).then((r) => r.data)

