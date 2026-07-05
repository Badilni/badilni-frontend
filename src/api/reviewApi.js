import api from './axios'

export const getUserReviewsRequest = (userId, params) =>
  api.get(`/reviews/user/${userId}`, { params }).then((r) => r.data)

export const createReviewRequest = (data) =>
  api.post('/reviews', data).then((r) => r.data)

export const getListingReviewsRequest = (listingId, params) =>
  api.get(`/skill-listings/${listingId}/reviews`, { params }).then((r) => r.data)

export const getReviewsRequest = (params) =>
  api.get('/reviews', { params }).then((r) => r.data)
