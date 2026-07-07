import { useQuery } from '@tanstack/react-query'
import { getUserSkillListings } from '../../api/posts'
import { offerKeys } from './useOffer'

/**
 * Pass a userId to view someone else's posted offers, or omit it (own
 * profile) to hit /users/me/skill-listings.
 */
export function useUserOffers(userId, params = {}) {
  return useQuery({
    queryKey: offerKeys.byUser(userId),
    queryFn: () => getUserSkillListings(userId, params),
    staleTime: 30_000,
  })
}
