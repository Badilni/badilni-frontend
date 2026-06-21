import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { HashRouter } from 'react-router-dom'
import ExploreHero from '../components/explore/ExploreHero'
import ExploreStats from '../components/explore/ExploreStats'
import ExploreCategoryGrid from '../components/explore/ExploreCategoryGrid'
import MentorCard from '../components/explore/MentorCard'
import MentorGrid from '../components/explore/MentorGrid'

// ─── Helpers ────────────────────────────────────────────────────────────────

const MOCK_MENTOR = {
  id: 1,
  name: 'Sarah Jenkins',
  role: 'Senior Product Designer',
  company: 'Google',
  rating: 4.9,
  reviews: 128,
  tags: ['UX Design', 'Figma', 'Career'],
  bio: 'Expert in user research and scalable design systems.',
  price: null,
  available: true,
  avatar: '',
  tagColor: 'bg-blue-50 text-blue-700',
  accentColor: 'from-blue-500 to-indigo-600',
}

const withRouter = (ui) => <HashRouter>{ui}</HashRouter>

// ─── ExploreHero ────────────────────────────────────────────────────────────

describe('ExploreHero', () => {
  it('renders headline and search button', () => {
    render(withRouter(<ExploreHero onSearch={() => {}} />))
    expect(screen.getByText(/Learn anything from/i)).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /Search Mentors/i })
    ).toBeInTheDocument()
  })

  it('renders search input fields', () => {
    render(withRouter(<ExploreHero onSearch={() => {}} />))
    expect(
      screen.getByPlaceholderText(/Skill, tool, or mentor name/i)
    ).toBeInTheDocument()
    expect(
      screen.getByPlaceholderText(/Location or Remote/i)
    ).toBeInTheDocument()
  })

  it('calls onSearch with typed value when button clicked', () => {
    const onSearch = vi.fn()
    render(withRouter(<ExploreHero onSearch={onSearch} />))

    fireEvent.change(
      screen.getByPlaceholderText(/Skill, tool, or mentor name/i),
      {
        target: { value: 'React' },
      }
    )
    fireEvent.click(screen.getByRole('button', { name: /Search Mentors/i }))
    expect(onSearch).toHaveBeenCalledWith('React')
  })

  it('calls onSearch when Enter key is pressed in search input', () => {
    const onSearch = vi.fn()
    render(withRouter(<ExploreHero onSearch={onSearch} />))

    const input = screen.getByPlaceholderText(/Skill, tool, or mentor name/i)
    fireEvent.change(input, { target: { value: 'Python' } })
    fireEvent.keyDown(input, { key: 'Enter' })
    expect(onSearch).toHaveBeenCalledWith('Python')
  })

  it('renders popular tag buttons', () => {
    render(withRouter(<ExploreHero onSearch={() => {}} />))
    expect(
      screen.getByRole('button', { name: /React.js/i })
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Python/i })).toBeInTheDocument()
  })

  it('clicking a popular tag calls onSearch with that tag', () => {
    const onSearch = vi.fn()
    render(withRouter(<ExploreHero onSearch={onSearch} />))

    fireEvent.click(screen.getByRole('button', { name: /UI Design/i }))
    expect(onSearch).toHaveBeenCalledWith('UI Design')
  })
})

// ─── ExploreStats ───────────────────────────────────────────────────────────

describe('ExploreStats', () => {
  it('renders all four stat values', () => {
    render(<ExploreStats />)
    expect(screen.getByText('2,450+')).toBeInTheDocument()
    expect(screen.getByText('50k+')).toBeInTheDocument()
    expect(screen.getByText('120+')).toBeInTheDocument()
    expect(screen.getByText('98%')).toBeInTheDocument()
  })

  it('renders all four stat labels', () => {
    render(<ExploreStats />)
    expect(screen.getByText('Expert Mentors')).toBeInTheDocument()
    expect(screen.getByText('Learners')).toBeInTheDocument()
    expect(screen.getByText('Skill Categories')).toBeInTheDocument()
    expect(screen.getByText('Satisfaction Rate')).toBeInTheDocument()
  })
})

// ─── ExploreCategoryGrid ────────────────────────────────────────────────────

