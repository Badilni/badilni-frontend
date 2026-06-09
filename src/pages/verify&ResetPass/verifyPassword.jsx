import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import VerificationCode from '../../components/auth/resetPassword/verifyPass'
import { verifyCode } from '../../services/authentication'
import { handleToastMessage } from '../../utils/helper'

const VerificationPassword = () => {
  const navigate = useNavigate()
  const { state } = useLocation()
  const email = state?.email || ''
  const from = state?.from || ''
  const [isVerifying, setIsVerifying] = useState(false)

  const handleNext = async (submittedCode) => {
    if (from === 'signup') {
      setIsVerifying(true)
      try {
        await verifyCode(email, submittedCode, 'signup')
        handleToastMessage('Email verified successfully!', 'success')
        navigate('/signIn')
      } catch (err) {
        const msg = err.message || 'Verification failed.'
        handleToastMessage(msg, 'error')
      } finally {
        setIsVerifying(false)
      }
      return
    }

    // default: password reset flow
    navigate('/resetPassword', { state: { email, code: submittedCode } })
  }

  return (
    <VerificationCode
      email={email}
      isSubmitting={isVerifying}
      onNext={handleNext}
      onBack={() => navigate('/forgetPass')}
    />
  )
}

export default VerificationPassword
