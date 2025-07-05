import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from './Button'

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    fireEvent.click(screen.getByText('Click me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('does not call onClick when disabled', () => {
    const handleClick = vi.fn()
    render(
      <Button onClick={handleClick} disabled>
        Click me
      </Button>
    )
    
    fireEvent.click(screen.getByText('Click me'))
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('applies correct variant classes', () => {
    const { rerender } = render(<Button variant="primary">Button</Button>)
    expect(screen.getByText('Button')).toHaveClass('bg-blue-600')
    
    rerender(<Button variant="danger">Button</Button>)
    expect(screen.getByText('Button')).toHaveClass('bg-red-600')
  })

  it('applies correct size classes', () => {
    const { rerender } = render(<Button size="small">Button</Button>)
    expect(screen.getByText('Button')).toHaveClass('px-3')
    
    rerender(<Button size="large">Button</Button>)
    expect(screen.getByText('Button')).toHaveClass('px-6')
  })

  it('sets correct button type', () => {
    render(<Button type="submit">Submit</Button>)
    expect(screen.getByText('Submit')).toHaveAttribute('type', 'submit')
  })

  it('applies custom className', () => {
    render(<Button className="custom-class">Button</Button>)
    expect(screen.getByText('Button')).toHaveClass('custom-class')
  })

  it('sets aria-label when provided', () => {
    render(<Button ariaLabel="Close dialog">X</Button>)
    expect(screen.getByText('X')).toHaveAttribute('aria-label', 'Close dialog')
  })
})