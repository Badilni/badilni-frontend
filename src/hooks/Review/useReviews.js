import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getUserReviews,
  createReview,
  getListingReviews,
  getReviews,
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

export const useListingReviews = (listingId, params) => {
  const query = useQuery({
    queryKey: ['listingReviews', listingId, params],
    queryFn: () => getListingReviews(listingId, params),
    enabled: Boolean(listingId),
  })

  return { ...query, response: query.data }
}

export const useReviews = (params) => {
  const query = useQuery({
    queryKey: ['reviews', params],
    queryFn: () => getReviews(params),
    enabled: Boolean(params),
    select: (res) => res?.data?.reviews ?? res?.reviews ?? [],
  })

  return { ...query, reviews: query.data ?? [] }
}

export const useCreateReview = (userId, listingId) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data) => createReview(data),
    onSuccess: () => {
      // Refresh the reviews list and the profile so averageRating updates.
      if (userId) {
        queryClient.invalidateQueries({ queryKey: ['userReviews', userId] })
        queryClient.invalidateQueries({ queryKey: ['userProfile', userId] })
      }
      if (listingId) {
        queryClient.invalidateQueries({ queryKey: ['listingReviews', listingId] })
        queryClient.invalidateQueries({ queryKey: ['offers', 'detail', listingId] })
        queryClient.invalidateQueries({ queryKey: ['reviews'] })
      }
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
    },
  })
}
