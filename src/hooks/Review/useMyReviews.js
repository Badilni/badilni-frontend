import { useQuery } from '@tanstack/react-query'
import { getMyReviewsRequest } from '../../api/reviewApi'

export function useMyReviews({
  type = 'received',
  page = 1,
  limit = 10,
  sort = '-createdAt',
  enabled = true, // استقبليها هنا
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
      // الحل: تمرير البارامترات المطلوبة فقط للـ API
      return await getMyReviewsRequest({
        type,
        page,
        limit,
        sort,
        ...extraParams, // enabled ليست هنا، لذا لن تذهب للـ API
      })
    },
    enabled: !!enabled, // استخدميها هنا للتحكم في الـ Query فقط
    placeholderData: (previousData) => previousData,
  })
}
