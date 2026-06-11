/**
 * ErrorMessage Component
 * Unified error display for form validations
 * Used across all forms: SignUp, Login, ForgotPassword, ResetPassword
 */

const ErrorMessage = ({ message }) => {
  if (!message) return null

  return (
    <p className="text-xs font-medium mt-1" style={{ color: 'var(--danger)' }}>
      {message}
    </p>
  )
}

export default ErrorMessage
