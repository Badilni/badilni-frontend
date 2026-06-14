import axios from 'axios'
import { serverBaseUrl } from '../../../utils/constants'

export const forgotPasswordService = async (email) => {
  const response = await axios.post(
    `${serverBaseUrl}/auth/forgot-password`,
    { email },
    { headers: { 'Content-Type': 'application/json' } }
  )
  return response.data
}

export const resetPasswordSubmitService = async (
  email,
  code,
  password,
  confirmPassword
) => {
  const response = await axios.patch(
    `${serverBaseUrl}/auth/reset-password`,
    { email, code, password, confirmPassword },
    { headers: { 'Content-Type': 'application/json' } }
  )
  return response.data
}

export const resendCode = async (email) => {
  const response = await axios.post(
    `${serverBaseUrl}/auth/resend-verification`,
    { email },
    { headers: { 'Content-Type': 'application/json' } }
  )
  return response.data
}
