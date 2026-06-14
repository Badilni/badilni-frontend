import { loginRequest } from '../../api/authApi'

export const login = async (email, password) => {
  try {
    return await loginRequest(email, password)
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.response?.data ||
      error.message ||
      'Failed to sign in.'
    throw new Error(message)
  }
}
