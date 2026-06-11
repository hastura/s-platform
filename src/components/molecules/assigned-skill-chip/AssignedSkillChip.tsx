'use client'

import { cn } from '@/lib/utils'

export interface AssignedSkillChipProps {
  label: string
  onRemove?: () => void
  className?: string
}

export function AssignedSkillChip({ label, onRemove, className }: AssignedSkillChipProps) {
  return (
    <span
      className={cn(
        'inline-flex h-6 items-center rounded-xl bg-accent-100 px-2.5 text-[11px] font-medium text-accent-600',
        className
      )}
    >
      {label}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${label}`}
          className="ml-1 text-accent-500 hover:text-accent-700"
        >
          ×
        </button>
      )}
    </span>
  )
}
