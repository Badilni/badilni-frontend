import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AdvancedResultsView from '../components/AdvancedSearch/searchResultView'
import { extractCollection } from '../hooks/AdvancedSearch/useSearchHeader'

const renderWithRouter = (ui) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>{ui}</MemoryRouter>
    </QueryClientProvider>
  )
}

describe('AdvancedResultsView', () => {
  it('extracts arrays from wrapped data payloads', () => {
    expect(
      extractCollection({ data: { users: [{ id: 'u1' }] } }, ['users', 'data'])
    ).toEqual([{ id: 'u1' }])
    expect(
      extractCollection({ data: [{ id: 'o1' }] }, ['skillListings', 'data'])
    ).toEqual([{ id: 'o1' }])
  })

  it('renders grouped people, offers and requests sections for all results', () => {
    renderWithRouter(
      <AdvancedResultsView
        searchResults={[
          {
            kind: 'people',
            data: { _id: 'p1', name: 'Anna', averageRating: 4.8 },
          },
          {
            kind: 'offers',
            data: {
              _id: 'o1',
              title: 'Design help',
              description: 'Great help',
              user: { name: 'Mina' },
            },
          },
          {
            kind: 'requests',
            data: {
              _id: 'r1',
              title: 'Need a logo',
              description: 'Design work',
              user: { name: 'Lina' },
            },
          },
        ]}
        resultsLoading={false}
        currentPage={1}
        totalPages={1}
        setCurrentPage={() => {}}
        totalResults={3}
        onFilterAll={() => {}}
        onFilterPeople={() => {}}
        onFilterOffers={() => {}}
        onFilterRequests={() => {}}
        currentFilter="all"
        queryKeyword="design"
      />
    )

    expect(
      screen.getByRole('button', { name: /all results/i })
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /people/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /offers/i })).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /requests/i })
    ).toBeInTheDocument()
    expect(screen.getAllByText(/people/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/offers/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/requests/i).length).toBeGreaterThan(0)
  })
})
