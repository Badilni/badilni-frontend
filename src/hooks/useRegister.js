//useRegister.js
import { useState } from 'react'
import { signupFormValidationSchema } from '../utils/validationSchema'
import { register as registerUser } from '../services/authentication'
import { handleToastMessage } from '../utils/helper'

const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const register = async (formData) => {
    setIsLoading(true)
    setError(null)

    try {
      signupFormValidationSchema.parse(formData)
    } catch (validationError) {
      const errorMessages = validationError.errors
        ?.map((issue) => issue.message)
        .filter(Boolean)

      const message =
        errorMessages?.length > 0
          ? errorMessages.join(' ')
          : 'Please fill in all fields.'

      setError(message)
      errorMessages?.forEach((msg) => handleToastMessage(msg, 'warning'))
      setIsLoading(false)
      return { success: false, error: message }
    }

    try {
      const response = await registerUser(formData)
      setIsLoading(false)
      handleToastMessage('Account created successfully!', 'success')
      return { success: true, data: response }
    } catch (apiError) {
      const message = apiError.message || 'Signup failed. Please try again.'
      setError(message)
      handleToastMessage(message, 'error')
      setIsLoading(false)
      return { success: false, error: message }
    }
  }

  return { register, isLoading, error }
}

export default useRegister
