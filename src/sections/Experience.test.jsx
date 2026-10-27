import { render, screen } from '@testing-library/react'
import Experience from './Experience.jsx'

test('renders both Cloudera roles', () => {
  render(<Experience />)
  expect(screen.getByText(/Software Developer - II/i)).toBeInTheDocument()
  expect(screen.getByText(/Software Development Intern/i)).toBeInTheDocument()
})

test('renders a signature bullet', () => {
  render(<Experience />)
  expect(screen.getByText(/Kubernetes operator/i)).toBeInTheDocument()
})
