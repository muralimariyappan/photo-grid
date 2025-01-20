import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import HomePage from '../index'
 
describe('Page', () => {
  it('renders a heading', () => {
    render(<HomePage />)
 
    const heading = screen.getByRole('heading', { name: "Photo Gallery" })
 
    expect(heading).toBeInTheDocument()
  })
})