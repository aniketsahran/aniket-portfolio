import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import ProjectDetail from './ProjectDetail.jsx'

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/projects/:slug" element={<ProjectDetail />} />
      </Routes>
    </MemoryRouter>,
  )
}

test('renders a known project with its name and repo link', () => {
  renderAt('/projects/filmpire')
  expect(screen.getByRole('heading', { name: /Filmpire/i })).toBeInTheDocument()
  const repo = screen.getByRole('link', { name: /repo|github|code/i })
  expect(repo.getAttribute('href')).toContain('github.com/aniketsahran')
})

test('renders a graceful not-found for an unknown slug', () => {
  renderAt('/projects/nope')
  expect(screen.getByText(/not found/i)).toBeInTheDocument()
  const home = screen.getByRole('link', { name: /home|back/i })
  expect(home.getAttribute('href')).toBe('/')
})
