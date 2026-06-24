import { useQuery } from '@tanstack/react-query'
import { fetchSkillListings } from '../services/skillListings/fetchSkillListings'
import { getSkillListing } from '../api/posts'

export const skillListingKeys = {
  all: ['skillListings'],
  list: (filters) => [...skillListingKeys.all, 'list', filters],
  detail: (id) => [...skillListingKeys.all, 'detail', id],
}

export function useSkillListings(filters = {}) {
  return useQuery({
    queryKey: skillListingKeys.list(filters),
    queryFn: () => fetchSkillListings(filters),
    placeholderData: (prev) => prev,
    staleTime: 30_000,
  })
}

export function useSkillListing(id, { fields } = {}) {
  return useQuery({
    queryKey: skillListingKeys.detail(id),
    queryFn: () => getSkillListing(id, fields ? { fields } : undefined),
    enabled: Boolean(id),
  })
}
