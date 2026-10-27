import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from '../App.jsx'

test('renders the site with the owner name present', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  )
  // The name appears in several places once the full page mounts (hero,
  // portrait alt, footer); assert it is present at least once.
  expect(screen.getAllByText(/Aniket Sahran/i).length).toBeGreaterThan(0)
})
