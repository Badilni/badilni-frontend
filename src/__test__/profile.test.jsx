import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { HashRouter } from 'react-router-dom'

// Mock zustand auth store
vi.mock('../store/authStore', () => ({
  default: vi.fn((selector) =>
    selector({
      user: {
        name: 'Sohila',
        email: 'sohila@badilni.com',
        title: 'Full-Stack Developer',
        bio: 'Passionate developer who loves building great products.',
        avatar: { url: null },
        skills: ['React', 'Node.js'],
      },
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

// ── Imports (after mocks) ─────────────────────────────────────────────────────
import ProfileScreen from '../components/profile/profile'
import ProfileHeader from '../components/profile/ProfileHeader'
import ReviewCard, { StarRating } from '../components/profile/ReviewCard'

// ── Helpers ───────────────────────────────────────────────────────────────────
const renderWithRouter = (ui) => render(<HashRouter>{ui}</HashRouter>)

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

  it('renders the user name from store', () => {
    renderWithRouter(<ProfileHeader />)
    expect(screen.getByRole('heading', { name: /Sohila/i })).toBeInTheDocument()
  })

  it('renders the user title', () => {
    renderWithRouter(<ProfileHeader />)
    expect(screen.getByText(/Full-Stack Developer/i)).toBeInTheDocument()
  })

  it('renders the bio text', () => {
    renderWithRouter(<ProfileHeader />)
    expect(
      screen.getByText(
        /Passionate developer who loves building great products/i
      )
    ).toBeInTheDocument()
  })

  it('renders Edit Profile button', () => {
    renderWithRouter(<ProfileHeader />)
    expect(screen.getByText(/Edit Profile/i)).toBeInTheDocument()
  })

  it('navigates to /profile/edit when Edit Profile is clicked', () => {
    renderWithRouter(<ProfileHeader />)
    fireEvent.click(screen.getByText(/Edit Profile/i))
    expect(mockNavigate).toHaveBeenCalledWith('/profile/edit')
  })

  it('renders Share button', () => {
    renderWithRouter(<ProfileHeader />)
    expect(screen.getByText(/Share/i)).toBeInTheDocument()
  })
})

// 4. ProfileScreen (full page)

describe('ProfileScreen', () => {
  beforeEach(() => mockNavigate.mockClear())

  it('renders the profile page core content', () => {
    renderWithRouter(<ProfileScreen />)
    // NavBar & Footer live in MainLayout (the router wrapper), not in ProfileScreen.
    // This test verifies the page itself renders its primary sections.
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
    expect(screen.getByText('sohila@badilni.com')).toBeInTheDocument()
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
    // First two reviewers from MOCK_REVIEWS
    expect(screen.getByText('Sarah Jenkins')).toBeInTheDocument()
    expect(screen.getByText('Michael Chen')).toBeInTheDocument()
  })

  it('shows Load More Reviews button when more reviews exist', () => {
    renderWithRouter(<ProfileScreen />)
    expect(screen.getByText(/Load More Reviews/i)).toBeInTheDocument()
  })

  it('loads more reviews when Load More is clicked', async () => {
    renderWithRouter(<ProfileScreen />)
    fireEvent.click(screen.getByText(/Load More Reviews/i))
    await waitFor(() => {
      expect(screen.getByText('Layla Hassan')).toBeInTheDocument()
    })
  })

  it('hides Load More button after all reviews are shown', async () => {
    renderWithRouter(<ProfileScreen />)
    fireEvent.click(screen.getByText(/Load More Reviews/i))
    await waitFor(() => {
      expect(screen.queryByText(/Load More Reviews/i)).not.toBeInTheDocument()
    })
  })

  it('opens sort dropdown when clicked', () => {
    renderWithRouter(<ProfileScreen />)
    fireEvent.click(screen.getByText('Most Recent'))
    expect(screen.getByText('Highest Rated')).toBeVisible()
  })

  it('changes sort option when Highest Rated is selected', () => {
    renderWithRouter(<ProfileScreen />)
    fireEvent.click(screen.getByText('Most Recent'))
    fireEvent.click(screen.getByText('Highest Rated'))
    // The button now shows the selected option
    expect(screen.getAllByText('Highest Rated').length).toBeGreaterThanOrEqual(
      1
    )
  })

  it('renders CTA card', () => {
    renderWithRouter(<ProfileScreen />)
    expect(
      screen.getByText(/Ready to share your knowledge/i)
    ).toBeInTheDocument()
    expect(screen.getByText(/Start a Session/i)).toBeInTheDocument()
  })

  it('renders all default skill tags', () => {
    renderWithRouter(<ProfileScreen />)
    expect(screen.getByText('UI/UX Design')).toBeInTheDocument()
    expect(screen.getByText('Tailwind CSS')).toBeInTheDocument()
    expect(screen.getByText('React Architecture')).toBeInTheDocument()
  })
})
