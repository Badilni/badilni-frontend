import { useForgotPassword } from '../../../hooks/useForgotPassword'
import { IoIosArrowRoundBack } from 'react-icons/io'
import HeadPasswordReset from '../../common/HeadPasswordReset'
import Button from '../../common/Button'
import { handleToastMessage } from '../../../utils/helper'
import { useNavigate } from 'react-router-dom'

const ForgotPassword = ({ onNext, onBack }) => {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isLoading,
    serverError,
    successMessage,
  } = useForgotPassword(onNext)

  const navigate = useNavigate()

  const onErrors = (fieldErrors) => {
    const firstError = Object.values(fieldErrors)[0]?.message
    if (firstError) {
      handleToastMessage(firstError, 'warning')
    }
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
          className="relative w-full rounded-[24px] p-10 shadow-[0_10px_30px_rgba(0,0,0,0.04)]
          text-left transition-colors duration-300"
        >
          {/* <button
            type="button"
            onClick={onBack}
            className="absolute top-[35px] left-[35px] w-10 h-10 rounded-full border flex items-center justify-center cursor-pointer
              opacity-80 hover:opacity-100 transition-all
              border-[var(--gray-text)] bg-[var(--whiteBackground)]"
          >
            <IoIosArrowRoundBack
              className="text-[var(--secondary-light)]"
              size={28}
            />
          </button> */}

          <form
            onSubmit={handleSubmit(onSubmit, onErrors)}
            className="space-y-6 mt-2"
          >
            <div>
              <h2
                style={{ color: 'var(--black-text)' }}
                className="text-[26px] font-bold mb-2 tracking-tight transition-colors"
              >
                Forgot Password?
              </h2>
              <p
                style={{ color: 'var(--gray-text)' }}
                className="text-sm leading-relaxed transition-colors"
              >
                Enter your email address below and we'll send you a 6-digit code
                to reset your password.
              </p>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold transition-colors text-[var(--black-text)]">
                Email Address
              </label>
              <input
                type="email"
                placeholder="example@gmail.com"
                disabled={isLoading}
                {...register('email')}
                className={`w-full h-12 px-4 border rounded-xl outline-none transition-all
                  focus:ring-4 focus:ring-blue-500/10 placeholder:text-slate-400
                  text-[var(--black-text)] bg-[var(--whiteBackground)]
                  ${errors.email ? 'border-[var(--danger)]' : 'border-[var(--gray-text)]'}`}
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

            <Button
              className="w-full py-3.5 text-white rounded-2xl font-semibold text-base cursor-pointer
              hover:opacity-90 transition-opacity disabled:opacity-50 mt-2"
              variant="primary"
              size="lg"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Sending Code...' : 'Send Code'}
            </Button>
            <p
              style={{ color: 'var(--gray-text)' }}
              className="text-sm text-center mt-1"
            >
              Back to {' '}
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
    </div>
  )
}

export default ForgotPassword
