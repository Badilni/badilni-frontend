import { useQuery } from '@tanstack/react-query'
import { fetchMatches } from '../../services/matches/fetchMatches'
import { getMatch } from '../../api/matches'

export const matchKeys = {
  all: ['matches'],
  list: (filters) => [...matchKeys.all, 'list', filters],
  detail: (id) => [...matchKeys.all, 'detail', id],
}

export function useMatches(filters = {}) {
  return useQuery({
    queryKey: matchKeys.list(filters),
    queryFn: () => fetchMatches(filters),
    placeholderData: (prev) => prev,
    staleTime: 60_000,
  })
}

export function useMatch(id) {
  return useQuery({
    queryKey: matchKeys.detail(id),
    queryFn: () => getMatch(id),
    enabled: Boolean(id),
    staleTime: 60_000,
  })
}
