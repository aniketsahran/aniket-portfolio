import { render, screen } from '@testing-library/react'
import About from './About.jsx'

test('renders within an #about section', () => {
  const { container } = render(<About />)
  expect(container.querySelector('#about')).not.toBeNull()
})

test('renders education with CGPA and institute', () => {
  render(<About />)
  expect(screen.getByText(/9\.39/)).toBeInTheDocument()
  expect(
    screen.getByText(/Thapar Institute of Engineering and Technology/i),
  ).toBeInTheDocument()
})

test('renders an achievement highlight', () => {
  render(<About />)
  expect(screen.getByText(/Merit Award/i)).toBeInTheDocument()
})

test('renders the portrait (moved here from the hero)', () => {
  render(<About />)
  expect(screen.getByRole('img', { name: /Aniket Sahran/i })).toBeInTheDocument()
})
