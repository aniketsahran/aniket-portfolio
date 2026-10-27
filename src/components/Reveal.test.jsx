import { afterEach, expect, test, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Reveal from './Reveal.jsx'

afterEach(() => {
  vi.restoreAllMocks()
})

test('always renders its children regardless of animation state', () => {
  render(
    <Reveal>
      <p>hello</p>
    </Reveal>,
  )
  expect(screen.getByText('hello')).toBeInTheDocument()
})

test('renders the element tag requested via the `as` prop', () => {
  render(
    <Reveal as="section" data-testid="wrap">
      <p>inside</p>
    </Reveal>,
  )
  expect(screen.getByTestId('wrap').tagName).toBe('SECTION')
})

test('under reduced motion, renders content with no hidden opacity animation', () => {
  // Force prefers-reduced-motion: reduce for this render.
  vi.spyOn(window, 'matchMedia').mockImplementation((query) => ({
    matches: true,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  }))

  render(
    <Reveal data-testid="wrap">
      <p>visible now</p>
    </Reveal>,
  )

  // Content is present and the wrapper is not left hidden (no opacity:0 that an
  // IntersectionObserver would need to clear — observers never fire in jsdom).
  expect(screen.getByText('visible now')).toBeInTheDocument()
  expect(screen.getByTestId('wrap').style.opacity).not.toBe('0')
})
