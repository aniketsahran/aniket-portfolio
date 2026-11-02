import { render, screen } from '@testing-library/react'
import Hero from './Hero.jsx'

test('renders the one headline sentence', () => {
  render(<Hero />)
  expect(
    screen.getByText(/I build the infrastructure that AI agents run on\./i),
  ).toBeInTheDocument()
})

test('renders the name as the interactive centerpiece', () => {
  render(<Hero />)
  expect(screen.getByText('Aniket Sahran')).toBeInTheDocument()
})

test('renders the portrait in the hero', () => {
  render(<Hero />)
  expect(screen.getByRole('img', { name: /Aniket Sahran/i })).toBeInTheDocument()
})

test('renders CV download and view-work CTAs', () => {
  render(<Hero />)
  const cv = screen.getByRole('link', { name: /Download CV/i })
  expect(cv.getAttribute('href')).toMatch(/Aniket_Resume\.pdf$/)
  expect(cv).toHaveAttribute('download')

  const work = screen.getByRole('link', { name: /View my work/i })
  expect(work.getAttribute('href')).toBe('#work')
})
