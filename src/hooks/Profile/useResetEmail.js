// useResetEmail.js
import { useState } from 'react'
import { resetUserEmail } from '../../services/Profile/resetEmail'

import { handleToastMessage } from '../../utils/helper'

export const useResetEmail = () => {
  const [isLoading, setIsLoading] = useState(false)

  const sendResetEmailRequest = async (formData) => {
    setIsLoading(true)
    try {
      const data = await resetUserEmail(formData)

      handleToastMessage('Verification code sent to your new email!', 'success')
      return { success: true, data }

    } catch (error) {
      console.log('❌ Server Error Response:', error.response?.data)

      const errorMsg = error.response?.data?.message || 'Verification failed.'
      handleToastMessage(errorMsg, 'error')
      return { success: false, error: errorMsg }
    } finally {
      setIsLoading(false)
    }
  }

  return {
    sendResetEmailRequest,
    isLoading,
  }
}
