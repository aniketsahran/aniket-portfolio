import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Projects from './Projects.jsx'

function renderProjects() {
  return render(
    <MemoryRouter>
      <Projects />
    </MemoryRouter>,
  )
}

test('renders within a #work section', () => {
  const { container } = renderProjects()
  expect(container.querySelector('#work')).not.toBeNull()
})

test('renders three project cards linking to their detail pages', () => {
  renderProjects()
  const links = screen.getAllByRole('link')
  const hrefs = links.map((l) => l.getAttribute('href'))
  expect(hrefs).toContain('/projects/filmpire')
  expect(hrefs).toContain('/projects/student-management-system')
  expect(hrefs).toContain('/projects/noterrrr')
})
