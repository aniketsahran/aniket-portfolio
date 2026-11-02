import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from '../App.jsx'

test('an unknown route renders a not-found page with a link home', () => {
  render(
    <MemoryRouter initialEntries={['/totally-unknown-page']}>
      <App />
    </MemoryRouter>,
  )
  expect(screen.getByText(/not found/i)).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /home/i }).getAttribute('href')).toBe('/')
})
