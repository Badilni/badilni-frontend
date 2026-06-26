import { useQuery } from '@tanstack/react-query'
import {
  getAllCategoriesRequest,
  getCategoryByIdRequest,
} from '../api/categoryApi'

export function useCategories(params = {}) {
  const query = useQuery({
    queryKey: ['categories', params],
    queryFn: () => getAllCategoriesRequest({ limit: 20, ...params }),
    select: (res) => res?.data?.categories ?? [],
    staleTime: 1000 * 60 * 5,
  })

  return { ...query, categories: query.data ?? [] }
}

export function useCategory(id) {
  const query = useQuery({
    queryKey: ['category', id],
    queryFn: () => getCategoryByIdRequest(id),
    enabled: Boolean(id),
    select: (res) => res?.data?.category ?? null,
    staleTime: 1000 * 60 * 5,
  })

  return { ...query, category: query.data ?? null }
}
