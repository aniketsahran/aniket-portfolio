import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import MagneticButton from './MagneticButton.jsx'

test('renders an anchor with its href when href is given', () => {
  render(
    <MagneticButton href="/cv.pdf" download>
      Download CV
    </MagneticButton>,
  )
  const link = screen.getByRole('link', { name: /Download CV/i })
  expect(link.getAttribute('href')).toBe('/cv.pdf')
  expect(link).toHaveAttribute('download')
})

test('renders a button and fires onClick when no href', () => {
  const onClick = vi.fn()
  render(<MagneticButton onClick={onClick}>Send</MagneticButton>)
  const btn = screen.getByRole('button', { name: /Send/i })
  fireEvent.click(btn)
  expect(onClick).toHaveBeenCalledTimes(1)
})
