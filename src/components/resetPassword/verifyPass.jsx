import Spinner from '../common/Spinner'
import { useVerificationCode } from '../../hooks/useVerificationCode'
import { IoIosArrowRoundBack } from 'react-icons/io'
import Button from '../common/Button'
import HeadPasswordReset from '../common/HeadPasswordReset'

const VerificationCode = ({ onNext, onBack }) => {
  const {
    code,
    isLoading,
    error,
    inputRefs,
    handleChange,
    handleKeyDown,
    handleSubmit,
    handleResend,
  } = useVerificationCode(onNext)

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center transition-colors duration-300 bg-[var(--background-light)]">
        <div className="text-[var(--secondary-light)]">
          <Spinner size="lg" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 transition-colors duration-300 gap-6 relative bg-[var(--background-light)]">
      <HeadPasswordReset />

      <div className="relative w-full max-w-[480px] rounded-[24px] p-10 shadow-[0_10px_30px_rgba(0,0,0,0.04)] text-left transition-colors duration-300 bg-[var(--whiteBackground)]">
        <button
          type="button"
          onClick={onBack}
          className="absolute top-[35px] left-[35px] w-10 h-10 rounded-full border flex items-center justify-center cursor-pointer opacity-80 hover:opacity-100 transition-all border-[var(--gray-text)] bg-[var(--whiteBackground)]"
        >
          <IoIosArrowRoundBack
            className="text-[var(--secondary-light)]"
            size={28}
          />
        </button>

        <div className="mt-11 mb-9">
          <div className="text-sm font-semibold mb-2 text-[var(--secondary-light)]">
            Step 1/2
          </div>
          <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden transition-colors">
            <div className="w-1/2 h-full rounded-full bg-[var(--secondary-light)]"></div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h2 className="text-[26px] font-bold mb-2 tracking-tight transition-colors text-[var(--black-text)]">
              Enter verification code
            </h2>
            <p className="text-sm leading-relaxed transition-colors text-[var(--gray-text)]">
              We have sent a 6-digit security code to your registered email
              address.
            </p>
          </div>

          {error && (
            <div className="p-3 text-sm rounded-xl font-medium transition-all bg-[var(--backgDangerOpacity)] text-[var(--danger)]">
              ⚠️ {error}
            </div>
          )}

          <div className="space-y-3">
            <label className="block text-sm font-semibold transition-colors text-[var(--black-text)]">
              Verification Code
            </label>

            <div className="flex justify-between gap-2.5">
              {code.map((num, index) => (
                <input
                  key={index}
                  type="text"
                  value={num}
                  ref={(el) => (inputRefs.current[index] = el)}
                  onChange={(e) => handleChange(e.target, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  autoFocus={index === 0}
                  className="w-[52px] h-14 text-center text-2xl font-bold border rounded-xl outline-none transition-all focus:ring-4 focus:ring-blue-500/10 uppercase select-all border-[var(--gray-text)] bg-[var(--whiteBackground)] text-[var(--black-text)]"
                />
              ))}
            </div>
          </div>

          <Button
            variant="primary"
            size="lg"
            type="submit"
            className="w-full py-3.5 text-white rounded-2xl font-semibold text-base cursor-pointer hover:opacity-90 transition-opacity mt-2"
          >
            Continue
          </Button>

          <div className="text-center text-sm mt-6 transition-colors text-[var(--gray-text)]">
            Didn't get the code?{' '}
            <span
              onClick={handleResend}
              className="font-semibold cursor-pointer hover:underline text-[var(--secondary-light)]"
            >
              Resend Code
            </span>
          </div>
        </form>
      </div>
    </div>
  )
}

export default VerificationCode
