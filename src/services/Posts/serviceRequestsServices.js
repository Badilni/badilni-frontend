import { getAllServiceRequests } from '../../api/posts'
import { applyRangeFilter } from '../../utils/applyRangeFilter'

/**
 * `sort=-averageRating` is the only sort value directly confirmed by
 * Postman (img 4). '-createdAt' / 'creditsOffered' / 'deadline' are
 * plausible but UNCONFIRMED — verify against the backend's allowed sort
 * fields before relying on them.
 */
export const fetchServiceRequests = async ({
  keyword,
  category, // category _id (ObjectId string) — confirmed, NOT a slug or name
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
