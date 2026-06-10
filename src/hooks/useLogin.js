import { useState } from 'react'
import { signinFormValidationSchema } from '../utils/validationSchema'
import { login as loginService } from '../services/authentication/login'
import { handleToastMessage } from '../utils/helper'

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const login = async (email, password) => {
    setError('')

    // Zod validation
    const validation = signinFormValidationSchema.safeParse({ email, password })
    if (!validation.success) {
      const firstError = validation.error.errors[0]?.message || 'Invalid input.'
      setError(firstError)
      handleToastMessage(firstError, 'warning')
      return { success: false, error: firstError }
    }

    setIsLoading(true)

    try {
      const userData = await loginService({ email, password })

      // Save access token if present
      if (userData.accessToken) {
        localStorage.setItem('token', userData.accessToken)
      }

      // Save user details in 'user' key as expected by RequireAuth
      const userObj = userData.data?.user || userData
      localStorage.setItem('user', JSON.stringify(userObj))

      handleToastMessage('Signed in successfully', 'success')
      return { success: true, data: userData }
    } catch (err) {
      console.log('useLogin Hook Error:', err)
      const errorMessage = err.message || 'Something went wrong. Please try again.'
      setError(errorMessage)
      handleToastMessage(errorMessage, 'error')
      return { success: false, error: errorMessage }
    } finally {
      setIsLoading(false)
    }
  }

  return { login, isLoading, error, setError }
}

export default useLogin
