// src/hooks/usePasswordReset.js
import { useState } from 'react'
import axios from 'axios'
import { z } from 'zod'

const passwordResetSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long.' })
      .regex(/[A-Z]/, {
        message: 'Password must contain at least one uppercase letter.',
      })
      .regex(/[a-z]/, {
        message: 'Password must contain at least one lowercase letter.',
      })
      .regex(/[0-9]/, {
        message: 'Password must contain at least one number.',
      }),
    confirmPassword: z
      .string()
      .min(1, { message: 'Please confirm your password.' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  })

export const usePasswordReset = (email, verificationCode, onSuccess) => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const passwordCriteria = {
    hasMinLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
  }

  const isPasswordMismatched =
    confirmPassword.length > 0 && password !== confirmPassword

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const validationResult = passwordResetSchema.safeParse({
      password,
      confirmPassword,
    })

    if (!validationResult.success) {
      const firstError =
        validationResult.error?.errors?.[0]?.message || 'Validation failed.'
      setError(firstError)
      return
    }

    if (!email || !verificationCode) {
      setError(
        'Session expired or missing data. Please start over from the email step.'
      )
      return
    }

    setIsLoading(true)

    try {
      const formattedCode = Array.isArray(verificationCode)
        ? verificationCode.join('')
        : verificationCode

      console.log('🚀 Sending FIXED Data to Backend:', {
        email,
        code: formattedCode,
        password,
        confirmPassword,
      })

      const response = await axios.patch(
        'http://localhost:3000/api/v1/auth/reset-password',
        {
          email: email,
          code: formattedCode,
          password: password,
          confirmPassword: confirmPassword,
        }
      )

      if (response.status === 200 || response.status === 201) {
        if (typeof onSuccess === 'function') {
          onSuccess()
        }
      }
    } catch (err) {
      console.log('Reset Password Error Details:', err.response?.data)

      const serverErrors = err.response?.data?.errors
      let msg = ''

      if (Array.isArray(serverErrors) && serverErrors.length > 0) {
        msg = serverErrors.map((e) => e.message || 'Invalid input').join(' | ')
      } else {
        msg =
          err.response?.data?.message ||
          'Something went wrong. Please try again.'
      }

      setError(msg)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    isLoading,
    error,
    handleSubmit,
    passwordCriteria,
    isPasswordMismatched,
  }
}
