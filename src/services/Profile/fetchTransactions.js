import { getTransactions } from '../../api/transactions'
import { applyRangeFilter } from '../../utils/applyRangeFilter'

export const fetchTransactions = async ({
  type, // e.g. 'session_payment', 'welcome_bonus' — confirmed as a valid filter value, full allow-list unconfirmed
  createdAtGreaterThan,
  createdAtLessThan,
  page = 1,
  limit = 10,
} = {}) => {
  const params = { page, limit }
  if (type) params.type = type
  applyRangeFilter(params, 'createdAt', createdAtGreaterThan, createdAtLessThan)
  return getTransactions(params)
}
