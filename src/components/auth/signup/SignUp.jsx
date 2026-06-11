import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Button from '../../common/Button'
import ThemeToggle from '../../common/ThemeToggle'
import { useNavigate } from 'react-router-dom'
import useRegister from '../../../hooks/useRegister'
import { signupFormValidationSchema } from '../../../utils/validationSchema'
import { handleToastMessage } from '../../../utils/helper'

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupFormValidationSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const { register: registerUser, isLoading, error } = useRegister()
  const navigate = useNavigate()

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
        <form
          onSubmit={handleSubmit(onSubmit, onErrors)}
          className="space-y-6 mt-2"
        >
          <div>
            <h2
              style={{ color: 'var(--black-text)' }}
              className="text-[26px] font-bold mb-2 tracking-tight transition-colors"
            >
              Create Account
            </h2>
            <p
              style={{ color: 'var(--gray-text)' }}
              className="text-sm leading-relaxed transition-colors"
            >
              Enter your details to create an account.
            </p>
          </div>
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-semibold"
              style={{ color: 'var(--black-text)' }}
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
                borderColor: errors.name ? 'var(--danger)' : 'var(--gray-text)',
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
              className="block text-sm font-semibold"
              style={{ color: 'var(--black-text)' }}
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
              className="block text-sm font-semibold"
              style={{ color: 'var(--black-text)' }}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
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
              className="w-full h-12 px-4 border rounded-xl outline-none transition-all focus:ring-4 focus:ring-blue-500/10 placeholder:text-slate-400"
            />
            {errors.password && (
              <p
                className="text-xs font-medium mt-1"
                style={{ color: 'var(--danger)' }}
              >
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-semibold"
              style={{ color: 'var(--black-text)' }}
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
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
              className="w-full h-12 px-4 border rounded-xl outline-none transition-all focus:ring-4 focus:ring-blue-500/10 placeholder:text-slate-400"
            />
            {errors.confirmPassword && (
              <p
                className="text-xs font-medium mt-1"
                style={{ color: 'var(--danger)' }}
              >
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{ backgroundColor: 'var(--secondary-light)' }}
            className="w-full py-3.5 text-white rounded-2xl font-semibold text-base cursor-pointer hover:opacity-90 transition-opacity disabled:opacity-50 mt-2"
          >
            {isLoading ? 'Signing Up...' : 'Sign Up'}
          </button>

          <p
            style={{ color: 'var(--gray-text)' }}
            className="text-sm text-center mt-4 transition-colors"
          >
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/signIn')}
              style={{ color: 'var(--primary-light)' }}
              className="font-semibold hover:underline cursor-pointer transition-all focus:outline-none"
            >
              Sign In
            </button>
          </p>
        </form>
      </div>
    </div>
  )
}

export default SignUp
