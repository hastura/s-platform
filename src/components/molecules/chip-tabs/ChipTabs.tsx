'use client'

import { cn } from '@/lib/utils'

export interface ChipTabItem {
  value: string
  label: string
}

export interface ChipTabsProps {
  items: ChipTabItem[]
  value: string
  onValueChange: (value: string) => void
  'aria-label': string
  /**
   * lg: standalone pill chips (Figma Chip-Data/LG — page-level scope tabs).
   * filter: chips inside a subtle pill container (Figma tab/filter — Dept/Team/Employee).
   */
  variant?: 'lg' | 'filter'
  /** Competency screens use accent indigo instead of primary blue. */
  colorScheme?: 'primary' | 'accent'
  className?: string
}

/** Pill chip tab group used for page scope switching and table filters. */
export function ChipTabs({
  items,
  value,
  onValueChange,
  variant = 'lg',
  colorScheme = 'primary',
  className,
  ...props
}: ChipTabsProps) {
  function handleKeyDown(e: React.KeyboardEvent) {
    const currentIndex = items.findIndex((item) => item.value === value)
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault()
      onValueChange(items[(currentIndex + 1) % items.length].value)
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault()
      onValueChange(items[(currentIndex - 1 + items.length) % items.length].value)
    }
  }

  function chipClassName(active: boolean) {
    if (variant === 'lg') {
      return cn(
        'flex h-[32px] items-center justify-center rounded-[var(--radius-full)] px-[var(--space-4)] py-[var(--space-1)] font-jakarta text-[var(--font-size-sm)] font-semibold tracking-[0.035px] shadow-[var(--shadow-elevation-02)] transition-all focus-visible:outline-none focus-visible:ring-2',
        active
          ? colorScheme === 'accent'
            ? 'bg-accent-600 text-white focus-visible:ring-accent-500'
            : 'bg-[var(--color-primary-600)] text-white focus-visible:ring-[var(--color-primary-500)]'
          : 'text-[var(--color-neutral-400)] hover:bg-[var(--color-neutral-100)] hover:text-[var(--color-neutral-600)] focus-visible:ring-[var(--color-primary-500)]'
      )
    }

    return cn(
      'flex h-[24px] items-center justify-center rounded-[var(--radius-full)] px-[var(--space-3)] font-jakarta text-[var(--font-size-xs)] tracking-[0.09px] transition-all focus-visible:outline-none focus-visible:ring-2',
      active
        ? colorScheme === 'accent'
          ? 'border border-accent-600 bg-[var(--color-surface)] font-bold leading-[18px] text-accent-600 focus-visible:ring-accent-500'
          : 'border border-[var(--color-primary-600)] bg-[var(--color-surface)] font-bold leading-[18px] text-[var(--color-primary-600)] focus-visible:ring-[var(--color-primary-500)]'
        : 'font-normal leading-[18px] text-[var(--color-neutral-400)] hover:text-[var(--color-neutral-600)] focus-visible:ring-[var(--color-primary-500)]'
    )
  }

  return (
    <div
      role="tablist"
      aria-label={props['aria-label']}
      onKeyDown={handleKeyDown}
      className={cn(
        'flex items-center',
        variant === 'lg' && 'gap-[var(--space-2)]',
        variant === 'filter' &&
          'h-[32px] gap-[var(--space-1)] rounded-[var(--radius-2xl)] bg-[var(--color-neutral-100)] px-[var(--space-2)] py-[var(--space-1)]',
        className
      )}
    >
      {items.map((item) => {
        const active = item.value === value
        return (
          <button
            key={item.value}
            type="button"
            role="tab"
            aria-selected={active}
            tabIndex={active ? 0 : -1}
            onClick={() => onValueChange(item.value)}
            className={chipClassName(active)}
          >
            {item.label}
          </button>
        )
      })}
    </div>
  )
}
