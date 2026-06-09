import { useLocation, useNavigate } from 'react-router-dom'
import PasswordReset from '../../components/resetPassword/passwordReset'

const ResetPassword = () => {
  const navigate = useNavigate()
  const { state } = useLocation()
  const email = state?.email || ''
  const code = state?.code || ''

  return (
    <PasswordReset
      email={email}
      verificationCode={code}
      onBack={() => navigate('/verifyCode', { state: { email } })}
      onSuccess={() => navigate('/signIn')}
    />
  )
}

export default ResetPassword
