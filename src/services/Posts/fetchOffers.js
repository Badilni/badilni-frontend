import { getAllSkillListings } from '../../api/posts'
import { applyRangeFilter } from '../../utils/applyRangeFilter'

/**
 * Builds query params exactly as the backend expects (see spec section 3):
 * keyword, category, isActive, hourlyRate[gte|lte], averageRating[gte],
 * createdAt[gte|lte], page, limit, sort, fields.
 *
 * `sort=-averageRating` is the only sort value directly confirmed by
 * Postman (img 9). Other sort values are plausible but UNCONFIRMED —
 * verify the backend's allowed sort fields before relying on them.
 */
export const fetchOffers = async ({
  keyword,
  category, // category _id (ObjectId string), not a slug or name
  isActive, // 'true' | 'false' | undefined ('' = no filter)
  hourlyRateGreaterThan,
  hourlyRateLessThan,
  averageRatingGreaterThan,
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
  if (isActive !== undefined && isActive !== '') params.isActive = isActive
  if (fields) params.fields = fields

  applyRangeFilter(
    params,
    'hourlyRate',
    hourlyRateGreaterThan,
    hourlyRateLessThan
  )
  applyRangeFilter(params, 'averageRating', averageRatingGreaterThan, undefined)
  applyRangeFilter(params, 'createdAt', createdAtGreaterThan, createdAtLessThan)

  return getAllSkillListings(params)
}
