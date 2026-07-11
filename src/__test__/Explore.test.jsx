import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { HashRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ExploreHero from '../components/explore/ExploreHero'
import ExploreStats from '../components/explore/ExploreStats'
import ExploreCategoryGrid from '../components/explore/ExploreCategoryGrid'
import MentorCard from '../components/explore/MentorCard'
import MentorGrid from '../components/explore/MentorGrid'
import { fetchUsersService } from '../services/AdvancedSearch/search'

// ─── Mocks ──────────────────────────────────────────────────────────────────

const MOCK_CATEGORIES = [
  { _id: 'cat1', name: 'Design' },
  { _id: 'cat2', name: 'Development' },
  { _id: 'cat3', name: 'Business' },
  { _id: 'cat4', name: 'Marketing' },
  { _id: 'cat5', name: 'Growth' },
  { _id: 'cat6', name: 'Music' },
]

vi.mock('../hooks/useCategories', () => ({
  useCategories: () => ({
    categories: MOCK_CATEGORIES,
    loading: false,
    error: null,
  }),
}))

const MOCK_USERS = [
  {
    _id: '1',
    name: 'Sarah Jenkins',
    skillTags: ['UX Design', 'Figma', 'Career'],
    averageRating: 4.9,
    description: 'Expert in user research.',
  },
  {
    _id: '2',
    name: 'Lena Mueller',
    skillTags: ['Swift', 'iOS'],
    averageRating: 4.7,
    description: 'iOS dev.',
  },
]

vi.mock('../services/AdvancedSearch/search', () => ({
  fetchUsersService: vi.fn(async ({ keyword } = {}) => {
    let filtered = MOCK_USERS
    if (keyword) {
      filtered = MOCK_USERS.filter(
        (u) =>
          u.name.toLowerCase().includes(keyword.toLowerCase()) ||
          u.skillTags.some((t) =>
            t.toLowerCase().includes(keyword.toLowerCase())
          )
      )
    }
    return {
      data: {
        users: filtered,
      },
      pagination: {
        totalPages: 2,
        totalCount: filtered.length + 10,
      },
    }
  }),
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

// ─── Helpers ────────────────────────────────────────────────────────────────

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

// ─── ExploreHero ────────────────────────────────────────────────────────────

describe('ExploreHero', () => {
  it('renders headline and description text', () => {
    renderWithRouter(<ExploreHero />)
    expect(screen.getByText(/Explore Our Creative/i)).toBeInTheDocument()
    expect(screen.getByText(/Community/i)).toBeInTheDocument()
    expect(
      screen.getByText(/Join over 5,000\+ members swapping skills/i)
    ).toBeInTheDocument()
  })
})

// ─── ExploreStats ───────────────────────────────────────────────────────────

describe('ExploreStats', () => {
  it('renders all four stat values', () => {
    renderWithRouter(<ExploreStats />)
    expect(screen.getByText('2,450+')).toBeInTheDocument()
    expect(screen.getByText('50k+')).toBeInTheDocument()
    expect(screen.getByText('120+')).toBeInTheDocument()
    expect(screen.getByText('98%')).toBeInTheDocument()
  })

  it('renders all four stat labels', () => {
    renderWithRouter(<ExploreStats />)
    expect(screen.getByText('Expert Mentors')).toBeInTheDocument()
    expect(screen.getByText('Learners')).toBeInTheDocument()
    expect(screen.getByText('Skill Categories')).toBeInTheDocument()
    expect(screen.getByText('Satisfaction Rate')).toBeInTheDocument()
  })
})

// ─── ExploreCategoryGrid ────────────────────────────────────────────────────

describe('ExploreCategoryGrid', () => {
  it('renders all category labels', async () => {
    renderWithRouter(
      <ExploreCategoryGrid activeCategory={null} onCategoryChange={() => {}} />
    )
    await waitFor(() => {
      ;[
        'Design',
        'Development',
        'Business',
        'Marketing',
        'Growth',
        'Music',
      ].forEach((cat) => {
        expect(screen.getByText(cat)).toBeInTheDocument()
      })
    })
  })

  it('calls onCategoryChange when a category is clicked', async () => {
    const onChange = vi.fn()
    renderWithRouter(
      <ExploreCategoryGrid activeCategory={null} onCategoryChange={onChange} />
    )
    await waitFor(() => {
      expect(screen.getByText('Design')).toBeInTheDocument()
    })
    fireEvent.click(screen.getByText('Design'))
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'Design' })
    )
  })

  it('toggles off active category when clicked again', async () => {
    const onChange = vi.fn()
    renderWithRouter(
      <ExploreCategoryGrid activeCategory="cat1" onCategoryChange={onChange} />
    )
    await waitFor(() => {
      expect(screen.getByText('Design')).toBeInTheDocument()
    })
    fireEvent.click(screen.getByText('Design'))
    expect(onChange).toHaveBeenCalledWith(null)
  })
})

// ─── MentorCard ─────────────────────────────────────────────────────────────

describe('MentorCard', () => {
  const mockMentor = {
    _id: '1',
    name: 'Sarah Jenkins',
    skillTags: ['UX Design', 'Figma', 'Career'],
    averageRating: 4.9,
    description: 'Expert in user research.',
  }

  it('renders mentor tags', () => {
    renderWithRouter(<MentorCard mentor={mockMentor} />)
    expect(screen.getByText('UX Design')).toBeInTheDocument()
    expect(screen.getByText('Figma')).toBeInTheDocument()
    expect(screen.getByText('Career')).toBeInTheDocument()
  })

  it('renders Chat and View Profile buttons', () => {
    renderWithRouter(<MentorCard mentor={mockMentor} />)
    expect(screen.getByRole('button', { name: /Chat/i })).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /View Profile/i })
    ).toBeInTheDocument()
  })

  it('renders rating and reviews count', () => {
    renderWithRouter(<MentorCard mentor={mockMentor} />)
    expect(screen.getByText('4.9')).toBeInTheDocument()
  })
})