describe('ExploreCategoryGrid', () => {
  it('renders all category labels', () => {
    render(
      <ExploreCategoryGrid activeCategory={null} onCategoryChange={() => {}} />
    )
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

  it('calls onCategoryChange when a category is clicked', () => {
    const onChange = vi.fn()
    render(
      <ExploreCategoryGrid activeCategory={null} onCategoryChange={onChange} />
    )
    fireEvent.click(screen.getByText('Design'))
    expect(onChange).toHaveBeenCalledWith('design')
  })

  it('toggles off active category when clicked again', () => {
    const onChange = vi.fn()
    render(
      <ExploreCategoryGrid
        activeCategory="design"
        onCategoryChange={onChange}
      />
    )
    fireEvent.click(screen.getByText('Design'))
    expect(onChange).toHaveBeenCalledWith(null)
  })
})

// ─── MentorCard ─────────────────────────────────────────────────────────────

describe('MentorCard', () => {
  it('renders mentor name, role and company', () => {
    render(<MentorCard mentor={MOCK_MENTOR} />)
    expect(screen.getByText('Sarah Jenkins')).toBeInTheDocument()
    expect(screen.getByText(/Senior Product Designer/i)).toBeInTheDocument()
    expect(screen.getByText('Google')).toBeInTheDocument()
  })

  it('renders mentor tags', () => {
    render(<MentorCard mentor={MOCK_MENTOR} />)
    expect(screen.getByText('UX Design')).toBeInTheDocument()
    expect(screen.getByText('Figma')).toBeInTheDocument()
  })

  it('shows "Free Session" when price is null', () => {
    render(<MentorCard mentor={MOCK_MENTOR} />)
    expect(screen.getByText(/Free Session/i)).toBeInTheDocument()
  })

  it('shows price when mentor has a price', () => {
    render(<MentorCard mentor={{ ...MOCK_MENTOR, price: 40 }} />)
    expect(screen.getByText('$40')).toBeInTheDocument()
    expect(screen.getByText('/ session')).toBeInTheDocument()
  })

  it('shows Available badge when mentor is available', () => {
    render(<MentorCard mentor={MOCK_MENTOR} />)
    expect(screen.getByText(/Available/i)).toBeInTheDocument()
  })

  it('does not show Available badge when mentor is unavailable', () => {
    render(<MentorCard mentor={{ ...MOCK_MENTOR, available: false }} />)
    expect(screen.queryByText(/Available/i)).not.toBeInTheDocument()
  })

  it('renders a View Profile button', () => {
    render(<MentorCard mentor={MOCK_MENTOR} />)
    expect(
      screen.getByRole('button', { name: /View Profile/i })
    ).toBeInTheDocument()
  })

  it('renders rating and review count', () => {
    render(<MentorCard mentor={MOCK_MENTOR} />)
    expect(screen.getByText('4.9')).toBeInTheDocument()
    expect(screen.getByText('(128)')).toBeInTheDocument()
  })
})

// ─── MentorGrid ─────────────────────────────────────────────────────────────

describe('MentorGrid', () => {
  it('renders filter pills', () => {
    render(<MentorGrid searchQuery="" />)
    expect(
      screen.getByRole('button', { name: /All Mentors/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /Available Now/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /Top Rated/i })
    ).toBeInTheDocument()
  })

  it('renders at least one mentor card by default', () => {
    render(<MentorGrid searchQuery="" />)
    expect(
      screen.getAllByRole('button', { name: /View Profile/i }).length
    ).toBeGreaterThan(0)
  })

  it('filters mentors by search query', () => {
    render(<MentorGrid searchQuery="Swift" />)
    expect(screen.getByText('Lena Mueller')).toBeInTheDocument()
    expect(screen.queryByText('Carlos Mendez')).not.toBeInTheDocument()
  })

  it('shows empty state when search has no results', () => {
    render(<MentorGrid searchQuery="xyznotexist" />)
    expect(screen.getByText(/No mentors found/i)).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /Clear filters/i })
    ).toBeInTheDocument()
  })

  it('filters to available mentors when "Available Now" is clicked', () => {
    render(<MentorGrid searchQuery="" />)
    fireEvent.click(screen.getByRole('button', { name: /Available Now/i }))
    // All shown mentor cards should only be available ones
    expect(screen.queryByText('Alex Rivera')).not.toBeInTheDocument() // not available
  })

  it('renders Load More button', () => {
    render(<MentorGrid searchQuery="" />)
    expect(
      screen.getByRole('button', { name: /Load More Mentors/i })
    ).toBeInTheDocument()
  })
})
