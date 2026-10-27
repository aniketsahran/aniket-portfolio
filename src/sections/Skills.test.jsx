import { render, screen } from '@testing-library/react'
import Skills from './Skills.jsx'

test('renders the Languages group with Golang', () => {
  render(<Skills />)
  expect(screen.getByText('Languages')).toBeInTheDocument()
  expect(screen.getByText('Golang')).toBeInTheDocument()
})

test('renders the Deployment group with Kubernetes', () => {
  render(<Skills />)
  expect(screen.getByText('Deployment')).toBeInTheDocument()
  expect(screen.getByText('Kubernetes')).toBeInTheDocument()
})
