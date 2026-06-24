import { getAllSkillListings } from '../../api/posts'
import { applyRangeFilter } from '../../utils/applyRangeFilter'

export const fetchSkillListings = async ({
  keyword,
  category, // category _id (ObjectId string) — confirmed, NOT a slug or name
  isActive,
  hourlyRateGreaterThan,
  hourlyRateLessThan,
  averageRatingGreaterThan,
  createdAtGreaterThan,
  createdAtLessThan,
  page = 1,
  limit = 10,
  sort = '-averageRating', // confirmed value, img 9
  fields,
} = {}) => {
  const params = { page, limit, sort }
  if (keyword) params.keyword = keyword
  if (category) params.category = category
  if (isActive !== undefined) params.isActive = isActive // fixed: `false` was previously dropped (falsy check)
  if (fields) params.fields = fields

  applyRangeFilter(params, 'hourlyRate', hourlyRateGreaterThan, hourlyRateLessThan)
  applyRangeFilter(params, 'averageRating', averageRatingGreaterThan, undefined)
  applyRangeFilter(params, 'createdAt', createdAtGreaterThan, createdAtLessThan)

  return getAllSkillListings(params)
}
