import { getUsersRequest } from '../../api/authApi'

export const fetchUsersService = async ({
  keyword,
  page = 1,
  limit = 10,
  sort = 'averageRating',
}) => {
  try {
    const queryParams = new URLSearchParams()
    if (keyword) queryParams.append('keyword', keyword)
    if (page) queryParams.append('page', page)
    if (limit) queryParams.append('limit', limit)
    if (sort) queryParams.append('sort', sort)

    const response = await getUsersRequest(queryParams)
    return response
  } catch (error) {
    console.error(
      'Error inside fetchUsersService:',
      error.response?.data || error.message
    )
    throw error
  }
}
