import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getUserReviews,
  createReview,
} from '../../services/Review/reviewService'

export const useUserReviews = (userId, params) => {
  const query = useQuery({
    queryKey: ['userReviews', userId, params],
    queryFn: () => getUserReviews(userId, params),
    enabled: Boolean(userId),
    select: (res) => res?.data?.reviews ?? res?.reviews ?? [],
  })

  return { ...query, reviews: query.data ?? [] }
}

export const useCreateReview = (userId) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data) => createReview(data),
    onSuccess: () => {
      // Refresh the reviews list and the profile so averageRating updates.
      queryClient.invalidateQueries({ queryKey: ['userReviews', userId] })
      queryClient.invalidateQueries({ queryKey: ['userProfile', userId] })
    },
  })
}
