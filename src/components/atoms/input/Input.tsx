import * as React from 'react'
import { cn } from '@/lib/utils'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  /** Figma modal field: 40px height, 6px radius, #CBD5E1 border */
  variant?: 'default' | 'field'
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', variant = 'default', ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          'flex w-full bg-[var(--color-surface)] px-[var(--space-4)] text-[var(--font-size-sm)] text-[var(--color-text-primary)]',
          variant === 'default' && 'h-11 rounded-[var(--radius-lg)] border border-[var(--color-border)] py-2',
          variant === 'field' && 'h-10 rounded-[var(--radius-md)] border border-[var(--color-neutral-300)] py-[10px]',
          'placeholder:text-[var(--color-text-tertiary)]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)] focus-visible:border-[var(--color-primary-300)]',
          'disabled:cursor-not-allowed disabled:opacity-50 transition-all',
          className
        )}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

export { Input }
