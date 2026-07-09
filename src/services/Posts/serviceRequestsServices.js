import { getAllServiceRequests } from '../../api/posts'
import { applyRangeFilter } from '../../utils/applyRangeFilter'

export const fetchServiceRequests = async ({
  keyword,
  smartSearch, // AI-powered search — mutually exclusive with keyword; takes priority when set
  category,
  status,
  creditsOfferedGreaterThan,
  creditsOfferedLessThan,
  createdAtGreaterThan,
  createdAtLessThan,
  page = 1,
  limit = 10,
  sort = '-averageRating',
  fields,
} = {}) => {
  const params = { page, limit, sort }
  // smartSearch and keyword are mutually exclusive — smartSearch takes priority
  if (smartSearch) params.smartSearch = smartSearch
  else if (keyword) params.keyword = keyword
  if (category) params.category = category
  if (status) params.status = status
  if (fields) params.fields = fields

  applyRangeFilter(params, 'creditsOffered', creditsOfferedGreaterThan, creditsOfferedLessThan)
  applyRangeFilter(params, 'createdAt', createdAtGreaterThan, createdAtLessThan)

  return getAllServiceRequests(params)
}