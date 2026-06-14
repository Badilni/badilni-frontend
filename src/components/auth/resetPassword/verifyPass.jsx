import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Spinner from '../../common/Spinner'
import { IoIosArrowRoundBack } from 'react-icons/io'
import Button from '../../common/Button'
import ShowPassword from '../../common/ShowPassword'
import ErrorMessage from '../../common/ErrorMessage'
import HeadPasswordReset from '../../common/HeadPasswordReset'
import { useCombinedResetPassword } from '../../../hooks/useVerificationCode'
import { resetPasswordSubmitService } from '../../../services/authentication/ForgotPasswordAuth/forgotPassword'
import { resetPasswordValidationSchema } from '../../../utils/validationSchema'
import { handleToastMessage } from '../../../utils/helper'

export const CombinedPasswordReset = ({ onBack, email = '', onSuccess }) => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isFinalSubmitting, setIsFinalSubmitting] = useState(false)

  const {
    register,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordValidationSchema),
    mode: 'onChange',
  })

  // Watch RHF values so we can sync them into the hook's state
  const watchedPassword = watch('password')
  const watchedConfirmPassword = watch('confirmPassword')

  const {
    code,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    isLoading: isCodeLoading,
    error: combinedError,
    setError: setCombinedError,
    inputRefs,
    passwordCriteria,
    isPasswordMismatched,
    handleChange,
    handleKeyDown,
    handleResend,
    validateForm,
  } = useCombinedResetPassword(email)

  // Sync RHF values → hook state so validateForm() and isPasswordMismatched work correctly
  useEffect(() => {
    if (watchedPassword !== undefined) setPassword(watchedPassword)
  }, [watchedPassword])

  useEffect(() => {
    if (watchedConfirmPassword !== undefined)
      setConfirmPassword(watchedConfirmPassword)
  }, [watchedConfirmPassword])

  const handleFinalSubmit = async (e) => {
    e.preventDefault()
    setCombinedError('')

    if (!validateForm()) return

    setIsFinalSubmitting(true)
    try {
      const finalCode = code.join('')

      await resetPasswordSubmitService(
        email,
        finalCode,
        password,
        confirmPassword
      )

      handleToastMessage('Password reset successfully!', 'success')

      if (typeof onSuccess === 'function') onSuccess()
    } catch (err) {
      const backendError =
        err.response?.data?.errors?.[0]?.message || err.response?.data?.message
      const finalError =
        backendError || 'Failed to reset password. Please try again.'
      setCombinedError(finalError)
      handleToastMessage(finalError, 'error')
    } finally {
      setIsFinalSubmitting(false)
    }
  }

  if (isCodeLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-[var(--background-light)]">
        <div className="text-[var(--secondary-light)]">
          <Spinner size="lg" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 transition-colors duration-300 gap-6 relative bg-[var(--background-light)]">
      <HeadPasswordReset />
      <form
        onSubmit={handleFinalSubmit}
        className="relative w-full max-w-[520px] flex flex-col gap-8 rounded-[24px] p-6 md:p-10 shadow-[0_10px_30px_rgba(0,0,0,0.04)] text-left transition-colors duration-300 bg-[var(--whiteBackground)]"
      >
        <button
          type="button"
          onClick={onBack}
          className="absolute top-[25px] left-[25px] w-10 h-10 rounded-full border flex items-center justify-center cursor-pointer opacity-80 hover:opacity-100 transition-all border-[var(--gray-text)] bg-[var(--whiteBackground)] z-10"
        >
          <IoIosArrowRoundBack
            className="text-[var(--secondary-light)]"
            size={28}
          />
        </button>

        <div className="space-y-4 mt-8">
          <div>
            <h2 className="text-[24px] font-bold mb-1 tracking-tight text-[var(--black-text)]">
              1. Verification Code
            </h2>
            <p className="text-sm leading-relaxed text-[var(--gray-text)]">
              Enter the 6-digit security code sent to your email.
            </p>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-semibold text-[var(--black-text)]">
              Verification Code
            </label>
            <div className="flex justify-between gap-2">
              {code.map((num, index) => (
                <input
                  key={index}
                  type="text"
                  value={num}
                  ref={(el) => (inputRefs.current[index] = el)}
                  onChange={(e) => handleChange(e.target, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  autoFocus={index === 0}
                  autoComplete="one-time-code"
                  className="w-[45px] h-12 text-center text-xl font-bold border rounded-xl outline-none focus:ring-4 focus:ring-blue-500/10 uppercase border-[var(--gray-text)] bg-[var(--whiteBackground)] text-[var(--black-text)]"
                />
              ))}
            </div>
          </div>

          <div className="text-sm text-[var(--gray-text)] pt-1">
            Didn't get the code?{' '}
            <span
              onClick={handleResend}
              className="font-semibold cursor-pointer hover:underline text-[var(--secondary-light)]"
            >
              Resend Code
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="text-[24px] font-bold mb-1 tracking-tight text-[var(--black-text)]">
              2. New Password
            </h2>
            <p className="text-sm leading-relaxed text-[var(--gray-text)]">
              Enter and confirm your new strong password.
            </p>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-[var(--black-text)]">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                {...register('password')}
                style={{
                  color: 'var(--black-text)',
                  backgroundColor: 'var(--whiteBackground)',
                  borderColor: errors.password
                    ? 'var(--danger)'
                    : 'var(--gray-text)',
                }}
                autoComplete="new-password"
                className="w-full h-12 px-4 pr-12 border rounded-xl outline-none focus:ring-4 focus:ring-blue-500/10 text-[var(--black-text)] bg-[var(--whiteBackground)] border-[var(--gray-text)]"
              />
              <ShowPassword
                isVisible={showPassword}
                toggleVisibility={() => setShowPassword(!showPassword)}
              />
            </div>
            <ErrorMessage message={errors.password?.message} />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-[var(--black-text)]">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="••••••••"
                {...register('confirmPassword')}
                style={{
                  color: 'var(--black-text)',
                  backgroundColor: 'var(--whiteBackground)',
                  borderColor: errors.confirmPassword
                    ? 'var(--danger)'
                    : 'var(--gray-text)',
                }}
                autoComplete="new-password"
                className="w-full h-12 px-4 pr-12 border rounded-xl outline-none focus:ring-4 focus:ring-blue-500/10 text-[var(--black-text)] bg-[var(--whiteBackground)] border-[var(--gray-text)]"
              />
              <ShowPassword
                isVisible={showConfirmPassword}
                toggleVisibility={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              />
            </div>

            {isPasswordMismatched && (
              <ErrorMessage message="Passwords do not match yet." />
            )}
            <ErrorMessage message={errors.confirmPassword?.message} />
          </div>

          <Button
            variant="primary"
            size="lg"
            type="submit"
            disabled={isFinalSubmitting}
            className="w-full py-3.5 text-white rounded-2xl font-semibold text-base mt-2"
          >
            {isFinalSubmitting
              ? 'Submitting Everything...'
              : 'Submit & Reset Password'}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default CombinedPasswordReset
