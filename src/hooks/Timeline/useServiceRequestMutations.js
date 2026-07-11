import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  createServiceRequest,
  editServiceRequest,
  deleteServiceRequest,
} from '../../api/posts'
import { serviceRequestKeys } from './useServiceRequests'
import toast from 'react-hot-toast'

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
    mutationFn: (id) => {
      console.log('Delete Request initiated for ID:', id)
      return deleteServiceRequest(id)
    },
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: serviceRequestKeys.all })
      const previous = qc.getQueryData(serviceRequestKeys.all)

      qc.setQueryData(serviceRequestKeys.all, (old) => {
        if (!old) return old

        const list = Array.isArray(old) ? old : old.data || []

        const updatedList = list.filter((item) => (item.id ?? item._id) !== id)

        return Array.isArray(old) ? updatedList : { ...old, data: updatedList }
      })

      return { previous }
    },
    onError: (err, id, context) => {
      console.error('Delete Error:', err)
      if (context?.previous) {
        qc.setQueryData(serviceRequestKeys.all, context.previous)
      }
      toast.error("Couldn't delete the request. Please try again.")
    },
    onSuccess: () => toast.success('Service request deleted'),
    onSettled: () => {
      qc.invalidateQueries({ queryKey: serviceRequestKeys.all })
    },
  })
}
