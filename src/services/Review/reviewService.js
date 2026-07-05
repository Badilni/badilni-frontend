import {
  getUserReviewsRequest,
  createReviewRequest,
  getListingReviewsRequest,
  getReviewsRequest,
} from '../../api/reviewApi'

export const getUserReviews = (userId, params) =>
  getUserReviewsRequest(userId, params)

export const createReview = (data) => createReviewRequest(data)

export const getListingReviews = (listingId, params) =>
  getListingReviewsRequest(listingId, params)

export const getReviews = (params) => getReviewsRequest(params)
