import { useQuery } from '@tanstack/react-query'
import { fetchOffers } from '../../services/Posts/fetchOffers'
import { getSkillListing } from '../../api/posts'

export const offerKeys = {
  all: ['offers'],
  list: (filters) => [...offerKeys.all, 'list', filters],
  detail: (id) => [...offerKeys.all, 'detail', id],
  // Nested under the same 'offers' root as `all`, so the existing
  // invalidateQueries({ queryKey: offerKeys.all }) calls in
  // useOfferMutations.js already invalidate this too.
  byUser: (userId) => [...offerKeys.all, 'byUser', userId ?? 'me'],
}

/** List + filter + paginate offers (skill listings). */
export function useOffers(filters = {}) {
  return useQuery({
    queryKey: offerKeys.list(filters),
    queryFn: () => fetchOffers(filters),
    placeholderData: (prev) => prev, // keep showing the current page while the next page loads
    staleTime: 30_000,
  })
}

/** Single offer by id. */
export function useOffer(id, { fields } = {}) {
  return useQuery({
    queryKey: offerKeys.detail(id),
    queryFn: () => getSkillListing(id, fields ? { fields } : undefined),
    enabled: Boolean(id),
  })
}
