'use client'

import { cn } from '@/lib/utils'

export interface AssignedSkillChipProps {
  label: string
  onRemove?: () => void
  className?: string
}

/** Assigned skill pill on grade mapping cards — Figma #EDECFE / #4F46E5. */
export function AssignedSkillChip({ label, onRemove, className }: AssignedSkillChipProps) {
  return (
    <span
      className={cn(
        'inline-flex h-6 items-center rounded-[12px] bg-[#EDECFE] px-2.5 text-[11px] font-medium leading-[13px] text-[#4F46E5]',
        className
      )}
    >
      {label}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${label}`}
          className="ml-1 text-[#4F46E5] hover:text-[var(--color-accent-700)]"
        >
          ×
        </button>
      )}
    </span>
  )
}
