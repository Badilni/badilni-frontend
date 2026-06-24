import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createServiceRequest, editServiceRequest, deleteServiceRequest } from '../../api/posts'
import { serviceRequestKeys } from './useServiceRequests'

export function useCreateServiceRequest() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: createServiceRequest,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: serviceRequestKeys.all })
    },
  })
}

export function useEditServiceRequest() {
  const qc = useQueryClient()
  return useMutation({
    // pass only the fields that changed — confirmed PATCH is a true partial update (img 7)
    mutationFn: ({ id, payload }) => editServiceRequest(id, payload),
    onSuccess: (_data, { id }) => {
      qc.invalidateQueries({ queryKey: serviceRequestKeys.detail(id) })
      qc.invalidateQueries({ queryKey: serviceRequestKeys.all })
    },
  })
}

export function useDeleteServiceRequest() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: deleteServiceRequest,
    // Optimistic removal from the active list views
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: serviceRequestKeys.all })
      const previous = qc.getQueriesData({ queryKey: serviceRequestKeys.all })
      qc.setQueriesData({ queryKey: serviceRequestKeys.all }, (old) => {
        if (!old?.data) return old
        return { ...old, data: old.data.filter((item) => (item.id ?? item._id) !== id) }
      })
      return { previous }
    },
    onError: (_err, _id, context) => {
      context?.previous?.forEach(([key, data]) => qc.setQueryData(key, data))
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: serviceRequestKeys.all })
    },
  })
}
