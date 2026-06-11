import { useState } from 'react'
import axios from 'axios'
import { serverBaseUrl } from '../utils/constants'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { handleToastMessage } from '../utils/helper'

const emailSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Please enter your email address.' })
    .email({
      message: 'Please enter a valid email address (e.g., name@example.com).',
    }),
})

export const useForgotPassword = (onNext) => {
  const [isLoading, setIsLoading] = useState(false)
  const [serverError, setServerError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(emailSchema),
    mode: 'onChange',
    defaultValues: { email: '' },
  })

  const onSubmit = async (data) => {
    setServerError('')
    setSuccessMessage('')
    setIsLoading(true)

    const typedEmail = data.email.trim()

    try {
      console.log(
        '📤 Sending Request to:',
        `${serverBaseUrl}/auth/forgot-password`
      )
      console.log('📤 With Data:', { email: typedEmail })

      const response = await axios.post(
        `${serverBaseUrl}/auth/forgot-password`,
        { email: typedEmail },
        { headers: { 'Content-Type': 'application/json' } }
      )

      console.log('📨 Full Server Response Data:', response.data)

      if (response.status === 200) {
        const success = 'Verification code sent successfully!'
        setSuccessMessage(success)
        handleToastMessage(success, 'success')

        setTimeout(() => {
          if (typeof onNext === 'function') {
            onNext(typedEmail)
          }
        }, 1000)
      } else {
        const errorMsg = response.data?.message || 'Failed to send code.'
        setServerError(errorMsg)
        handleToastMessage(errorMsg, 'error')
      }
    } catch (err) {
      console.error('❌ API Error Detail:', err.response?.data || err.message)

      const errorMsg =
        err.response?.data?.message ||
        'Something went wrong. Please check your network.'
      setServerError(errorMsg)
      handleToastMessage(errorMsg, 'error')
    } finally {
      setIsLoading(false)
    }
  }

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isLoading,
    serverError,
    successMessage,
  }
}
