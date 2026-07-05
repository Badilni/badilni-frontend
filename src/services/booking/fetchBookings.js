import { getBookings } from '../../api/posts'

export const fetchBookings = ({ type, status, page = 1, limit = 10 } = {}) => {
  const params = { page, limit }
  if (type) params.type = type
  if (status) params.status = status
  return getBookings(params)
}