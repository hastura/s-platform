'use client'

import { cn } from '@/lib/utils'
import type { ReviewRole } from '@/lib/stores/competency-store'

const ROLE_OPTIONS: { value: ReviewRole; label: string }[] = [
  { value: 'admin', label: 'Admin' },
  { value: 'manager', label: 'Manager' },
  { value: 'employee', label: 'Employee' },
]

export interface CompetencyReviewHeaderProps {
  role: ReviewRole
  onRoleChange: (role: ReviewRole) => void
  breadcrumb?: {
    label: string
    onBack: () => void
  }
  className?: string
}

export function CompetencyReviewHeader({
  role,
  onRoleChange,
  breadcrumb,
  className,
}: CompetencyReviewHeaderProps) {
  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {breadcrumb && (
        <button
          type="button"
          onClick={breadcrumb.onBack}
          className="flex w-fit items-center gap-1 text-[var(--font-size-sm)] font-semibold text-accent-600 transition-colors hover:text-accent-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500"
        >
          <span aria-hidden>←</span>
          {breadcrumb.label}
        </button>
      )}

      <div className="flex flex-wrap items-center justify-between gap-4">
        <span className="text-[var(--font-size-xs)] font-semibold uppercase tracking-[var(--letter-spacing-label)] text-[var(--color-text-muted)]">
          RBAC View as simulation
        </span>
        <div
          role="group"
          aria-label="Simulate RBAC view"
          className="flex items-center gap-[var(--space-1)] rounded-[var(--radius-full)] bg-[var(--color-neutral-100)] p-[var(--space-1)]"
        >
          {ROLE_OPTIONS.map((option) => {
            const active = option.value === role
            return (
              <button
                key={option.value}
                type="button"
                aria-pressed={active}
                onClick={() => onRoleChange(option.value)}
                className={cn(
                  'flex h-[28px] items-center justify-center rounded-[var(--radius-full)] px-[var(--space-3)] text-[var(--font-size-xs)] font-semibold tracking-[var(--letter-spacing-label)] transition-all',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500',
                  active
                    ? 'bg-accent-600 text-[var(--color-text-inverse)] shadow-[var(--shadow-elevation-02)]'
                    : 'text-[var(--color-text-tertiary)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text-secondary)]'
                )}
              >
                {option.label}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
