import { useQuery } from '@tanstack/react-query'
import { getMyReviewsRequest, getUserReviewsRequest } from '../../api/reviewApi'

export function useReviewListingOptions({
  userId,
  type = 'received',
  enabled = true,
} = {}) {
  return useQuery({
    queryKey: ['review-listing-options', userId || 'me', type],
    enabled,
    queryFn: async () => {
      const params = { type, page: 1, limit: 100, fields: 'rating' }
      const data = userId
        ? await getUserReviewsRequest(userId, params)
        : await getMyReviewsRequest(params)

      const reviews = data?.data?.reviews || []
      const seen = new Map()
      reviews.forEach((r) => {
        if (r?.listing?._id && !seen.has(r.listing._id)) {
          seen.set(r.listing._id, {
            _id: r.listing._id,
            title: r.listing.title,
          })
        }
      })

      return Array.from(seen.values())
    },
    staleTime: 5 * 60 * 1000,
  })
}
