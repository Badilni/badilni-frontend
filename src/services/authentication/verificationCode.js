import axios from 'axios'
import { serverBaseUrl } from '../../utils/constants'

export const resendCode = async (email) => {
  try {
    const response = await axios.post(
      `${serverBaseUrl}/auth/resend-verification`,
      {
        email,
      }
    )
    return response.data
  } catch (error) {
    const serverMessage =
      error.response?.data?.message || error.message || 'Failed to resend code.'
    throw new Error(serverMessage)
  }
}

export const verifyCode = async (email, code, purpose = 'signup') => {
  try {
    const response = await axios.post(`${serverBaseUrl}/auth/verify-email`, {
      email,
      code,
      purpose,
    })
    return response.data
  } catch (error) {
    const serverMessage =
      error.response?.data?.message || error.message || 'Verification failed.'
    throw new Error(serverMessage)
  }
}

export default { resendCode, verifyCode }
