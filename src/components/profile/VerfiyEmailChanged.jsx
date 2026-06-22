import { useRef, useState } from 'react'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { useNavigate, useLocation } from 'react-router-dom'
import Button from '../common/Button'
import api from '../../api/axios'
import { handleToastMessage } from '../../utils/helper'

const VerifyChangedEmail = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const email = location.state?.email || ''
  const currentPassword = location.state?.currentPassword || ''

  const [code, setCode] = useState(['', '', '', '', '', ''])
  const [isSubmitting, setIsSubmitting] = useState(false)
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    const fullCode = code.join('')

    if (fullCode.length !== 6) {
      handleToastMessage('Please enter the complete 6-digit verification code.', 'warning')
      return
    }

    setIsSubmitting(true)
    try {
      await api.post('/auth/me/email/verify', { code: fullCode })

      handleToastMessage('Email updated and verified successfully! 🎉', 'success')

      navigate('/profile', { state: { emailUpdated: true } })
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Verification failed.'
      handleToastMessage(msg, 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleResend = async () => {
    setIsResending(true)
    try {
      await api.patch('/auth/me/email', {
        currentPassword,
        newEmail: email,
      })

      handleToastMessage('A new verification code has been sent!', 'success')
      setCode(['', '', '', '', '', ''])
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to resend code.'
      handleToastMessage(msg, 'error')
    } finally {
      setIsResending(false)
    }
  }

  const handleBack = () => {
    navigate('/profile')
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
            onClick={handleBack}
            className="absolute top-8.75 left-8.75 w-10 h-10 rounded-full border flex items-center justify-center cursor-pointer opacity-80 hover:opacity-100 transition-all"
            style={{
              borderColor: 'var(--gray-text)',
              backgroundColor: 'var(--whiteBackground)',
            }}
          >
            <IoIosArrowRoundBack style={{ color: 'var(--secondary-light)' }} size={28} />
          </button>

          <form onSubmit={handleSubmit} className="space-y-6 mt-12">
            <div>
              <h2
                style={{ color: 'var(--black-text)' }}
                className="text-[26px] font-bold mb-2 tracking-tight transition-colors"
              >
                Confirm Your New Email
              </h2>
              <p
                style={{ color: 'var(--gray-text)' }}
                className="text-sm leading-relaxed transition-colors"
              >
                We've sent a 6-digit verification code to{' '}
                <strong>{email || 'your new email'}</strong>. Enter it below to confirm your change.
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
              {isSubmitting ? 'Verifying...' : 'Verify New Email'}
            </Button>

            <div className="text-sm text-center" style={{ color: 'var(--gray-text)' }}>
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

export default VerifyChangedEmail
