'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { ChipTabs } from '@/components/molecules/chip-tabs/ChipTabs'
import type { ChipTabItem } from '@/components/molecules/chip-tabs/ChipTabs'

export interface ChartCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  lastUpdated: string
  filterItems: ChipTabItem[]
  filterValue: string
  onFilterChange: (value: string) => void
  filterAriaLabel: string
  footer?: React.ReactNode
  children: React.ReactNode
}

const ChartCard = React.forwardRef<HTMLDivElement, ChartCardProps>(
  (
    {
      className,
      title,
      lastUpdated,
      filterItems,
      filterValue,
      onFilterChange,
      filterAriaLabel,
      footer,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col overflow-hidden rounded-[var(--radius-2xl)] bg-[var(--color-surface)] shadow-[var(--shadow-elevation-02)]',
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-between gap-[var(--space-4)] border-b border-[var(--color-border-subtle)] px-[var(--space-6)] py-[var(--space-4)]">
          <div className="flex flex-col gap-[var(--space-1)]">
            <h3 className="text-[var(--font-size-lg)] font-bold leading-[normal] text-[var(--color-text-primary)]">{title}</h3>
            <p className="text-[var(--font-size-xs)] leading-[normal] text-[var(--color-text-muted)]">Last update: {lastUpdated}</p>
          </div>
          <ChipTabs
            items={filterItems}
            value={filterValue}
            onValueChange={onFilterChange}
            variant="filter"
            aria-label={filterAriaLabel}
          />
        </div>

        <div className="flex-1 px-[var(--space-4)] py-[var(--space-4)]">{children}</div>

        {footer ? (
          <div className="border-t border-[var(--color-border-subtle)] px-[var(--space-6)] py-[var(--space-3)]">
            {footer}
          </div>
        ) : null}
      </div>
    )
  }
)
ChartCard.displayName = 'ChartCard'

export { ChartCard }
