// SignUp.jsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ThemeToggle from '../../common/ThemeToggle'
import ShowPassword from '../../common/ShowPassword'
import ErrorMessage from '../../common/ErrorMessage'
import useRegister from '../../../hooks/useRegister'
import { signupFormValidationSchema } from '../../../utils/validationSchema'
import { handleToastMessage } from '../../../utils/helper'
import OwlLogo from '../OwlLogo'

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordFocused, setPasswordFocused] = useState(false)
  const [submitHovered, setSubmitHovered] = useState(false)
  const { register: registerUser, isLoading, error } = useRegister()

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupFormValidationSchema),
    mode: 'onChange',
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
  })

  const onSubmit = async (formData) => {
    const result = await registerUser(formData)
    if (result.success) {
      navigate('/verifyCode', {
        state: { email: formData.email, from: 'signup' },
      })
    }
  }

  const onErrors = (fieldErrors) => {
    const firstError = Object.values(fieldErrors)[0]?.message
    if (firstError) handleToastMessage(firstError, 'warning')
  }

  const errorMessage =
    errors.password?.message ||
    errors.email?.message ||
    errors.name?.message ||
    errors.confirmPassword?.message ||
    ''

  return (
    <div className="min-h-screen m-auto w-full lg:w-5/6 bg-[var(--background-light)] flex flex-col transition-colors duration-300">
      <div className="flex justify-end p-4">
        <ThemeToggle />
      </div>
      <div className="flex-1 flex items-center justify-center p-4 pt-2">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 w-full max-w-6xl">
          {/* Form Column */}
          <div className="w-full lg:w-1/2 flex justify-center order-2 lg:order-1">
            <div
              style={{ backgroundColor: 'var(--whiteBackground)' }}
              className="relative w-full max-w-[480px] rounded-[24px] p-10 shadow-[0_10px_30px_rgba(0,0,0,0.04)] text-left transition-colors duration-300"
            >
              <form
                onSubmit={handleSubmit(onSubmit, onErrors)}
                className="space-y-6 mt-2"
              >
                <div>
                  <h2
                    style={{ color: 'var(--black-text)' }}
                    className="text-[26px] font-bold mb-2 tracking-tight"
                  >
                    Create Account
                  </h2>
                  <p
                    style={{ color: 'var(--gray-text)' }}
                    className="text-sm leading-relaxed"
                  >
                    Enter your details to create an account.
                  </p>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    style={{ color: 'var(--black-text)' }}
                    className="block text-sm font-semibold"
                  >
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Full Name"
                    disabled={isLoading}
                    {...register('name')}
                    style={{
                      color: 'var(--black-text)',
                      backgroundColor: 'var(--whiteBackground)',
                      borderColor: errors.name
                        ? 'var(--danger)'
                        : 'var(--gray-text)',
                    }}
                    className="w-full h-12 px-4 border rounded-xl outline-none transition-all focus:ring-4 focus:ring-blue-500/10 placeholder:text-slate-400"
                  />
                  {errors.name && (
                    <p
                      className="text-xs font-medium mt-1"
                      style={{ color: 'var(--danger)' }}
                    >
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    style={{ color: 'var(--black-text)' }}
                    className="block text-sm font-semibold"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    disabled={isLoading}
                    {...register('email')}
                    style={{
                      color: 'var(--black-text)',
                      backgroundColor: 'var(--whiteBackground)',
                      borderColor: errors.email
                        ? 'var(--danger)'
                        : 'var(--gray-text)',
                    }}
                    className="w-full h-12 px-4 border rounded-xl outline-none transition-all focus:ring-4 focus:ring-blue-500/10 placeholder:text-slate-400"
                  />
                  {errors.email && (
                    <p
                      className="text-xs font-medium mt-1"
                      style={{ color: 'var(--danger)' }}
                    >
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    style={{ color: 'var(--black-text)' }}
                    className="block text-sm font-semibold"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      disabled={isLoading}
                      onFocus={() => setPasswordFocused(true)}
                      onMouseOut={() => setPasswordFocused(false)}
                      onBlur={() => setPasswordFocused(false)}
                      {...register('password')}
                      style={{
                        color: 'var(--black-text)',
                        backgroundColor: 'var(--whiteBackground)',
                        borderColor: errors.password
                          ? 'var(--danger)'
                          : 'var(--gray-text)',
                      }}
                      className="w-full h-12 px-4 pr-12 border rounded-xl outline-none transition-all focus:ring-4 focus:ring-blue-500/10 placeholder:text-slate-400"
                    />
                    <ShowPassword
                      isVisible={showPassword}
                      toggleVisibility={() => setShowPassword(!showPassword)}
                    />
                  </div>
                  <ErrorMessage message={errors.password?.message} />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="confirmPassword"
                    style={{ color: 'var(--black-text)' }}
                    className="block text-sm font-semibold"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      onFocus={() => setPasswordFocused(true)}
                      onMouseOut={() => setPasswordFocused(false)}
                      onBlur={() => setPasswordFocused(false)}
                      placeholder="••••••••"
                      disabled={isLoading}
                      {...register('confirmPassword')}
                      style={{
                        color: 'var(--black-text)',
                        backgroundColor: 'var(--whiteBackground)',
                        borderColor: errors.confirmPassword
                          ? 'var(--danger)'
                          : 'var(--gray-text)',
                      }}
                      className="w-full h-12 px-4 pr-12 border rounded-xl outline-none transition-all focus:ring-4 focus:ring-blue-500/10 placeholder:text-slate-400"
                    />
                    <ShowPassword
                      isVisible={showConfirmPassword}
                      toggleVisibility={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    />
                  </div>
                  <ErrorMessage message={errors.confirmPassword?.message} />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  onMouseEnter={() => setSubmitHovered(true)}
                  onMouseLeave={() => setSubmitHovered(false)}
                  style={{ backgroundColor: 'var(--secondary-light)' }}
                  className="w-full py-3.5 text-white rounded-2xl font-semibold text-base cursor-pointer hover:opacity-90 transition-opacity disabled:opacity-50 mt-2"
                >
                  {isLoading ? 'Signing Up...' : 'Sign Up'}
                </button>

                <p
                  style={{ color: 'var(--gray-text)' }}
                  className="text-sm text-center mt-4"
                >
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => navigate('/signIn')}
                    style={{ color: 'var(--primary-light)' }}
                    className="font-semibold hover:underline cursor-pointer"
                  >
                    Sign In
                  </button>
                </p>
              </form>
            </div>
          </div>

          {/* Owl Column */}
          <div className="w-full lg:w-1/2 justify-center text-center order-1 lg:order-2">
            <OwlLogo
              errorMessage={errorMessage}
              passwordFocused={passwordFocused}
              submitHovered={submitHovered}
            />
            <h2 className="text-6xl font-extrabold tracking-wider bg-gradient-to-r from-[var(--primary-light)] to-[var(--secondary-light)] bg-clip-text text-transparent">
              Badilni
            </h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
