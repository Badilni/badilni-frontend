import { useState, useEffect } from 'react'
import { getMyReviewsRequest, getUserReviewsRequest } from '../../api/reviewApi'

export const useReviewsCount = (profile, isOwnProfile) => {
  const [reviewsCount, setReviewsCount] = useState(profile?.reviewsCount ?? 0)

  useEffect(() => {
    if (!isOwnProfile && !profile?.id) return

    const fetchReviews = async () => {
      try {
        let response
        if (isOwnProfile) {
          response = await getMyReviewsRequest({ limit: 1 })
        } else if (profile?.id) {
          response = await getUserReviewsRequest(profile.id, { limit: 1 })
        }

        console.log('Reviews count response::', response)
        if (response?.pagination?.totalCount !== undefined) {
          setReviewsCount(response.pagination.totalCount)
        } else if (response?.data?.reviews) {
          setReviewsCount(response.data.reviews.length)
        }
      } catch (err) {
        console.error('Error fetching reviews count:', err)
      }
    }

    fetchReviews()
  }, [profile?.id, isOwnProfile])

  return reviewsCount
}
