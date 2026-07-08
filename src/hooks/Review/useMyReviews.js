import { useQuery } from '@tanstack/react-query'
import { getMyReviewsRequest } from '../../api/reviewApi'

export function useMyReviews({
  type = 'received',
  page = 1,
  limit = 10,
  sort = '-createdAt',
  enabled = true,
  ...extraParams
}) {
  return useQuery({
    queryKey: [
      'my-reviews',
      type,
      page,
      limit,
      sort,
      JSON.stringify(extraParams),
    ],
    queryFn: async () => {
      return await getMyReviewsRequest({
        type,
        page,
        limit,
        sort,
        ...extraParams,
      })
    },
    enabled: !!enabled,
    placeholderData: (previousData) => previousData,
  })
}
