import { useState, useRef, useEffect } from 'react'
import { z } from 'zod'
import { resendCode } from '../services/authentication'
import { handleToastMessage } from '../utils/helper'

const verificationCodeSchema = z
  .array(
    z
      .string()
      .length(1, { message: 'Each field must have exactly 1 character.' })
      .regex(/^[a-zA-Z0-9]$/, {
        message: 'Only alphanumeric characters are allowed.',
      })
  )
  .length(6, { message: 'Please enter the complete 6-character code.' })

export const useVerificationCode = (onNext, email = '') => {
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const inputRefs = useRef([])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleChange = (element, index) => {
    const value = element.value.slice(-1)

    if (value === '') {
      let newCode = [...code]
      newCode[index] = ''
      setCode(newCode)
      return
    }

    const alphanumericRegex = /^[a-zA-Z0-9]$/
    if (!alphanumericRegex.test(value)) {
      return
    }

    let newCode = [...code]
    newCode[index] = value.toUpperCase()
    setCode(newCode)

    if (index < 5) {
      setTimeout(() => {
        inputRefs.current[index + 1]?.focus()
      }, 10)
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      setTimeout(() => {
        inputRefs.current[index - 1]?.focus()
      }, 10)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    const result = verificationCodeSchema.safeParse(code)

    if (!result.success) {
      setError(result.error.errors[0].message)
      return
    }

    const finalCode = code.join('')
    if (typeof onNext === 'function') {
      onNext(finalCode)
    }
  }

  const handleResend = async () => {
    setError('')
    if (!email) {
      const msg = 'Email not provided for resending code.'
      setError(msg)
      handleToastMessage(msg, 'error')
      return
    }

    try {
      await resendCode(email)
      handleToastMessage(
        'A new code has been sent to your email! 📩',
        'success'
      )
    } catch (err) {
      const errorMessage =
        err.message || 'Failed to resend code. Please try again.'
      setError(errorMessage)
      handleToastMessage(errorMessage, 'error')
    }
  }

  return {
    code,
    isLoading,
    error,
    inputRefs,
    handleChange,
    handleKeyDown,
    handleSubmit,
    handleResend,
  }
}
