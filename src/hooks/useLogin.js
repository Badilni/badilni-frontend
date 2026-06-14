/**
 * src/hooks/useLogin.js
 *
 * What changed vs the original:
 *  - All localStorage / token storage code is deleted (not commented out).
 *  - After a successful login, user data goes into the Zustand store via
 *    setUser() — the only "persistence" we do in JS.
 *  - Zod validation, loading state, error state, and toasts are preserved.
 */

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signinFormValidationSchema } from '../utils/validationSchema'
import { login as loginService } from '../services/authentication/login'
import { handleToastMessage } from '../utils/helper'
import useAuthStore from '../store/authStore'

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const setUser = useAuthStore((s) => s.setUser)
  const navigate = useNavigate()

  const login = async (email, password) => {
    setError('')

    // ── Zod validation ────────────────────────────────────────────────────
    const validation = signinFormValidationSchema.safeParse({ email, password })
    if (!validation.success) {
      const msg = validation.error.errors[0]?.message || 'Invalid input.'
      setError(msg)
      handleToastMessage(msg, 'warning')
      return { success: false, error: msg }
    }

    setIsLoading(true)

    try {
      const userData = await loginService(email, password)

      // Write user to Zustand. No token. No localStorage.
      setUser(userData?.data?.user ?? userData?.user ?? userData)

      handleToastMessage('Signed in successfully', 'success')
      // navigate('/profile', { replace: true })

      return { success: true, data: userData }
    } catch (err) {
      const msg = err.message || 'Something went wrong. Please try again.'
      setError(msg)
      handleToastMessage(msg, 'error')
      return { success: false, error: msg }
    } finally {
      setIsLoading(false)
    }
  }

  return { login, isLoading, error, setError }
}

export default useLogin
