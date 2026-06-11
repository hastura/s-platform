'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ModalFooterButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
}

/** Token-based modal footer button — matches settings modal Figma actions. */
export function ModalFooterButton({
  variant = 'primary',
  className,
  disabled,
  children,
  ...props
}: ModalFooterButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={cn(
        'flex h-[42px] max-w-[300px] flex-1 items-center justify-center gap-[var(--space-2)] rounded-[var(--radius-md)] px-[var(--space-6)] py-[var(--space-1-5)] text-[var(--font-size-sm)] font-normal leading-[21px] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)] focus-visible:ring-offset-2 disabled:pointer-events-none',
        variant === 'primary' &&
          cn(
            'bg-[var(--color-primary-600)] text-[var(--color-text-inverse)] shadow-[var(--shadow-button-primary)] hover:bg-[var(--color-primary-700)]',
            disabled && 'opacity-40 text-[var(--color-primary-200)]'
          ),
        variant === 'secondary' &&
          cn(
            'border border-[var(--color-primary-600)] bg-[var(--color-surface)] text-[var(--color-primary-600)] hover:bg-[var(--color-primary-50)]',
            disabled && 'opacity-50'
          ),
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
