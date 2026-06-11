'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { IconKebab } from '@/components/icons'

export interface KebabMenuItem {
  label: string
  icon?: React.ReactNode
  onSelect: () => void
  destructive?: boolean
}

export interface KebabMenuProps {
  items: KebabMenuItem[]
  'aria-label': string
  className?: string
}

/** Row action menu triggered by a vertical three-dot button. */
export function KebabMenu({ items, className, ...props }: KebabMenuProps) {
  const [open, setOpen] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!open) return
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [open])

  return (
    <div ref={containerRef} className={cn('relative inline-flex', className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={props['aria-label']}
        aria-expanded={open}
        aria-haspopup="menu"
        className="flex h-[28px] w-[28px] items-center justify-center rounded-[var(--radius-md)] text-[var(--color-text-tertiary)] transition-colors hover:bg-[var(--color-neutral-100)] hover:text-[var(--color-text-secondary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)]"
      >
        <IconKebab size={16} />
      </button>
      {open && (
        <div
          role="menu"
          className="absolute right-0 top-[calc(100%+4px)] z-[var(--z-dropdown)] min-w-[160px] rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-[var(--space-1)] shadow-[var(--shadow-lg)]"
        >
          {items.map((item) => (
            <button
              key={item.label}
              type="button"
              role="menuitem"
              onClick={() => {
                setOpen(false)
                item.onSelect()
              }}
              className={cn(
                'flex w-full items-center gap-[var(--space-2)] rounded-[var(--radius-md)] px-[var(--space-3)] py-[var(--space-2)] text-left text-[var(--font-size-sm)] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)]',
                item.destructive
                  ? 'text-[var(--color-danger-600)] hover:bg-[var(--color-danger-50)]'
                  : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-neutral-100)] hover:text-[var(--color-text-primary)]'
              )}
            >
              {item.icon && <span className="shrink-0">{item.icon}</span>}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
