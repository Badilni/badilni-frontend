import axios from 'axios'
import { serverBaseUrl } from '../../utils/constants'

export const register = async (user) => {
  try {
    console.log('Registering user with data:', user)
    const response = await axios.post(`${serverBaseUrl}/auth/signup`, user, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    return response.data
  } catch (error) {
    const serverMessage =
      error.response?.data?.message ||
      error.response?.data ||
      error.message ||
      'Failed to register.'
    throw new Error(serverMessage)
  }
}
