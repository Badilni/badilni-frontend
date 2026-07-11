import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import RequestCard from '../components/requests/RequestCard'
import useAuthStore from '../store/authStore'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  }
})

vi.mock('../components/bookings/CreateBookingModal', () => ({
  default: () => null,
}))

const renderWithClient = (ui) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })

  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  )
}

describe('RequestCard', () => {
  beforeEach(() => {
    useAuthStore.setState({ user: null, isAuthenticated: false })
  })

  it('renders safely when category data is missing', () => {
    renderWithClient(
      <RequestCard
        request={{
          title: 'Need help',
          description: 'A simple request',
          creditsOffered: 5,
          tags: [],
          deadline: '',
          createdAt: new Date().toISOString(),
          user: { name: 'Alex' },
        }}
      />
    )

    expect(screen.getByText('Need help')).toBeInTheDocument()
    expect(screen.getAllByText('General').length).toBeGreaterThan(0)
  })
})
