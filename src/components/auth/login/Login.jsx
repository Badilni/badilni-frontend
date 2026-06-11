// Login.jsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import ThemeToggle from '../../common/ThemeToggle'
import ShowPassword from '../../common/ShowPassword'
import ErrorMessage from '../../common/ErrorMessage'
import useLogin from '../../../hooks/useLogin'
import { signinFormValidationSchema } from '../../../utils/validationSchema'
import { handleToastMessage } from '../../../utils/helper'
import OwlLogo from '../OwlLogo'

const Login = ({ onBack, onSuccess, onForgotPassword, onSignUp }) => {
  const [showPassword, setShowPassword] = useState(false)
  const [passwordFocused, setPasswordFocused] = useState(false)
  const [submitHovered, setSubmitHovered] = useState(false)
  const { login, isLoading, error } = useLogin()
  const navigate = useNavigate()

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    resolver: zodResolver(signinFormValidationSchema),
    mode: 'onChange',
    defaultValues: { email: '', password: '' },
  })

  const handleBack = () => {
    if (onBack) onBack()
    else navigate(-1)
  }

  const handleForgotPassword = () => {
    if (onForgotPassword) onForgotPassword()
    else navigate('/forgetPass')
  }

  const handleSignUpClick = () => {
    if (onSignUp) onSignUp()
    else navigate('/signUp')
  }

  const onSubmit = async (data) => {
    const result = await login(data.email, data.password)
    if (result.success) {
      if (onSuccess) onSuccess(result.data)
      else navigate('/')
    }
  }

  const onErrors = (fieldErrors) => {
    const firstError = Object.values(fieldErrors)[0]?.message
    if (firstError) handleToastMessage(firstError, 'warning')
  }
  const errorMessage = Object.values(errors)[0]?.message

  return (
    <div className="min-h-screen w-full bg-[var(--background-light)] flex flex-col transition-colors duration-300">
      <header className="w-full max-w-7xl mx-auto flex justify-between items-center p-4 lg:px-8">
        <h2 className="text-3xl font-extrabold tracking-wider bg-gradient-to-r from-[var(--primary-light)] to-[var(--secondary-light)] bg-clip-text text-transparent">
          Badilni
        </h2>
        <ThemeToggle />
      </header>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 w-full max-w-6xl">
          {/* Form Column */}
          <div className="w-full lg:w-1/2 flex justify-center order-2 lg:order-1">
            <div
              style={{ backgroundColor: 'var(--whiteBackground)' }}
              className="relative w-full max-w-[480px] rounded-[24px] p-10 shadow-[0_10px_30px_rgba(0,0,0,0.04)] text-left transition-colors duration-300"
            >
              <button
                type="button"
                onClick={handleBack}
                style={{
                  borderColor: 'var(--gray-text)',
                  backgroundColor: 'var(--whiteBackground)',
                }}
                className="absolute top-[35px] left-[35px] w-10 h-10 rounded-full border flex items-center justify-center cursor-pointer opacity-80 hover:opacity-100 transition-all"
              >
                <IoIosArrowRoundBack
                  style={{ color: 'var(--secondary-light)' }}
                  size={28}
                />
              </button>

              <form
                onSubmit={handleSubmit(onSubmit, onErrors)}
                className="space-y-6 mt-12"
              >
                <div>
                  <h2
                    style={{ color: 'var(--black-text)' }}
                    className="text-[26px] font-bold mb-2 tracking-tight"
                  >
                    Sign In
                  </h2>
                  <p
                    style={{ color: 'var(--gray-text)' }}
                    className="text-sm leading-relaxed"
                  >
                    Please enter your details to sign in to your account.
                  </p>
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
                  <div className="flex justify-between items-center">
                    <label
                      htmlFor="password"
                      style={{ color: 'var(--black-text)' }}
                      className="block text-sm font-semibold"
                    >
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={handleForgotPassword}
                      style={{ color: 'var(--primary-light)' }}
                      className="text-xs font-semibold hover:underline cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      disabled={isLoading}
                      onFocus={() => setPasswordFocused(true)}
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

                {error && <ErrorMessage message={error} />}

                <button
                  type="submit"
                  disabled={isLoading}
                  onMouseEnter={() => setSubmitHovered(true)}
                  onMouseLeave={() => setSubmitHovered(false)}
                  style={{ backgroundColor: 'var(--secondary-light)' }}
                  className="w-full py-3.5 text-white rounded-2xl font-semibold text-base cursor-pointer hover:opacity-90 transition-opacity disabled:opacity-50 mt-2"
                >
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </button>

                <p
                  style={{ color: 'var(--gray-text)' }}
                  className="text-sm text-center mt-4"
                >
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={handleSignUpClick}
                    style={{ color: 'var(--primary-light)' }}
                    className="font-semibold hover:underline cursor-pointer"
                  >
                    Sign Up
                  </button>
                </p>
              </form>
            </div>
          </div>

          {/* Owl Column */}
          <div className="w-full lg:w-1/2 flex justify-center order-1 lg:order-2">
            <OwlLogo
              errorMessage={errorMessage}
              passwordFocused={passwordFocused}
              submitHovered={submitHovered}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
