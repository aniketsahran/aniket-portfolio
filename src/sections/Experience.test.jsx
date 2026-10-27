import { afterEach, expect, test, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Experience from './Experience.jsx'

afterEach(() => {
  vi.restoreAllMocks()
})

test('renders both Cloudera roles', () => {
  render(<Experience />)
  expect(screen.getByText(/Software Developer - II/i)).toBeInTheDocument()
  expect(screen.getByText(/Software Development Intern/i)).toBeInTheDocument()
})

test('renders a signature bullet', () => {
  render(<Experience />)
  expect(screen.getByText(/Kubernetes operator/i)).toBeInTheDocument()
})

test('under reduced motion, renders all roles in the static fallback (no throw)', () => {
  vi.spyOn(window, 'matchMedia').mockImplementation((query) => ({
    matches: /prefers-reduced-motion/.test(query),
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  }))
  render(<Experience />)
  expect(screen.getByText(/Software Developer - II/i)).toBeInTheDocument()
  expect(screen.getByText(/Software Development Intern/i)).toBeInTheDocument()
})
