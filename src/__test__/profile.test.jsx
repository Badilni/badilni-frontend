import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { HashRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const mockProfile = {
  _id: 'user-123',
  name: 'Sohila',
  email: 'sohila@badilni.com',
  title: 'Full-Stack Developer',
  bio: 'Passionate developer who loves building great products.',
  avatar: { url: null },
  skillTags: ['UI/UX Design', 'Tailwind CSS', 'React Architecture'],
  walletBalance: 120,
  createdAt: '2026-01-01',
  averageRating: 4.8,
  totalReviews: 2,
}

// Mock zustand auth store
vi.mock('../store/authStore', () => ({
  default: vi.fn((selector) =>
    selector({
      user: mockProfile,
      isAuthenticated: true,
      isLoading: false,
      logout: vi.fn(),
    })
  ),
}))

// Mock react-router-dom navigate
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useSearchParams: () => [new URLSearchParams(), vi.fn()],
    useParams: () => ({ userId: undefined }),
    useLocation: () => ({ hash: '', state: {} }),
  }
})

// Mock react-icons to avoid SVG rendering issues
vi.mock('react-icons/fa', () => ({
  FaGraduationCap: () => <span data-testid="icon-graduation" />,
  FaLinkedinIn: () => <span data-testid="icon-linkedin" />,
}))
vi.mock('react-icons/fi', () => ({
  FiSettings: () => <span data-testid="icon-settings" />,
  FiLock: () => <span data-testid="icon-lock" />,
  FiKey: () => <span data-testid="icon-key" />,
  FiChevronDown: () => <span data-testid="icon-chevron" />,
  FiCheck: () => <span data-testid="icon-check" />,
  FiEdit2: () => <span data-testid="icon-edit" />,
  FiShare2: () => <span data-testid="icon-share" />,
  FiCamera: () => <span data-testid="icon-camera" />,
  FiLink: () => <span data-testid="icon-link" />,
  FiGithub: () => <span data-testid="icon-github" />,
  FiX: () => <span data-testid="icon-x" />,
  FiSave: () => <span data-testid="icon-save" />,
  FiMapPin: () => <span data-testid="icon-pin" />,
  FiCalendar: () => <span data-testid="icon-calendar" />,
  FiSearch: () => <span data-testid="icon-search" />,
  FiAlertTriangle: () => <span data-testid="icon-alert" />,
}))
vi.mock('react-icons/md', () => ({
  MdVerified: () => <span data-testid="icon-verified" />,
}))

// Mock NavBar and Footer to keep tests focused
vi.mock('../components/layout/NavBar', () => ({
  default: () => <nav data-testid="navbar">NavBar</nav>,
}))
vi.mock('../components/layout/Footer', () => ({
  default: () => <footer data-testid="footer">Footer</footer>,
}))

// Mock profile and reviews hooks to avoid network/query errors
vi.mock('../hooks/Profile/useProfile', () => ({
  useProfile: () => ({
    profile: mockProfile,
    isLoading: false,
  }),
  useGetMe: () => ({
    data: mockProfile,
    isLoading: false,
  }),
}))

vi.mock('../hooks/Review/RatingProfileHeader', () => ({
  useReviewsCount: () => ({
    data: 2,
    isLoading: false,
  }),
}))

const MOCK_REVIEWS_PAGE_1 = {
  data: {
    reviews: [
      {
        _id: 'r1',
        rating: 5,
        comment: 'Amazing mentor! Great session.',
        createdAt: '2026-07-09T20:17:26Z',
        reviewer: { name: 'Sarah Jenkins' },
        listing: { title: 'UI Design Basics' },
      },
      {
        _id: 'r2',
        rating: 4,
        comment: 'Good session, learned a lot.',
        createdAt: '2026-07-08T20:17:26Z',
        reviewer: { name: 'Michael Chen' },
        listing: { title: 'React Architecture' },
      },
    ],
  },
  pagination: {
    totalPages: 2,
    currentPage: 1,
    total: 3,
  },
}

