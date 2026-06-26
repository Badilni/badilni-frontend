import api from '../../api/axios'

export const verifyChangedEmail = async (code) => {
  const response = await api.post('/auth/me/email/verify', { code })
  return response.data
}

export const resetUserEmail = async (data) => {
  const requestBody = {
    currentPassword: data.currentPassword,
    newEmail: data.newEmail,
  }

  const response = await api.patch('/auth/me/email', requestBody)

  return response.data
}
