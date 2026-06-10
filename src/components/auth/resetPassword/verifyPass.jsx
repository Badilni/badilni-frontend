
import Spinner from '../../common/Spinner'
import { IoIosArrowRoundBack } from 'react-icons/io'
import Button from '../../common/Button'
import HeadPasswordReset from '../../common/HeadPasswordReset'
import { useCombinedResetPassword } from '../../../hooks/useVerificationCode'
import { resetPasswordSubmitService } from '../../../services/authentication/ForgotPasswordAuth/forgotPassword'
import { handleToastMessage } from '../../../utils/helper'

export const CombinedPasswordReset = ({ onBack, email = '', onSuccess }) => {
  const {
    code,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    isLoading: isCodeLoading,
    error: combinedError,
    setError: setCombinedError,
    setIsLoading: setIsFinalSubmitting,
    inputRefs,
    passwordCriteria,
    isPasswordMismatched,
    handleChange,
    handleKeyDown,
    handleResend,
    validateForm,
  } = useCombinedResetPassword(email)

  const handleFinalSubmit = async (e) => {
    e.preventDefault()
    setCombinedError('')

    if (!validateForm()) return

    setIsFinalSubmitting(true)
    try {
      const finalCode = code.join('')

      await resetPasswordSubmitService(email, finalCode, password, confirmPassword)

      handleToastMessage('Password reset successfully! 🎉', 'success')
      setIsFinalSubmitting(false)

      if (typeof onSuccess === 'function') onSuccess()
    } catch (err) {
      setIsFinalSubmitting(false)
      const backendError = err.response?.data?.errors?.[0]?.message || err.response?.data?.message
      setCombinedError(backendError || 'Failed to reset password. Please try again.')
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
      <form onSubmit={handleFinalSubmit} className="relative w-full max-w-[520px] flex flex-col gap-8 rounded-[24px] p-6 md:p-10 shadow-[0_10px_30px_rgba(0,0,0,0.04)] text-left transition-colors duration-300 bg-[var(--whiteBackground)]">

        <button
          type="button"
          onClick={onBack}
          className="absolute top-[25px] left-[25px] w-10 h-10 rounded-full border flex items-center justify-center cursor-pointer opacity-80 hover:opacity-100 transition-all border-[var(--gray-text)] bg-[var(--whiteBackground)] z-10"
        >
          <IoIosArrowRoundBack className="text-[var(--secondary-light)]" size={28} />
        </button>

        <div className="space-y-4 mt-8">
          <div>
            <h2 className="text-[24px] font-bold mb-1 tracking-tight text-[var(--black-text)]">1. Verification Code</h2>
            <p className="text-sm leading-relaxed text-[var(--gray-text)]">Enter the 6-digit security code sent to your email.</p>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-semibold text-[var(--black-text)]">Verification Code</label>
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
            <span onClick={handleResend} className="font-semibold cursor-pointer hover:underline text-[var(--secondary-light)]">
              Resend Code
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="text-[24px] font-bold mb-1 tracking-tight text-[var(--black-text)]">2. New Password</h2>
            <p className="text-sm leading-relaxed text-[var(--gray-text)]">Enter and confirm your new strong password.</p>
          </div>

          {combinedError && (
            <div className="p-3 text-sm rounded-xl font-medium bg-[var(--backgDangerOpacity)] text-[var(--danger)]">
              ⚠️ {combinedError}
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-[var(--black-text)]">New Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              className="w-full h-12 px-4 border rounded-xl outline-none focus:ring-4 focus:ring-blue-500/10 text-[var(--black-text)] bg-[var(--whiteBackground)] border-[var(--gray-text)]"
            />

            {password.length > 0 && (
              <div className="text-xs space-y-1.5 p-4 rounded-xl mt-2 border border-dashed bg-[var(--background-light)] border-[var(--gray-text)]">
                <p className="font-semibold mb-1 opacity-90 text-[var(--black-text)]">Password Requirements:</p>
                <p className={`flex items-center gap-1.5 font-medium ${passwordCriteria.hasMinLength ? 'text-green-600' : 'text-amber-600 opacity-80'}`}>
                  {passwordCriteria.hasMinLength ? '✓' : '•'} At least 8 characters
                </p>
                <p className={`flex items-center gap-1.5 font-medium ${passwordCriteria.hasUppercase ? 'text-green-600' : 'text-amber-600 opacity-80'}`}>
                  {passwordCriteria.hasUppercase ? '✓' : '•'} One uppercase letter (A-Z)
                </p>
                <p className={`flex items-center gap-1.5 font-medium ${passwordCriteria.hasLowercase ? 'text-green-600' : 'text-amber-600 opacity-80'}`}>
                  {passwordCriteria.hasLowercase ? '✓' : '•'} One lowercase letter (a-z)
                </p>
                <p className={`flex items-center gap-1.5 font-medium ${passwordCriteria.hasNumber ? 'text-green-600' : 'text-amber-600 opacity-80'}`}>
                  {passwordCriteria.hasNumber ? '✓' : '•'} One number (0-9)
                </p>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-[var(--black-text)]">Confirm New Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
              className="w-full h-12 px-4 border rounded-xl outline-none focus:ring-4 focus:ring-blue-500/10 text-[var(--black-text)] bg-[var(--whiteBackground)] border-[var(--gray-text)]"
            />

            {isPasswordMismatched && (
              <p className="text-[var(--danger)] text-xs font-semibold flex items-center gap-1 mt-1">
                ❌ Passwords do not match yet.
              </p>
            )}
          </div>

          <Button
            variant="primary"
            size="lg"
            type="submit"
            disabled={isCodeLoading}
            className="w-full py-3.5 text-white rounded-2xl font-semibold text-base mt-2"
          >
            {isCodeLoading ? 'Submitting Everything...' : 'Submit & Reset Password'}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default CombinedPasswordReset;