const MOCK_REVIEWS_PAGE_2 = {
  data: {
    reviews: [
      {
        _id: 'r3',
        rating: 5,
        comment: 'Excellent teaching style.',
        createdAt: '2026-07-07T20:17:26Z',
        reviewer: { name: 'Layla Hassan' },
        listing: { title: 'Tailwind CSS' },
      },
    ],
  },
  pagination: {
    totalPages: 2,
    currentPage: 2,
    total: 3,
  },
}

const mockUseReviews = ({ page = 1 } = {}) => {
  const data = page === 2 ? MOCK_REVIEWS_PAGE_2 : MOCK_REVIEWS_PAGE_1
  return {
    data,
    isLoading: false,
    isFetching: false,
    isError: false,
    error: null,
  }
}

vi.mock('../hooks/Review/useMyReviews', () => ({
  useMyReviews: vi.fn((params) => mockUseReviews(params)),
}))

vi.mock('../hooks/Review/useUserReviews', () => ({
  useUserReviews: vi.fn((params) => mockUseReviews(params)),
}))

vi.mock('../hooks/Review/useReviewListingOptions', () => ({
  useReviewListingOptions: () => ({
    data: [],
    isLoading: false,
  }),
}))

// ── Imports (after mocks) ─────────────────────────────────────────────────────
import ProfileScreen from '../components/profile/profile'
import ProfileHeader from '../components/profile/ProfileHeader'
import ReviewCard, { StarRating } from '../components/profile/ReviewCard'

// ── Helpers ───────────────────────────────────────────────────────────────────
const renderWithRouter = (ui) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })

  return render(
    <QueryClientProvider client={queryClient}>
      <HashRouter>{ui}</HashRouter>
    </QueryClientProvider>
  )
}

// 1. StarRating

describe('StarRating', () => {
  it('renders 5 stars total', () => {
    const { container } = render(<StarRating rating={4} />)
    const stars = container.querySelectorAll('span')
    expect(stars).toHaveLength(5)
  })

  it('shows correct number of filled stars', () => {
    const { container } = render(<StarRating rating={3} />)
    const spans = Array.from(container.querySelectorAll('span'))
    const filled = spans.filter((s) => s.textContent === '★').length
    expect(filled).toBe(3)
  })

  it('renders all empty stars when rating is 0', () => {
    const { container } = render(<StarRating rating={0} />)
    const spans = Array.from(container.querySelectorAll('span'))
    const empty = spans.filter((s) => s.textContent === '☆').length
    expect(empty).toBe(5)
  })
})

// 2. ReviewCard

describe('ReviewCard', () => {
  const props = {
    name: 'Sarah Jenkins',
    session: 'UI Design Basics',
    time: '2 days ago',
    img: null,
    comment: 'Amazing mentor! Great session.',
    rating: 5,
  }

  it('renders reviewer name', () => {
    render(<ReviewCard {...props} />)
    expect(screen.getByText('Sarah Jenkins')).toBeInTheDocument()
  })

  it('renders the comment text', () => {
    render(<ReviewCard {...props} />)
    expect(
      screen.getByText('Amazing mentor! Great session.')
    ).toBeInTheDocument()
  })

  it('renders session info', () => {
    render(<ReviewCard {...props} />)
    expect(screen.getByText(/UI Design Basics/)).toBeInTheDocument()
  })

  it('renders initials avatar when no image provided', () => {
    const { container } = render(<ReviewCard {...props} />)
    // Initials = "SJ"
    expect(container.textContent).toContain('SJ')
  })

  it('renders <img> when image url is provided', () => {
    render(<ReviewCard {...props} img="https://example.com/avatar.jpg" />)
    expect(screen.getByRole('img')).toBeInTheDocument()
  })

  it('shows ? initials when name is empty', () => {
    const { container } = render(<ReviewCard {...props} name="" />)
    expect(container.textContent).toContain('?')
  })
})

// 3. ProfileHeader

