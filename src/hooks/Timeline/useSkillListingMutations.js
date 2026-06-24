import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createSkillListing, editSkillListing, deleteSkillListing } from '../api/posts'
import { skillListingKeys } from './useSkillListings'

export function useCreateSkillListing() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: createSkillListing,
    onSuccess: () => qc.invalidateQueries({ queryKey: skillListingKeys.all }),
  })
}

export function useEditSkillListing() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }) => editSkillListing(id, payload),
    onSuccess: (_data, { id }) => {
      qc.invalidateQueries({ queryKey: skillListingKeys.detail(id) })
      qc.invalidateQueries({ queryKey: skillListingKeys.all })
    },
  })
}

export function useDeleteSkillListing() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: deleteSkillListing,
    onSuccess: () => qc.invalidateQueries({ queryKey: skillListingKeys.all }),
  })
}
