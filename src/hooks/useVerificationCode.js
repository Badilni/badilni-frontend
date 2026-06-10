import { useState, useRef } from 'react'
import { handleToastMessage } from '../utils/helper'
import { resendCode } from '../services/authentication/ForgotPasswordAuth/forgotPassword'
import { resetPasswordValidationSchema, verificationCodeSchema } from '../utils/validationSchema'

export const useCombinedResetPassword = (email) => {
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const inputRefs = useRef([])
  const passwordCriteria = {
    hasMinLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
  }

  const isPasswordMismatched = password && confirmPassword && password !== confirmPassword

  const handleChange = (target, index) => {
    const value = target.value.slice(-1)

    if (value === '') {
      let newCode = [...code]
      newCode[index] = ''
      setCode(newCode)
      return
    }

    if (!/^[a-zA-Z0-9]$/.test(value)) return

    let newCode = [...code]
    newCode[index] = value.toUpperCase()
    setCode(newCode)

    if (index < 5) {
      setTimeout(() => inputRefs.current[index + 1]?.focus(), 10)
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      setTimeout(() => inputRefs.current[index - 1]?.focus(), 10)
    }
  }

  const handleResend = async () => {
    if (!email) {
      handleToastMessage('Email is required to resend code.', 'warning')
      return
    }
    try {
      await resendCode(email)
      handleToastMessage('A new code has been sent! 📩', 'success')
    } catch (err) {
      handleToastMessage(err.response?.data?.message || 'Failed to resend code.', 'error')
    }
  }

  const validateForm = () => {
    const codeResult = verificationCodeSchema.safeParse(code)
    if (!codeResult.success) {
      setError('Please enter the complete 6-digit verification code.')
      return false
    }

    const passwordResult = resetPasswordValidationSchema.safeParse({
      password,
      confirmPassword,
    })
    if (!passwordResult.success) {
      setError(passwordResult.error.errors[0].message)
      return false
    }

    return true
  }

  return {
    code,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    isLoading,
    setIsLoading,
    error,
    setError,
    inputRefs,
    passwordCriteria,
    isPasswordMismatched,
    handleChange,
    handleKeyDown,
    handleResend,
    validateForm,
  }
}
