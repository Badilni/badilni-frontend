import { getAllServiceRequests } from '../../api/posts'
import { applyRangeFilter } from '../../utils/applyRangeFilter'

export const fetchServiceRequests = async ({
  keyword,
  category, // category _id (ObjectId string) — confirmed, NOT a slug or name
  status,
  creditsOfferedGreaterThan,
  creditsOfferedLessThan,
  createdAtGreaterThan,
  createdAtLessThan,
  page = 1,
  limit = 9,
  sort = '-averageRating',
  fields,
} = {}) => {
  const params = { page, limit, sort }
  if (keyword) params.keyword = keyword
  if (category) params.category = category
  if (status) params.status = status
  if (fields) params.fields = fields

  applyRangeFilter(
    params,
    'creditsOffered',
    creditsOfferedGreaterThan,
    creditsOfferedLessThan
  )
  applyRangeFilter(params, 'createdAt', createdAtGreaterThan, createdAtLessThan)

  return getAllServiceRequests(params)
}
