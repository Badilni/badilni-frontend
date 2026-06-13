import { getMeRequest } from '../../api/authApi'

export const getMe = async () => {
  try {
    const data = await getMeRequest()
    return data?.data?.user ?? data?.user ?? data
  } catch (error) {
    if (error.response?.status === 401) return null
    throw error
  }
}
