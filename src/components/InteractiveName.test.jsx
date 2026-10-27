import { render, screen } from '@testing-library/react'
import InteractiveName from './InteractiveName.jsx'

test('exposes the full name as readable text for assistive tech', () => {
  const { container } = render(<InteractiveName text="Aniket Sahran" />)
  // Full text is present for screen readers (not split across aria-hidden glyphs).
  expect(screen.getByText('Aniket Sahran')).toBeInTheDocument()
  // Visual glyphs exist and are hidden from the accessibility tree.
  expect(container.querySelectorAll('[aria-hidden="true"]').length).toBeGreaterThan(0)
})