// ─── MentorGrid ─────────────────────────────────────────────────────────────

describe('MentorGrid', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders filter pills', async () => {
    renderWithRouter(<MentorGrid searchQuery="" />)
    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: /All Members/i })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('button', { name: /Top Rated/i })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('button', { name: /Newest/i })
      ).toBeInTheDocument()
    })
  })

  it('renders at least one mentor card by default', async () => {
    renderWithRouter(<MentorGrid searchQuery="" />)
    await waitFor(() => {
      expect(
        screen.getAllByRole('button', { name: /View Profile/i }).length
      ).toBeGreaterThan(0)
    })
  })

  it('filters mentors by search query', async () => {
    renderWithRouter(<MentorGrid searchQuery="Swift" />)
    await waitFor(() => {
      expect(screen.getByText('Lena Mueller')).toBeInTheDocument()
      expect(screen.queryByText('Sarah Jenkins')).not.toBeInTheDocument()
    })
  })

  it('shows empty state when search has no results', async () => {
    renderWithRouter(<MentorGrid searchQuery="xyznotexist" />)
    await waitFor(() => {
      expect(screen.getByText(/No members found/i)).toBeInTheDocument()
      expect(
        screen.getByRole('button', { name: /Clear filters/i })
      ).toBeInTheDocument()
    })
  })

  it('filters to top rated mentors when "Top Rated" is clicked', async () => {
    renderWithRouter(<MentorGrid searchQuery="" />)
    await waitFor(() => {
      expect(screen.getByText('Sarah Jenkins')).toBeInTheDocument()
    })
    const topRatedButton = screen.getByRole('button', { name: /Top Rated/i })
    fireEvent.click(topRatedButton)
    await waitFor(() => {
      expect(fetchUsersService).toHaveBeenCalledWith(
        expect.objectContaining({ sort: '-averageRating' })
      )
    })
  })

  it('renders Load More button', async () => {
    renderWithRouter(<MentorGrid searchQuery="" />)
    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: /Load More Members/i })
      ).toBeInTheDocument()
    })
  })
})
