import { useQuery } from '@tanstack/react-query'
import api from '../../api/axios'

/**
 * ASSUMPTION: no GET /categories call appears in any of the 10 Postman
 * screenshots — we only ever see `category` used as an _id inside
 * service-request / skill-listing bodies and query params. This hook's
 * path is a best guess; confirm the real route with the backend.
 *
 * Until confirmed, `RequestFilters` degrades to an "All Requests" only
 * filter rather than rendering fabricated category names.
 */
export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => api.get('/categories').then((r) => r.data),
    staleTime: 5 * 60_000,
  })
}
