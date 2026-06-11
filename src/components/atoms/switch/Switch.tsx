'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface SwitchProps {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  disabled?: boolean
  'aria-label': string
  className?: string
}

/** Accessible toggle switch — matches the Figma member status toggle (30×17). */
const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ checked, onCheckedChange, disabled = false, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onCheckedChange(!checked)}
        className={cn(
          'relative inline-flex h-[17px] w-[30px] shrink-0 items-center rounded-full transition-colors duration-[var(--duration-normal)]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)] focus-visible:ring-offset-2',
          checked ? 'bg-[var(--color-success-500)]' : 'bg-[var(--color-neutral-300)]',
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
        {...props}
      >
        <span
          className={cn(
            'pointer-events-none block h-[13px] w-[13px] rounded-full bg-white shadow-[var(--shadow-sm)] transition-transform duration-[var(--duration-normal)]',
            checked ? 'translate-x-[15px]' : 'translate-x-[2px]'
          )}
        />
      </button>
    )
  }
)
Switch.displayName = 'Switch'

export { Switch }
