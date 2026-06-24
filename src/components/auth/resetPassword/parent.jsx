import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import CombinedPasswordReset from '../resetPassword/verifyPass'
import VerifyEmail from '../signup/VerifyEmail'
import { verifyCode } from '../../../services/authentication'
import { handleToastMessage } from '../../../utils/helper'

const VerfyAndReset = () => {
  const navigate = useNavigate()
  const { state } = useLocation()

  const email = state?.email || ''
  const from = state?.from || ''
  const [isVerifying, setIsVerifying] = useState(false)

  const handleNext = async (submittedCode) => {
    setIsVerifying(true)
    try {
      await verifyCode(email, submittedCode, 'signup')
      handleToastMessage('Email verified successfully!', 'success')
      navigate('/signIn')
    } catch (err) {
      const msg =
        err.response?.data?.message || err.message || 'Verification failed.'
      handleToastMessage(msg, 'error')
    } finally {
      setIsVerifying(false)
    }
  }

  if (from !== 'signup') {
    return (
      <CombinedPasswordReset
        email={email}
        onBack={() => navigate('/forgetPass')}
        onSuccess={() => navigate('/signIn')}
      />
    )
  }

  return (
    <VerifyEmail
      email={email}
      isSubmitting={isVerifying}
      onNext={handleNext}
      onBack={() => navigate('/signUp')}
    />
  )
}

export default VerfyAndReset

