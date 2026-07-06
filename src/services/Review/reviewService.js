import {
  getUserReviewsRequest,
  createReviewRequests,
  getListingReviewsRequest,
  getReviewsRequest,
  getBookingReviewsRequest,
  updateReviewRequest,
} from '../../api/reviewApi'

export const getUserReviews = (userId, params) =>
  getUserReviewsRequest(userId, params)

export const createReview = (data) => {
  const bookingId = data.booking || data.bookingId
  if (!bookingId) {
    return Promise.reject(new Error('Booking ID is required to create a review'))
  }
  const payload = {
    rating: data.rating,
  }
  if (data.comment !== undefined) {
    payload.comment = data.comment
  }
  return createReviewRequests(bookingId, payload)
}

export const createBookingReview = (bookingId, data) => {
  if (!bookingId) {
    return Promise.reject(new Error('Booking ID is required'))
  }
  return createReviewRequests(bookingId, data)
}

export const getBookingReviews = (bookingId, params) => {
  if (!bookingId) {
    return Promise.reject(new Error('Booking ID is required'))
  }
  return getBookingReviewsRequest(bookingId, params)
}

export const getListingReviews = (listingId, params) =>
  getListingReviewsRequest(listingId, params)

export const getReviews = (params) => getReviewsRequest(params)

export const updateReview = (id, data) => {
  if (!id) {
    return Promise.reject(new Error('Review ID is required to update a review'))
  }
  const payload = {}
  if (data.rating !== undefined) {
    payload.rating = data.rating
  }
  if (data.comment !== undefined) {
    payload.comment = data.comment
  }
  return updateReviewRequest(id, payload)
}
