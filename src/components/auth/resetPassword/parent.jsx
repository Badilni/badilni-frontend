
import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import CombinedPasswordReset from '../resetPassword/verifyPass'
import VerificationCode from '../signup/SignUp'
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
      const msg = err.response?.data?.message || err.message || 'Verification failed.'
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
    <div className="flex items-center justify-center min-h-screen">
      <VerificationCode
        email={email}
        isSubmitting={isVerifying}
        onNext={handleNext}
        onBack={() => navigate('/forgetPass')}
      />
    </div>
  )
}

export default VerfyAndReset;
