import { useState } from 'react'
import axios from 'axios'
import { serverBaseUrl } from '../utils/constants'
import { handleToastMessage } from '../utils/helper'

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const login = async (email, password) => {
    setError('')

    if (!email || !password) {
      const errMsg = 'Please fill in all fields'
      setError(errMsg)
      handleToastMessage(errMsg, 'warning')
      return { success: false, error: errMsg }
    }

    if (password.length < 8) {
      const errMsg = 'Password must be at least 8 characters long'
      setError(errMsg)
      handleToastMessage(errMsg, 'warning')
      return { success: false, error: errMsg }
    }

    setIsLoading(true)

    try {
      const response = await axios.post(`${serverBaseUrl}/auth/login`, {
        email: email,
        password: password,
      })

      if (response.status === 200 || response.status === 201) {
        const userData = response.data

        // Save access token if present
        if (userData.accessToken) {
          localStorage.setItem('token', userData.accessToken)
        }

        // Save user details in 'user' key as expected by RequireAuth
        const userObj = userData.data?.user || userData
        localStorage.setItem('user', JSON.stringify(userObj))

        handleToastMessage('Signed in successfully', 'success')
        return { success: true, data: userData }
      }

      const errMsg = 'Failed to sign in. Please check your credentials.'
      setError(errMsg)
      return { success: false, error: errMsg }
    } catch (err) {
      console.log('useLogin Hook Error:', err.response)
      const errorMessage =
        err.response?.data?.message || 'Something went wrong. Please try again.'
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
