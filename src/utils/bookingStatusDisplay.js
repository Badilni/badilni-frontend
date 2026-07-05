import { BOOKING_STATUS } from './bookingStatus'

const CONFIG = {
  [BOOKING_STATUS.PENDING]: {
    label: 'Pending',
    classes: 'bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400',
  },
  [BOOKING_STATUS.ACCEPTED]: {
    label: 'Accepted',
    classes: 'bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400',
  },
  [BOOKING_STATUS.DECLINED]: {
    label: 'Declined',
    classes: 'bg-red-100 text-red-600 dark:bg-red-950/50 dark:text-red-400',
  },
  [BOOKING_STATUS.CANCELLED]: {
    label: 'Cancelled',
    classes: 'bg-gray-100 text-gray-500 dark:bg-slate-800 dark:text-gray-400',
  },
  [BOOKING_STATUS.COMPLETED]: {
    label: 'Completed',
    classes: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400',
  },
  [BOOKING_STATUS.DISPUTED]: {
    label: 'Disputed',
    classes: 'bg-orange-100 text-orange-700 dark:bg-orange-950/50 dark:text-orange-400',
  },
}

export function getStatusConfig(status) {
  return CONFIG[status] ?? { label: status ?? 'Unknown', classes: 'bg-gray-100 text-gray-500' }
}