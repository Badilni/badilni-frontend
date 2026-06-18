import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getProfile, updateProfile } from '../../services/Profile/profileService'
import useAuthStore from '../../store/authStore'

export const ME_QUERY_KEY = ['me']

export const useGetMe = () => {
  const storeUser = useAuthStore((s) => s.user)

  return useQuery({
    queryKey: ME_QUERY_KEY,
    queryFn: getProfile,
    initialData: storeUser ?? undefined,
    staleTime: storeUser ? 1000 * 60 * 5 : 0,
    // 💡 Unwraps the query response so the cache format always 
    // matches the flat user object in your Zustand store
    select: (res) => res?.data?.user ?? res?.user ?? res,
  })
}

export const useProfile = () => {
  const query = useGetMe()
  return {
    ...query,
    profile: query.data,
  }
}

export const useUpdateProfile = () => {
  const queryClient = useQueryClient()
  const setAuthUser = useAuthStore((s) => s.setUser)

  return useMutation({
    mutationFn: (formData) => updateProfile(formData),
    onSuccess: (response) => {
      // 💡 Extract the inner user object matching your checkAuth mechanism
      const cleanUserData = response?.data?.user ?? response?.user ?? response

      // Update the React Query cache with the unwrapped data payload
      queryClient.setQueryData(ME_QUERY_KEY, cleanUserData)
      queryClient.invalidateQueries({ queryKey: ME_QUERY_KEY })

      // Sync the flat user object to your Zustand global auth state
      if (typeof setAuthUser === 'function') {
        setAuthUser(cleanUserData)
      } else {
        useAuthStore.setState((state) => ({ ...state, user: cleanUserData }))
      }
    },
  })
}