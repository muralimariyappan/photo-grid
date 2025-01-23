import '@testing-library/jest-dom'
import { act, render, screen } from '@testing-library/react'
import HomePage from '../pages/index'
 
describe('Page', () => {
  it('should render heading for the page', async () => {
    await act(async () => {
      render(<HomePage />)
    })
 
    const heading = screen.getByRole('heading', { name: "Photo Gallery" })
 
    expect(heading).toBeInTheDocument()
  })
})