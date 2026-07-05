import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import {
  createBooking,
  acceptBooking,
  declineBooking,
  cancelBooking,
  confirmBooking,
  disputeBooking,
  addMeetingLink,
} from '../../api/posts'
import { bookingKeys } from './useBookings'

function useInvalidate() {
  const qc = useQueryClient()
  return (id) => {
    qc.invalidateQueries({ queryKey: bookingKeys.all })
    if (id) qc.invalidateQueries({ queryKey: bookingKeys.detail(id) })
  }
}

export function useCreateBooking() {
  const invalidate = useInvalidate()
  return useMutation({
    mutationFn: createBooking,
    onSuccess: () => {
      invalidate()
      toast.success('Booking request sent')
    },
    onError: (err) =>
      toast.error(
        err?.response?.data?.message ||
          err?.message ||
          "Couldn't create booking. Try again."
      ),
  })
}

export function useAcceptBooking() {
  const invalidate = useInvalidate()
  return useMutation({
    mutationFn: acceptBooking,
    onSuccess: (_, id) => {
      invalidate(id)
      toast.success('Booking accepted')
    },
    onError: (err) =>
      toast.error(
        err?.response?.data?.message ||
          err?.message ||
          "Couldn't accept booking. Try again."
      ),
  })
}

export function useDeclineBooking() {
  const invalidate = useInvalidate()
  return useMutation({
    mutationFn: declineBooking,
    onSuccess: (_, id) => {
      invalidate(id)
      toast.success('Booking declined')
    },
    onError: (err) =>
      toast.error(
        err?.response?.data?.message ||
          err?.message ||
          "Couldn't decline booking. Try again."
      ),
  })
}

export function useCancelBooking() {
  const invalidate = useInvalidate()
  return useMutation({
    mutationFn: ({ id, cancellationReason }) =>
      cancelBooking(id, cancellationReason),
    onSuccess: (_, { id }) => {
      invalidate(id)
      toast.success('Booking cancelled')
    },
    onError: (err) =>
      toast.error(
        err?.response?.data?.message ||
          err?.message ||
          "Couldn't cancel booking. Try again."
      ),
  })
}

export function useConfirmBooking() {
  const invalidate = useInvalidate()
  return useMutation({
    mutationFn: confirmBooking,
    onSuccess: (_, id) => {
      invalidate(id)
      toast.success('Booking confirmed')
    },
    onError: (err) =>
      toast.error(
        err?.response?.data?.message ||
          err?.message ||
          "Couldn't confirm booking. Try again."
      ),
  })
}

export function useDisputeBooking() {
  const invalidate = useInvalidate()
  return useMutation({
    mutationFn: disputeBooking,
    onSuccess: (_, id) => {
      invalidate(id)
      toast.success('Dispute submitted')
    },
    onError: (err) =>
      toast.error(
        err?.response?.data?.message ||
          err?.message ||
          "Couldn't submit dispute. Try again."
      ),
  })
}

export function useMeetingLink() {
  const invalidate = useInvalidate()
  return useMutation({
    mutationFn: ({ id, meetingLink }) => addMeetingLink(id, meetingLink),
    onSuccess: (_, { id }) => {
      invalidate(id)
      toast.success('Meeting link saved')
    },
    onError: (err) =>
      toast.error(
        err?.response?.data?.message ||
          err?.message ||
          "Couldn't save meeting link. Try again."
      ),
  })
}
