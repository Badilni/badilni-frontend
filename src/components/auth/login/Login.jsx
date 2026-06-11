import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import { handleToastMessage } from '../../../utils/helper'
import ThemeToggle from '../../common/ThemeToggle'
import ShowPassword from '../../common/ShowPassword'
import ErrorMessage from '../../common/ErrorMessage'
import useLogin from '../../../hooks/useLogin'
import { signinFormValidationSchema } from '../../../utils/validationSchema'

const Login = ({ onBack, onSuccess, onForgotPassword, onSignUp }) => {
  const [showPassword, setShowPassword] = useState(false)
  const { login, isLoading, error } = useLogin()
  const navigate = useNavigate()

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    resolver: zodResolver(signinFormValidationSchema),
     mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      navigate(-1)
    }
  }

  const handleForgotPassword = () => {
    if (onForgotPassword) {
      onForgotPassword()
    } else {
      navigate('/forgetPass')
    }
  }

  const handleSignUpClick = () => {
    if (onSignUp) {
      onSignUp()
    } else {
      navigate('/signUp')
    }
  }

  const onSubmit = async (data) => {
    const result = await login(data.email, data.password)

    if (result.success) {
      if (onSuccess) {
        onSuccess(result.data)
      } else {
        navigate('/')
      }
    }
  }

  const onErrors = (fieldErrors) => {
    const firstError = Object.values(fieldErrors)[0]?.message
    if (firstError) {
      handleToastMessage(firstError, 'warning')
    }
  }

  return (
    <div
      style={{ backgroundColor: 'var(--background-light)' }}
      className="min-h-screen w-full flex flex-col items-center justify-center p-4 transition-colors duration-300 gap-6 relative"
    >
      <header className="w-full max-w-[480px] flex justify-between items-center mb-4 px-2">
        <h2 className="text-3xl font-extrabold tracking-wider bg-gradient-to-r from-[var(--primary-light)] to-[var(--secondary-light)] bg-clip-text text-transparent">
          Badilni
        </h2>
        <div className="flex gap-2 items-center">
          <ThemeToggle />
        </div>
      </header>

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
              className="text-[26px] font-bold mb-2 tracking-tight transition-colors"
            >
              Sign In
            </h2>
            <p
              style={{ color: 'var(--gray-text)' }}
              className="text-sm leading-relaxed transition-colors"
            >
              Please enter your details to sign in to your account.
            </p>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="email"
              style={{ color: 'var(--black-text)' }}
              className="block text-sm font-semibold transition-colors"
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
                className="block text-sm font-semibold transition-colors"
              >
                Password
              </label>
              <button
                type="button"
                onClick={handleForgotPassword}
                style={{ color: 'var(--primary-light)' }}
                className="text-xs font-semibold hover:underline cursor-pointer transition-all focus:outline-none"
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

          {/* ✅ Fix: display backend/login error to the user */}
          {error && <ErrorMessage message={error} />}

          <button
            type="submit"
            disabled={isLoading}
            style={{ backgroundColor: 'var(--secondary-light)' }}
            className="w-full py-3.5 text-white rounded-2xl font-semibold text-base cursor-pointer hover:opacity-90 transition-opacity disabled:opacity-50 mt-2"
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>

          <p
            style={{ color: 'var(--gray-text)' }}
            className="text-sm text-center mt-4 transition-colors"
          >
            Don't have an account?{' '}
            <button
              type="button"
              onClick={handleSignUpClick}
              style={{ color: 'var(--primary-light)' }}
              className="font-semibold hover:underline cursor-pointer transition-all focus:outline-none"
            >
              Sign Up
            </button>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login
