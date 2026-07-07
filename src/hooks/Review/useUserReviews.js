import { useQuery } from '@tanstack/react-query'
import { getUserReviewsRequest } from '../../api/reviewApi'

export function useUserReviews({
  userId,
  type = 'received',
  page = 1,
  limit = 10,
  sort = '-createdAt',
  enabled = true, // ← لازم تتكتب هنا صراحة عشان متقعش جوه extraParams
  ...extraParams
}) {
  return useQuery({
    queryKey: [
      'user-reviews',
      userId,
      type,
      page,
      limit,
      sort,
      JSON.stringify(extraParams),
    ],
    queryFn: async () => {
      // enabled مش موجودة هنا خالص، فمستحيل تتبعت للـ API
      return await getUserReviewsRequest(userId, {
        type,
        page,
        limit,
        sort,
        ...extraParams,
      })
    },
    enabled: Boolean(userId) && !!enabled,
    placeholderData: (previousData) => previousData,
  })
}
