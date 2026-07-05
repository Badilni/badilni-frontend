import {
  getUserReviewsRequest,
  createReviewRequests,
  getListingReviewsRequest,
  getReviewsRequest,
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

export const getListingReviews = (listingId, params) =>
  getListingReviewsRequest(listingId, params)

export const getReviews = (params) => getReviewsRequest(params)
