import { getStatusConfig } from '../../utils/bookingStatusDisplay'

export default function BookingStatusBadge({ status, className = '' }) {
  const { label, classes } = getStatusConfig(status)
  return (
    <span
      className={`text-xs font-bold px-3 py-1 rounded-full ${classes} ${className}`}
    >
      {label}
    </span>
  )
}
