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

// remove Avatar

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteAvatarRequest } from '../../api/authApi'

export const useDeleteAvatar = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      const token =
        localStorage.getItem('token') || localStorage.getItem('accessToken')
      return deleteAvatarRequest(token)
    },
    onSuccess: () => {
      queryClient.setQueryData(['profile'], (oldData) => {
        if (!oldData) return oldData
        return {
          ...oldData,
          avatar: { ...oldData.avatar, url: '' },
        }
      })
    },
  })
}
