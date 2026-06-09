// src/pages/verify&ResetPass/forgetPass.jsx
import { useNavigate } from 'react-router-dom'
import ForgotPassword from '../../components/resetPassword/forgetPassword'

const ForgetPassPage = () => {
  const navigate = useNavigate()

  return (
    <div className="w-full min-h-screen flex items-center justify-center transition-all duration-500">
      <ForgotPassword
        onNext={(submittedEmail) => {
          console.log('✅ Email captured:', submittedEmail)
          navigate('/verifyCode', { state: { email: submittedEmail } })
        }}
        onBack={() => navigate('/signIn')}
      />
    </div>
  )
}

export default ForgetPassPage
