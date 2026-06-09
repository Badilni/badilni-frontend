import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { HashRouter } from 'react-router-dom'
import axios from 'axios'
import Login from '../components/login/Login'

// Mock axios
vi.mock('axios')

describe('Login Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Clear localStorage
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
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument()

    // Check buttons
    expect(screen.getByRole('button', { name: /Sign In/i })).toBeInTheDocument()
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

  it('shows error when email or password is empty', async () => {
    renderLogin()

    const submitButton = screen.getByRole('button', { name: /Sign In/i })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/Please fill in all fields/i)).toBeInTheDocument()
    })
  })

  it('shows error if password is less than 8 characters', async () => {
    renderLogin()

    const emailInput = screen.getByPlaceholderText('name@example.com')
    const passwordInput = screen.getByPlaceholderText('••••••••')
    const submitButton = screen.getByRole('button', { name: /Sign In/i })

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: '123' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(
        screen.getByText(/Password must be at least 8 characters long/i)
      ).toBeInTheDocument()
    })
  })

  it('performs successful login API call and saves user details', async () => {
    const mockSuccessResponse = {
      status: 200,
      data: {
        status: 'success',
        accessToken: 'mocked_access_token',
        data: {
          user: {
            _id: '12345',
            name: 'John Doe',
            email: 'john@example.com',
          },
        },
      },
    }
    axios.post.mockResolvedValueOnce(mockSuccessResponse)

    const mockOnSuccess = vi.fn()
    renderLogin({ onSuccess: mockOnSuccess })

    const emailInput = screen.getByPlaceholderText('name@example.com')
    const passwordInput = screen.getByPlaceholderText('••••••••')
    const submitButton = screen.getByRole('button', { name: /Sign In/i })

    fireEvent.change(emailInput, { target: { value: 'john@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:3000/api/v1/auth/login',
        {
          email: 'john@example.com',
          password: 'password123',
        }
      )
      expect(mockOnSuccess).toHaveBeenCalledWith(mockSuccessResponse.data)
      expect(localStorage.getItem('token')).toBe('mocked_access_token')
      expect(localStorage.getItem('user')).toContain('John Doe')
    })
  })

  it('displays API error on failed login', async () => {
    const mockErrorResponse = {
      response: {
        status: 401,
        data: {
          message: 'Invalid credentials',
        },
      },
    }
    axios.post.mockRejectedValueOnce(mockErrorResponse)

    renderLogin()

    const emailInput = screen.getByPlaceholderText('name@example.com')
    const passwordInput = screen.getByPlaceholderText('••••••••')
    const submitButton = screen.getByRole('button', { name: /Sign In/i })

    fireEvent.change(emailInput, { target: { value: 'john@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument()
    })
  })
})
