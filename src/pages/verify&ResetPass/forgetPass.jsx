// src/pages/verify&ResetPass/forgetPass.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ForgotPassword from '../../components/resetPassword/forgetPassword';
import VerifyPass from '../../components/resetPassword/verifyPass';
import PasswordReset from '../../components/resetPassword/passwordReset';

const ForgetPassPage = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');

  console.log('Current State - Email:', email, '| Code:', verificationCode, '| Step:', step);

  return (
    <div className="w-full min-h-screen flex items-center justify-center transition-all duration-500">

      {step === 0 && (
        <ForgotPassword
          onNext={(submittedEmail) => {
            console.log('✅ Email captured:', submittedEmail);
            setEmail(submittedEmail);
            setStep(1);
          }}
          onBack={() => navigate('/signIn')}
        />
      )}

      {step === 1 && (
        <VerifyPass
          email={email}
          onNext={(submittedCode) => {
            console.log('✅ Code captured:', submittedCode);
            setVerificationCode(submittedCode);
            setStep(2);
          }}
          onBack={() => setStep(0)}
        />
      )}

      {step === 2 && (
        <PasswordReset
          email={email}
          verificationCode={verificationCode}
          onBack={() => {
            setVerificationCode('');
            setStep(1);
          }}

          onSuccess={() => {
            console.log('🎉 Password updated successfully!');
            navigate('/signIn');
          }}
        />
      )}

    </div>
  );
};

export default ForgetPassPage;
