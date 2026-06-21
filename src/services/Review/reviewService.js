import { getUserReviewsRequest, createReviewRequest } from '../../api/reviewApi'

export const getUserReviews = (userId, params) => getUserReviewsRequest(userId, params)

export const createReview = (data) => createReviewRequest(data)