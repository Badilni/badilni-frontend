import { useQuery } from '@tanstack/react-query'
import { getUserProfile } from '../../services/Profile/profileService'

export const useUserProfile = (userId) => {
  const query = useQuery({
    queryKey: ['userProfile', userId],
    queryFn: () => getUserProfile(userId),
    enabled: Boolean(userId),
    select: (res) => res?.data?.user ?? res?.user ?? res,
  })

  return { ...query, profile: query.data }
}