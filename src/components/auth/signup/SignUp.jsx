import Button from '../../common/Button'
import ThemeToggle from '../../common/ThemeToggle'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useRegister from '../../../hooks/useRegister'
import { handleToastMessage, onInvalid } from '../../../utils/helper'
import { signupFormValidationSchema } from '../../../utils/validationSchema'

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const { register, isLoading, error } = useRegister()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      signupFormValidationSchema.parse(formData)
    } catch (validationError) {
      const { fieldErrors } = validationError.flatten
        ? validationError.flatten()
        : { fieldErrors: {} }
      onInvalid(fieldErrors || {})
      return
    }

    const result = await register(formData)

    if (result.success) {
      navigate('/signIn')
      return
    }

    if (result.error) {
      handleToastMessage(result.error, 'error')
    }
  }

  return (
    <div
      style={{ backgroundColor: 'var(--background-light)' }}
      className="min-h-screen w-full flex flex-col items-center justify-center p-4 transition-colors duration-300 gap-6 relative"
    >
      <header className="w-full max-w-[480px] flex justify-between items-center mb-4 px-2">
        <h2 className="text-3xl font-extrabold tracking-wider bg-gradient-to-r from-[var(--primary-light)] to-[var(--secondary-light)] bg-clip-text text-transparent">
          Badilni
        </h2>
        <div className="flex gap-2 items-center">
          <ThemeToggle />
        </div>
      </header>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[480px] bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col gap-4"
      >
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Create an Account
        </h3>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light transition-colors bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light transition-colors bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className=" w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light transition-colors bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className=" w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light transition-colors bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
        />

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <Button type="submit" variant="primary" size="md" disabled={isLoading}>
          {isLoading ? 'Signing Up...' : 'Sign Up'}
        </Button>

        <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
          Already have an account?{' '}
          <span
            onClick={() => navigate('/signIn')}
            className="text-primary-light cursor-pointer hover:underline"
          >
            Sign In
          </span>
        </p>
      </form>
    </div>
  )
}

export default SignUp
