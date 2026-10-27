import { render, screen } from '@testing-library/react'
import Reveal from './Reveal.jsx'

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
