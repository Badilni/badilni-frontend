import { fireEvent, render, screen, act } from '@testing-library/react'
import Home from '../pages/Home'
import { HashRouter } from 'react-router-dom'
import { vi, afterEach } from 'vitest'

vi.mock('../components/common/Spinner', () => ({
  default: () => <div data-testid="spinner">Spinner</div>,
}))

describe('Home Page', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    render(
      <HashRouter>
        <Home />
      </HashRouter>
    )
    act(() => {
      vi.advanceTimersByTime(5000)
    })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('Should find first content section', () => {
    const firstSection = screen.getAllByText('Badilni')
    expect(firstSection[0]).toBeInTheDocument()
  })
  it('Should find second content section', () => {
    const secondSection = screen.getByText('Second Section')
    expect(secondSection).toBeInTheDocument()
  })
})
