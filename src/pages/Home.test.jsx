import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Home from './Home.jsx'

function renderHome() {
  return render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>,
  )
}

test('mounts every section anchor exactly once', () => {
  const { container } = renderHome()
  for (const id of ['about', 'work', 'beyond', 'contact']) {
    expect(container.querySelectorAll(`#${id}`).length).toBe(1)
  }
})
