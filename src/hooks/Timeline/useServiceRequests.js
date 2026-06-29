import { useQuery } from '@tanstack/react-query'
import { fetchServiceRequests } from '../../services/Posts/serviceRequestsServices'
import { getServiceRequest } from '../../api/posts'

export const serviceRequestKeys = {
  all: ['serviceRequests'],
  list: (filters) => [...serviceRequestKeys.all, 'list', filters],
  detail: (id) => [...serviceRequestKeys.all, 'detail', id],
  // Nested under the same 'serviceRequests' root as `all`, so the existing
  // invalidateQueries({ queryKey: serviceRequestKeys.all }) calls in
  // useServiceRequestMutations.js already invalidate this too — no need to
  // touch those mutation hooks.
  byUser: (userId) => [...serviceRequestKeys.all, 'byUser', userId ?? 'me'],
}

/** List + filter + paginate service requests. */
export function useServiceRequests(filters = {}) {
  return useQuery({
    queryKey: serviceRequestKeys.list(filters),
    queryFn: () => fetchServiceRequests(filters),
    placeholderData: (prev) => prev, // keep showing old page while next page loads (v5 replacement for keepPreviousData)
    staleTime: 30_000,
  })
}

/** Single service request by id. */
export function useServiceRequest(id, { fields } = {}) {
  return useQuery({
    queryKey: serviceRequestKeys.detail(id),
    queryFn: () => getServiceRequest(id, fields ? { fields } : undefined),
    enabled: Boolean(id),
  })
}