import { useQuery } from '@tanstack/react-query'
import { getUserServiceRequests } from '../../api/posts'
import { serviceRequestKeys } from './useServiceRequests'

/**
 * Pass a userId to view someone else's posted requests, or omit it (own
 * profile) to hit /users/me/service-requests.
 */
export function useUserServiceRequests(userId, params = {}) {
  return useQuery({
    queryKey: serviceRequestKeys.byUser(userId),
    queryFn: () => getUserServiceRequests(userId, params),
    staleTime: 30_000,
  })
}