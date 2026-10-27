import { render, screen } from '@testing-library/react'
import BeyondCode from './BeyondCode.jsx'

test('renders within a #beyond section', () => {
  const { container } = render(<BeyondCode />)
  expect(container.querySelector('#beyond')).not.toBeNull()
})

test('renders the volunteering org and leadership role', () => {
  render(<BeyondCode />)
  expect(screen.getByText(/Cloudera Cares/i)).toBeInTheDocument()
  expect(screen.getByText(/General Secretary/i)).toBeInTheDocument()
})

test('every gallery image has meaningful alt text', () => {
  const { container } = render(<BeyondCode />)
  const imgs = [...container.querySelectorAll('img')]
  expect(imgs.length).toBeGreaterThan(0)
  imgs.forEach((img) => {
    expect(img.getAttribute('alt')?.trim().length ?? 0).toBeGreaterThan(0)
  })
})
