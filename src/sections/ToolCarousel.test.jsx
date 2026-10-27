import { render, screen } from '@testing-library/react'
import ToolCarousel from './ToolCarousel.jsx'

test('renders within a #skills section', () => {
  const { container } = render(<ToolCarousel />)
  expect(container.querySelector('#skills')).not.toBeNull()
})

test('renders tools in one carousel with no category subheadings', () => {
  render(<ToolCarousel />)
  expect(screen.getAllByText('Golang').length).toBeGreaterThanOrEqual(1)
  expect(screen.getAllByText('Docker').length).toBeGreaterThanOrEqual(1)
  // the old grouped layout is gone
  expect(screen.queryByText('Languages')).toBeNull()
  expect(screen.queryByText('Frameworks')).toBeNull()
})

test('a logo-less tool renders as a circle with a monogram, no logo image node', () => {
  render(<ToolCarousel />)
  const circle = screen.getAllByText('Uber Cadence')[0].closest('.tool-circle')
  expect(circle).not.toBeNull()
  expect(circle.querySelector('.tool-circle__logo')).toBeNull()
})
