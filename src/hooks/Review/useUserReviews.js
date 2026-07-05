import { useQuery } from '@tanstack/react-query'
import { getUserReviewsRequest } from '../../api/reviewApi'

export function useUserReviews({
  userId,
  type = 'received',
  page = 1,
  limit = 10,
  sort = '-createdAt',
  ...extraParams
}) {
  return useQuery({
    queryKey: ['user-reviews', userId, type, page, limit, sort, JSON.stringify(extraParams)],
    queryFn: async () => {
      return await getUserReviewsRequest(userId, { type, page, limit, sort, ...extraParams });
    },
    enabled: Boolean(userId),
    placeholderData: (previousData) => previousData,
  })
}
