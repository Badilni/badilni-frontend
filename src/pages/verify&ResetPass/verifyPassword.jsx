import { useLocation, useNavigate } from 'react-router-dom'
import VerificationCode from '../../components/resetPassword/verifyPass'

const VerificationPassword = () => {
  const navigate = useNavigate()
  const { state } = useLocation()
  const email = state?.email || ''

  return (
    <VerificationCode
      onNext={(submittedCode) => {
        console.log('✅ Code captured:', submittedCode)
        navigate('/resetPassword', { state: { email, code: submittedCode } })
      }}
      onBack={() => navigate('/forgetPass')}
    />
  )
}

export default VerificationPassword
