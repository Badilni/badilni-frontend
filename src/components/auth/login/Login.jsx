import { useState } from 'react'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import ThemeToggle from '../../common/ThemeToggle'
import useLogin from '../../../hooks/useLogin'

const Login = ({ onBack, onSuccess, onForgotPassword, onSignUp }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, isLoading, error, setError } = useLogin()
  const navigate = useNavigate()

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await login(email, password)

    if (result.success) {
      if (onSuccess) {
        onSuccess(result.data)
      } else {
        navigate('/')
      }
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

        <form onSubmit={handleSubmit} className="space-y-6 mt-12">
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

          {error && (
            <div
              className="p-3 text-sm rounded-xl font-medium transition-all"
              style={{
                backgroundColor: 'var(--backgDangerOpacity)',
                color: 'var(--danger)',
              }}
            >
              ⚠️ {error}
            </div>
          )}

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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              style={{
                color: 'var(--black-text)',
                backgroundColor: 'var(--whiteBackground)',
                borderColor: 'var(--gray-text)',
              }}
              className="w-full h-12 px-4 border rounded-xl outline-none transition-all focus:ring-4 focus:ring-blue-500/10 placeholder:text-slate-400"
            />
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
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              style={{
                color: 'var(--black-text)',
                backgroundColor: 'var(--whiteBackground)',
                borderColor: 'var(--gray-text)',
              }}
              className="w-full h-12 px-4 border rounded-xl outline-none transition-all focus:ring-4 focus:ring-blue-500/10 placeholder:text-slate-400"
            />
          </div>

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
