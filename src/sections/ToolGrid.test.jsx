import { render, screen } from '@testing-library/react'
import ToolGrid from './ToolGrid.jsx'

test('renders within a #skills section', () => {
  const { container } = render(<ToolGrid />)
  expect(container.querySelector('#skills')).not.toBeNull()
})

test('renders a group label and a tool chip with an accessible name', () => {
  render(<ToolGrid />)
  expect(screen.getByText('Languages')).toBeInTheDocument()
  expect(screen.getByText('Golang')).toBeInTheDocument()
})

test('a tool with no logo renders as text with no logo image node', () => {
  const { container } = render(<ToolGrid />)
  // Uber Cadence has slug: null → chip present, but no mask/img logo element.
  const chip = screen.getByText('Uber Cadence').closest('.tool-chip')
  expect(chip).not.toBeNull()
  expect(chip.querySelector('.tool-chip__logo')).toBeNull()
})
