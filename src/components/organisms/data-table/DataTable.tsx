'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface DataTableColumn<T> {
  key: string
  header: React.ReactNode
  render: (row: T, index: number) => React.ReactNode
  /** Tailwind width class, e.g. 'w-[180px]' — omit for flexible columns. */
  widthClassName?: string
  align?: 'left' | 'right'
}

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[]
  rows: T[]
  rowKey: (row: T) => string
  'aria-label': string
  emptyState?: React.ReactNode
  /**
   * figma: framed table with #f8fafc header band and 51px rows (Employee Management).
   * plain: borderless rows with hairline dividers (Schedule & Reminders).
   */
  variant?: 'figma' | 'plain'
  className?: string
}

/** Generic data table matching the Figma table organisms. */
export function DataTable<T>({
  columns,
  rows,
  rowKey,
  emptyState,
  variant = 'figma',
  className,
  ...props
}: DataTableProps<T>) {
  const framed = variant === 'figma'

  return (
    <div
      role="table"
      aria-label={props['aria-label']}
      className={cn(
        'w-full overflow-hidden',
        framed && 'rounded-[10px] border border-[var(--color-neutral-200)] bg-[var(--color-surface-subtle)]',
        className
      )}
    >
      <div
        role="row"
        className={cn(
          'flex items-center border-b border-[var(--color-neutral-200)] px-[var(--space-4)]',
          framed ? 'h-[43px] bg-[var(--color-neutral-50)]' : 'h-[37px] rounded-t-[8px] bg-[var(--color-neutral-100)]'
        )}
      >
        {columns.map((col) => (
          <div
            key={col.key}
            role="columnheader"
            className={cn(
              'flex min-w-0 items-center',
              col.widthClassName ?? 'flex-1',
              col.align === 'right' && 'justify-end',
              framed
                ? 'text-[var(--font-size-2xs)] font-bold uppercase tracking-[0.55px] text-[var(--color-text-muted)]'
                : 'text-[var(--font-size-xs)] font-medium tracking-[var(--letter-spacing-label)] text-[var(--color-text-tertiary)]'
            )}
          >
            {col.header}
          </div>
        ))}
      </div>

      {rows.length === 0 && emptyState ? (
        <div className="flex items-center justify-center bg-[var(--color-surface)] px-[var(--space-6)] py-[var(--space-12)]">
          {emptyState}
        </div>
      ) : (
        rows.map((row, rowIndex) => (
          <div
            key={rowKey(row)}
            role="row"
            className={cn(
              'group flex items-center bg-[var(--color-surface)] px-[var(--space-4)] transition-all',
              framed
                ? 'h-[51px] border-b border-[var(--color-neutral-200)] last:border-b-0 hover:bg-[var(--color-neutral-50)]'
                : 'min-h-[28px] border-b border-[var(--color-border-subtle)] py-[var(--space-1)] last:border-b-0 hover:min-h-[45px] hover:bg-[var(--color-surface)]'
            )}
          >
            {columns.map((col) => (
              <div
                key={col.key}
                role="cell"
                className={cn('flex min-w-0 items-center', col.widthClassName ?? 'flex-1', col.align === 'right' && 'justify-end')}
              >
                {col.render(row, rowIndex)}
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  )
}
