import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Nav from './Nav.jsx'

function renderNav(route = '/') {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <Nav />
    </MemoryRouter>,
  )
}

test('renders a downloadable CV link to the résumé PDF', () => {
  renderNav()
  const cv = screen.getByRole('link', { name: /CV/i })
  expect(cv.getAttribute('href')).toMatch(/Aniket_Resume\.pdf$/)
  expect(cv).toHaveAttribute('download')
})

test('renders the primary section links', () => {
  renderNav()
  expect(screen.getByRole('link', { name: /^Work$/i })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /^About$/i })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /Beyond Code/i })).toBeInTheDocument()
})
