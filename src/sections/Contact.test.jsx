import { render, screen } from '@testing-library/react'
import Contact from './Contact.jsx'

test('renders labelled form fields', () => {
  render(<Contact />)
  expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/subject/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
})

test('renders social and email links', () => {
  render(<Contact />)
  const links = screen.getAllByRole('link').map((l) => l.getAttribute('href'))
  expect(links.some((h) => h?.includes('linkedin.com'))).toBe(true)
  expect(links.some((h) => h?.includes('github.com/aniketsahran'))).toBe(true)
  expect(links.some((h) => h?.startsWith('mailto:aniketsahran3@gmail.com'))).toBe(true)
})
