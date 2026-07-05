export const BOOKING_STATUS = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  DECLINED: 'declined',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
  DISPUTED: 'disputed',
}

/** Statuses where no further action is possible from either side. */
export const TERMINAL_STATUSES = new Set([
  BOOKING_STATUS.DECLINED,
  BOOKING_STATUS.CANCELLED,
  BOOKING_STATUS.COMPLETED,
  BOOKING_STATUS.DISPUTED,
])