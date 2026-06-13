import { logoutRequest } from '../../api/authApi'

export const logout = async () => {
  try {
    return await logoutRequest()
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || 'Failed to sign out.'
    throw new Error(message)
  }
}
