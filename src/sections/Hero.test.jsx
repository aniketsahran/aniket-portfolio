import { render, screen } from '@testing-library/react'
import Hero from './Hero.jsx'

const TAGLINE =
  "I turn hard systems problems into reliable software — and I'll happily learn whatever the next one needs."

test('renders the verbatim tagline', () => {
  render(<Hero />)
  expect(screen.getByText(TAGLINE)).toBeInTheDocument()
})

test('renders the name as the interactive centerpiece', () => {
  render(<Hero />)
  expect(screen.getByText('Aniket Sahran')).toBeInTheDocument()
})

test('no portrait image in the hero (moved to About)', () => {
  render(<Hero />)
  expect(screen.queryByRole('img', { name: /Aniket Sahran/i })).toBeNull()
})

test('renders CV download and view-work CTAs', () => {
  render(<Hero />)
  const cv = screen.getByRole('link', { name: /Download CV/i })
  expect(cv.getAttribute('href')).toMatch(/Aniket_Resume\.pdf$/)
  expect(cv).toHaveAttribute('download')

  const work = screen.getByRole('link', { name: /View my work/i })
  expect(work.getAttribute('href')).toBe('#work')
})