describe('ProfileHeader', () => {
  beforeEach(() => mockNavigate.mockClear())

  it('renders the user name', () => {
    renderWithRouter(<ProfileHeader profile={mockProfile} />)
    expect(screen.getByRole('heading', { name: /Sohila/i })).toBeInTheDocument()
  })

  it('renders the bio text', () => {
    renderWithRouter(<ProfileHeader profile={mockProfile} />)
    expect(
      screen.getByText(
        /Passionate developer who loves building great products/i
      )
    ).toBeInTheDocument()
  })

  it('renders Edit Profile button', () => {
    renderWithRouter(
      <ProfileHeader profile={mockProfile} isOwnProfile={true} />
    )
    expect(screen.getByText(/Edit Profile/i)).toBeInTheDocument()
  })

  it('navigates to /profile/edit when Edit Profile is clicked', () => {
    renderWithRouter(
      <ProfileHeader profile={mockProfile} isOwnProfile={true} />
    )
    fireEvent.click(screen.getByText(/Edit Profile/i))
    expect(mockNavigate).toHaveBeenCalledWith('/profile/edit')
  })

  it('renders Share button', () => {
    renderWithRouter(
      <ProfileHeader profile={mockProfile} isOwnProfile={true} />
    )
    expect(screen.getByText(/Share/i)).toBeInTheDocument()
  })
})

// 4. ProfileScreen (full page)

describe('ProfileScreen', () => {
  beforeEach(() => mockNavigate.mockClear())

  it('renders the profile page core content', () => {
    renderWithRouter(<ProfileScreen />)
    expect(screen.getByRole('heading', { name: /Sohila/i })).toBeInTheDocument()
    expect(screen.getByText('Account Settings')).toBeInTheDocument()
    expect(screen.getByText(/Recent Feedback/i)).toBeInTheDocument()
  })

  it('renders Skills section', () => {
    renderWithRouter(<ProfileScreen />)
    expect(screen.getByText('Skills')).toBeInTheDocument()
  })

  it('renders Account Settings section', () => {
    renderWithRouter(<ProfileScreen />)
    expect(screen.getByText('Account Settings')).toBeInTheDocument()
  })

  it('renders user email in Account Settings', () => {
    renderWithRouter(<ProfileScreen />)
    expect(
      screen.getAllByText('sohila@badilni.com').length
    ).toBeGreaterThanOrEqual(1)
  })

  it('renders Ratings & Reviews section', () => {
    renderWithRouter(<ProfileScreen />)
    expect(screen.getByText(/Ratings & Reviews/i)).toBeInTheDocument()
  })

  it('renders Recent Feedback section', () => {
    renderWithRouter(<ProfileScreen />)
    expect(screen.getByText(/Recent Feedback/i)).toBeInTheDocument()
  })

  it('renders initial 2 review cards', () => {
    renderWithRouter(<ProfileScreen />)
    expect(screen.getByText('Sarah Jenkins')).toBeInTheDocument()
    expect(screen.getByText('Michael Chen')).toBeInTheDocument()
  })

  it('shows Load More button when more reviews exist', () => {
    renderWithRouter(<ProfileScreen />)
    expect(
      screen.getByRole('button', { name: /Load More/i })
    ).toBeInTheDocument()
  })

  it('loads more reviews when Load More is clicked', async () => {
    renderWithRouter(<ProfileScreen />)
    fireEvent.click(screen.getByRole('button', { name: /Load More/i }))
    await waitFor(() => {
      expect(screen.getByText('Layla Hassan')).toBeInTheDocument()
    })
  })

  it('hides Load More button after all reviews are shown', async () => {
    renderWithRouter(<ProfileScreen />)
    fireEvent.click(screen.getByRole('button', { name: /Load More/i }))
    await waitFor(() => {
      expect(
        screen.queryByRole('button', { name: /Load More/i })
      ).not.toBeInTheDocument()
    })
  })

  it('renders all default skill tags', () => {
    renderWithRouter(<ProfileScreen />)
    expect(screen.getAllByText('UI/UX Design').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Tailwind CSS').length).toBeGreaterThanOrEqual(1)
    expect(
      screen.getAllByText('React Architecture').length
    ).toBeGreaterThanOrEqual(1)
  })
})
