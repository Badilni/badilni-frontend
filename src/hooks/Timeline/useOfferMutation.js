import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import {
  createSkillListing,
  editSkillListing,
  deleteSkillListing,
} from '../../api/posts'
import { offerKeys } from './useOffer'

export function useCreateOffer() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: createSkillListing,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: offerKeys.all })
      toast.success('Offer posted')
    },
    onError: (error) => {
      toast.error(error?.message || "Couldn't post your offer. Try again.")
    },
  })
}

export function useUpdateOffer() {
  const qc = useQueryClient()
  return useMutation({
    // Pass only the fields that changed — PATCH is a true partial update.
    mutationFn: ({ id, payload }) => editSkillListing(id, payload),
    onSuccess: (_data, { id }) => {
      qc.invalidateQueries({ queryKey: offerKeys.detail(id) })
      qc.invalidateQueries({ queryKey: offerKeys.all })
      toast.success('Offer updated')
    },
    onError: (error) => {
      toast.error(error?.message || "Couldn't update your offer. Try again.")
    },
  })
}

export function useDeleteOffer() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: deleteSkillListing,
    // Optimistic removal from active list views.
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: offerKeys.all })
      const previous = qc.getQueriesData({ queryKey: offerKeys.all })
      qc.setQueriesData({ queryKey: offerKeys.all }, (old) => {
        if (!old?.data?.skillListings) return old
        return {
          ...old,
          data: {
            ...old.data,
            skillListings: old.data.skillListings.filter(
              (item) => (item._id ?? item.id) !== id
            ),
          },
        }
      })
      return { previous }
    },
    onError: (error, _id, context) => {
      context?.previous?.forEach(([key, data]) => qc.setQueryData(key, data))
      toast.error(error?.message || "Couldn't delete your offer. Try again.")
    },
    onSuccess: () => toast.success('Offer deleted'),
    onSettled: () => {
      qc.invalidateQueries({ queryKey: offerKeys.all })
    },
  })
}
