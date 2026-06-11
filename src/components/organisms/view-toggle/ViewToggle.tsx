import * as React from 'react'
import { cn } from '@/lib/utils'

export type ViewMode = 'list' | 'tree'

export interface ViewToggleProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value: ViewMode
  onChange: (mode: ViewMode) => void
}

const ViewToggle = React.forwardRef<HTMLDivElement, ViewToggleProps>(
  ({ className, value, onChange, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="group"
        aria-label="View mode"
        className={cn(
          'flex h-[38px] w-[219px] shrink-0 items-center gap-0.5 rounded-[10px] border border-[var(--color-border)] bg-[var(--color-neutral-100)] p-1',
          className
        )}
        {...props}
      >
        <button
          type="button"
          aria-pressed={value === 'list'}
          onClick={() => onChange('list')}
          className={cn(
            'flex h-full flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-[13px] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)]',
            value === 'list'
              ? 'bg-white font-semibold text-[var(--color-text-primary)] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.06)]'
              : 'font-medium text-[var(--color-text-tertiary)] hover:bg-white/50'
          )}
        >
          <span
            className={cn(
              'size-3 shrink-0 rounded-[3px]',
              value === 'list' ? 'bg-[var(--color-primary-600)]' : 'bg-[var(--color-neutral-400)]'
            )}
            aria-hidden="true"
          />
          List View
        </button>

        <button
          type="button"
          aria-pressed={value === 'tree'}
          onClick={() => onChange('tree')}
          className={cn(
            'flex h-full flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-[13px] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)]',
            value === 'tree'
              ? 'bg-white font-semibold text-[var(--color-text-primary)] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.06)]'
              : 'font-medium text-[var(--color-text-tertiary)] hover:bg-white/50'
          )}
        >
          <span
            className={cn(
              'size-3 shrink-0 rounded-[3px]',
              value === 'tree' ? 'bg-[var(--color-primary-600)]' : 'bg-[var(--color-neutral-400)]'
            )}
            aria-hidden="true"
          />
          Tree Chart
        </button>
      </div>
    )
  }
)
ViewToggle.displayName = 'ViewToggle'

export { ViewToggle }
