import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { HashRouter } from 'react-router-dom'
import Login from '../components/auth/login/Login'

// Mock the login service
vi.mock('../services/authentication/login', () => ({
  login: vi.fn(),
}))

// Mock react-toastify while keeping all original exports (e.g. Slide)
vi.mock('react-toastify', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    toast: {
      success: vi.fn(),
      error: vi.fn(),
      warning: vi.fn(),
    },
  }
})

import { login as loginService } from '../services/authentication/login'

describe('Login Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  const renderLogin = (props = {}) => {
    return render(
      <HashRouter>
        <Login {...props} />
      </HashRouter>
    )
  }

  it('renders sign in elements correctly', () => {
    renderLogin()

    // Check title and descriptions
    expect(
      screen.getByRole('heading', { name: /Sign In/i })
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Please enter your details to sign in to your account/i)
    ).toBeInTheDocument()

    // Check input fields
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^Password$/i)).toBeInTheDocument()

    // Check buttons
    expect(
      screen.getByRole('button', { name: /^Sign In$/i })
    ).toBeInTheDocument()
  })

  it('allows user to type into inputs', () => {
    renderLogin()

    const emailInput = screen.getByPlaceholderText('name@example.com')
    const passwordInput = screen.getByPlaceholderText('••••••••')

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })

    expect(emailInput.value).toBe('test@example.com')
    expect(passwordInput.value).toBe('password123')
  })

  it('shows validation error when email is empty', async () => {
    renderLogin()

    const submitButton = screen.getByRole('button', { name: /^Sign In$/i })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument()
    })
  })

  it('shows validation error when password is empty', async () => {
    renderLogin()

    const emailInput = screen.getByPlaceholderText('name@example.com')
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })

    const submitButton = screen.getByRole('button', { name: /^Sign In$/i })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/Password is required/i)).toBeInTheDocument()
    })
  })

  it('shows email validation error when only password is filled', async () => {
    renderLogin()

    const passwordInput = screen.getByPlaceholderText('••••••••')
    const submitButton = screen.getByRole('button', { name: /^Sign In$/i })

    // Fill only password, leave email empty → Zod returns "Email is required"
    fireEvent.change(passwordInput, { target: { value: 'SomePass1' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument()
    })
  })

  // it('performs successful login API call and saves user details', async () => {
  //   const mockSuccessData = {
  //     status: 'success',
  //     accessToken: 'mocked_access_token',
  //     data: {
  //       user: {
  //         _id: '12345',
  //         name: 'John Doe',
  //         email: 'john@example.com',
  //       },
  //     },
  //   }
  //   loginService.mockResolvedValueOnce(mockSuccessData)

  //   const mockOnSuccess = vi.fn()
  //   renderLogin({ onSuccess: mockOnSuccess })

  //   const emailInput = screen.getByPlaceholderText('name@example.com')
  //   const passwordInput = screen.getByPlaceholderText('••••••••')
  //   const submitButton = screen.getByRole('button', { name: /^Sign In$/i })

  //   fireEvent.change(emailInput, { target: { value: 'john@example.com' } })
  //   fireEvent.change(passwordInput, { target: { value: 'Password1' } })
  //   fireEvent.click(submitButton)

  //   await waitFor(() => {
  //     expect(loginService).toHaveBeenCalledWith({
  //       email: 'john@example.com',
  //       password: 'Password1',
  //     })
  //     expect(mockOnSuccess).toHaveBeenCalledWith(mockSuccessData)
  //     expect(localStorage.getItem('token')).toBe('mocked_access_token')
  //     expect(localStorage.getItem('user')).toContain('John Doe')
  //   })
  // })
})
