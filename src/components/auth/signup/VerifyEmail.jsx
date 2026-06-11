import { useRef, useState } from 'react'
import { IoIosArrowRoundBack } from 'react-icons/io'
import Button from '../../common/Button'
import { handleToastMessage } from '../../../utils/helper'
import { resendCode } from '../../../services/authentication/verificationCode'

const VerifyEmail = ({ email = '', onNext, onBack, isSubmitting = false }) => {
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const [error, setError] = useState('')
  const [isResending, setIsResending] = useState(false)
  const inputRefs = useRef([])

  const handleChange = (target, index) => {
    const value = target.value.slice(-1)

    if (value === '') {
      let newCode = [...code]
      newCode[index] = ''
      setCode(newCode)
      return
    }

    if (!/^[a-zA-Z0-9]$/.test(value)) return

    let newCode = [...code]
    newCode[index] = value.toUpperCase()
    setCode(newCode)

    if (index < 5) {
      setTimeout(() => inputRefs.current[index + 1]?.focus(), 10)
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      setTimeout(() => inputRefs.current[index - 1]?.focus(), 10)
    }
  }

  const handleResend = async () => {
    if (!email) {
      handleToastMessage('Email is required to resend code.', 'warning')
      return
    }

    setIsResending(true)
    try {
      await resendCode(email)
      handleToastMessage('A new code has been sent!', 'success')
      setCode(['', '', '', '', '', ''])
      setError('')
    } catch (err) {
      const errorMsg = err.message || 'Failed to resend code.'
      handleToastMessage(errorMsg, 'error')
      setError(errorMsg)
    } finally {
      setIsResending(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const fullCode = code.join('')
    if (fullCode.length !== 6) {
      const validationError =
        'Please enter the complete 6-digit verification code.'
      setError(validationError)
      handleToastMessage(validationError, 'warning')
      return
    }

    if (typeof onNext === 'function') {
      onNext(fullCode)
    }
  }

  return (
    <div
      style={{ backgroundColor: 'var(--background-light)' }}
      className="min-h-screen w-full flex flex-col items-center justify-center p-4 transition-colors duration-300"
    >
      <div className="w-full max-w-[480px] flex flex-col gap-2">
        <div
          style={{ backgroundColor: 'var(--whiteBackground)' }}
          className="relative w-full rounded-3xl p-10 shadow-[0_10px_30px_rgba(0,0,0,0.04)] text-left transition-colors duration-300"
        >
          <button
            type="button"
            onClick={onBack}
            className="absolute top-8.75 left-8.75 w-10 h-10 rounded-full border flex items-center justify-center cursor-pointer opacity-80 hover:opacity-100 transition-all"
            style={{
              borderColor: 'var(--gray-text)',
              backgroundColor: 'var(--whiteBackground)',
            }}
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
                Confirm Your Email
              </h2>
              <p
                style={{ color: 'var(--gray-text)' }}
                className="text-sm leading-relaxed transition-colors"
              >
                We've sent a 6-digit verification code to{' '}
                <strong>{email}</strong>. Enter it below to confirm your email
                address.
              </p>
            </div>

            <div className="space-y-3">
              <label
                className="block text-sm font-semibold transition-colors"
                style={{ color: 'var(--black-text)' }}
              >
                Verification Code
              </label>
              <div className="flex justify-between gap-2">
                {code.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    value={digit}
                    ref={(el) => (inputRefs.current[index] = el)}
                    onChange={(e) => handleChange(e.target, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    autoFocus={index === 0}
                    autoComplete="one-time-code"
                    maxLength="1"
                    className="w-12 h-12 text-center text-xl font-bold border rounded-xl outline-none focus:ring-4 focus:ring-blue-500/10 uppercase transition-all"
                    style={{
                      color: 'var(--black-text)',
                      backgroundColor: 'var(--whiteBackground)',
                      borderColor: 'var(--gray-text)',
                    }}
                  />
                ))}
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting || code.join('').length !== 6}
              className="w-full py-3.5 text-white rounded-2xl font-semibold text-base cursor-pointer hover:opacity-90 transition-opacity disabled:opacity-50"
              variant="primary"
              size="lg"
            >
              {isSubmitting ? 'Verifying...' : 'Verify Email'}
            </Button>

            <div
              className="text-sm text-center"
              style={{ color: 'var(--gray-text)' }}
            >
              Didn't receive the code?{' '}
              <button
                type="button"
                onClick={handleResend}
                disabled={isResending}
                style={{ color: 'var(--primary-light)' }}
                className="font-semibold hover:underline cursor-pointer transition-all focus:outline-none disabled:opacity-50"
              >
                {isResending ? 'Sending...' : 'Resend'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default VerifyEmail
