import { BOOKING_STATUS } from './bookingStatus'

/**
 * Returns the viewer's role in a booking.
 * For Service Request bookings (per spec):
 *   - the user who creates the booking  → Provider
 *   - the owner of the request          → Receiver
 * The backend uses `provider` and `receiver` fields directly on the booking
 * object, so we rely on those rather than re-deriving from the listing/request.
 */
export function getBookingRole(booking, currentUser) {
  if (!booking || !currentUser) return null
  const userId = currentUser._id ?? currentUser.id
  const providerId =
    booking.provider?._id ?? booking.provider?.id ?? booking.provider
  const receiverId =
    booking.receiver?._id ?? booking.receiver?.id ?? booking.receiver
  if (userId === providerId) return 'provider'
  if (userId === receiverId) return 'receiver'
  return null
}

/**
 * Returns a flat object of boolean flags describing what the current user
 * can do with this booking right now.
 *
 * All permission rules come directly from the spec:
 *
 *   Pending   → provider: cancel        | receiver: accept, decline
 *   Accepted  → provider: meetingLink, cancel, confirm, dispute
 *               receiver: cancel, confirm, dispute
 *   Terminal  → read-only for everyone
 */
export function getBookingPermissions(booking, currentUser) {
  const role = getBookingRole(booking, currentUser)
  const status = booking?.status

  const none = {
    canAccept: false,
    canDecline: false,
    canCancel: false,
    canConfirm: false,
    canDispute: false,
    canAddMeetingLink: false,
    isProvider: false,
    isReceiver: false,
    role,
  }

  if (!role || !status) return none

  const isProvider = role === 'provider'
  const isReceiver = role === 'receiver'

  if (status === BOOKING_STATUS.PENDING) {
    const isRequestBooking = !!booking?.request

    return {
      ...none,
      isProvider,
      isReceiver,
      canCancel: isRequestBooking ? isProvider : isReceiver,
      canAccept: isRequestBooking ? isReceiver : isProvider,
      canDecline: isRequestBooking ? isReceiver : isProvider,
    }
  }

  if (status === BOOKING_STATUS.ACCEPTED) {
    return {
      ...none,
      isProvider,
      isReceiver,
      canCancel: true,
      canConfirm: true,
      canDispute: true,
      canAddMeetingLink: isProvider,
    }
  }

  // Terminal statuses → read-only
  return { ...none, isProvider, isReceiver }
}
