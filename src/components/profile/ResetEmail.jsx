import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../common/Button'
import HeadPasswordReset from '../common/HeadPasswordReset'
import { useResetEmail } from '../../hooks/Profile/useResetEmail'
import { handleToastMessage } from '../../utils/helper'
import ShowPassword from '../common/ShowPassword'

const ResetEmail = () => {
  const { sendResetEmailRequest, isLoading } = useResetEmail()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: { currentPassword: '', newEmail: '' },
  })

  const onSubmit = async (formData) => {
    const result = await sendResetEmailRequest(formData)

    if (result.success) {
      navigate('/verify-changed-email', {
        state: {
          email: formData.newEmail,
          currentPassword: formData.currentPassword
        },
      })
    }
  }

  const onErrors = (fieldErrors) => {
    const firstError = Object.values(fieldErrors)[0]?.message
    if (firstError) handleToastMessage(firstError, 'warning')
  }

  return (
    <div
      style={{ backgroundColor: 'var(--background-light)' }}
      className="min-h-screen w-full flex flex-col items-center justify-center p-6 transition-colors duration-300"
    >
      <div className="w-full max-w-[480px] flex flex-col gap-2">
        <HeadPasswordReset />

        <div
          style={{ backgroundColor: 'var(--whiteBackground)' }}
          className="relative w-full rounded-[24px] p-10 shadow-[0_10px_30px_rgba(0,0,0,0.04)] text-left transition-colors duration-300"
        >
          <form
            onSubmit={handleSubmit(onSubmit, onErrors)}
            className="space-y-5 mt-2"
          >
            <div>
              <h2
                style={{ color: 'var(--black-text)' }}
                className="text-[26px] font-bold mb-2 tracking-tight transition-colors"
              >
                Change Email Address
              </h2>
              <p
                style={{ color: 'var(--gray-text)' }}
                className="text-sm leading-relaxed transition-colors"
              >
                Enter your current password and the **new email address** you want to use. We will send a 6-digit verification code to the new email.
              </p>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="currentPassword"
                style={{ color: 'var(--black-text)' }}
                className="block text-sm font-semibold transition-colors"
              >
                Current Password
              </label>

              <div className="relative">
                <input
                  id="currentPassword"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  disabled={isLoading}
                  {...register('currentPassword', { required: 'Current password is required' })}
                  style={{
                    color: 'var(--black-text)',
                    backgroundColor: 'var(--whiteBackground)',
                    borderColor: errors.currentPassword ? 'var(--danger)' : 'var(--gray-text)',
                  }}
                  className="w-full h-12 px-4 pr-12 border rounded-xl outline-none transition-all focus:ring-4 focus:ring-blue-500/10 placeholder:text-slate-400"
                />
                <ShowPassword
                  isVisible={showPassword}
                  toggleVisibility={() => setShowPassword(!showPassword)}
                />
              </div>

              {errors.currentPassword && (
                <p
                  className="text-xs font-medium mt-1"
                  style={{ color: 'var(--danger)' }}
                >
                  {errors.currentPassword.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="newEmail"
                style={{ color: 'var(--black-text)' }}
                className="block text-sm font-semibold transition-colors"
              >
                New Email Address
              </label>
              <input
                id="newEmail"
                type="email"
                placeholder="new-email@gmail.com"
                disabled={isLoading}
                {...register('newEmail', { required: 'New email address is required' })}
                style={{
                  color: 'var(--black-text)',
                  backgroundColor: 'var(--whiteBackground)',
                  borderColor: errors.newEmail ? 'var(--danger)' : 'var(--gray-text)',
                }}
                className="w-full h-12 px-4 border rounded-xl outline-none transition-all focus:ring-4 focus:ring-blue-500/10 placeholder:text-slate-400"
              />
              {errors.newEmail && (
                <p
                  className="text-xs font-medium mt-1"
                  style={{ color: 'var(--danger)' }}
                >
                  {errors.newEmail.message}
                </p>
              )}
            </div>

            <Button
              className="w-full py-3.5 text-white rounded-2xl font-semibold text-base cursor-pointer hover:opacity-90 transition-opacity disabled:opacity-50 mt-2"
              variant="primary"
              size="lg"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Sending Code...' : 'Send Verification Code'}
            </Button>

            <p
              style={{ color: 'var(--gray-text)' }}
              className="text-sm text-center mt-1"
            >
              Back to{' '}
              <button
                type="button"
                onClick={() => navigate('/profile')}
                style={{ color: 'var(--primary-light)' }}
                className="font-semibold hover:underline cursor-pointer"
              >
                Profile
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ResetEmail
