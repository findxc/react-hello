import { render, screen } from '@testing-library/react'
import NoMatch from './index'

test('renders 404', () => {
  render(<NoMatch />)
  const noMatchEle = screen.getByText(/404/)
  expect(noMatchEle).toBeInTheDocument()
})
