import axios from 'axios'
import { serverBaseUrl } from '../../utils/constants'

export const login = async ({ email, password }) => {
  try {
    const response = await axios.post(
      `${serverBaseUrl}/auth/login`,
      { email, password },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    return response.data
  } catch (error) {
    const serverMessage =
      error.response?.data?.message ||
      error.response?.data ||
      error.message ||
      'Failed to sign in.'
    throw new Error(serverMessage)
  }
}
