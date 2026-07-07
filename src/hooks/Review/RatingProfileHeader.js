import { useQuery } from '@tanstack/react-query'
import { getMyReviewsRequest, getUserReviewsRequest } from '../../api/reviewApi'

/**
 * Custom hook to fetch the total count of reviews for a user.
 * Supports both the logged-in user's profile and public profiles.
 */
export const useReviewsCount = (userId, isOwnProfile) => {
  return useQuery({
    queryKey: ['reviewsCount', userId, isOwnProfile],
    queryFn: async () => {
      let response

      // Determine which API request to perform based on profile ownership
      if (isOwnProfile) {
        response = await getMyReviewsRequest({ limit: 1 })
      } else if (userId) {
        response = await getUserReviewsRequest(userId, { limit: 1 })
      } else {
        return 0
      }

      // Standardize the count extraction regardless of API response structure
      // Checks for paginated response or direct array length
      return (
        response?.pagination?.totalCount ?? response?.data?.reviews?.length ?? 0
      )
    },
    // Only execute the query when we have a valid context (own profile or specific userId)
    enabled: !!isOwnProfile || !!userId,
    initialData: 0,
  })
}
