'use client'

import { cn } from '@/lib/utils'
import { IconInfo, IconKebab } from '@/components/icons'
import { Tooltip } from '@/components/atoms/tooltip/Tooltip'

export interface SkillListItemProps {
  name: string
  description?: string
  indented?: boolean
  onMenu?: () => void
  className?: string
}

export function SkillListItem({ name, description, indented = false, onMenu, className }: SkillListItemProps) {
  return (
    <div
      className={cn(
        'flex h-11 items-center justify-between bg-white py-2.5 pl-4 pr-2',
        indented && 'pl-7',
        className
      )}
    >
      <div className="flex min-w-0 items-center gap-1">
        <span className="truncate text-[length:var(--font-size-xs)] font-medium tracking-[var(--letter-spacing-label)] text-[var(--color-text-primary)]">
          {name}
        </span>
        {description && (
          <Tooltip content={description} position="right">
            <button
              type="button"
              aria-label={`Info about ${name}`}
              className="flex size-6 shrink-0 items-center justify-center text-[var(--color-icon-default)] transition-colors hover:text-neutral-700"
            >
              <IconInfo size={24} />
            </button>
          </Tooltip>
        )}
      </div>
      {onMenu && (
        <button
          type="button"
          onClick={onMenu}
          aria-label={`Actions for ${name}`}
          className="flex size-6 shrink-0 items-center justify-center rounded-[3.6px] text-[var(--color-icon-default)] hover:bg-neutral-50"
        >
          <IconKebab size={16} />
        </button>
      )}
    </div>
  )
}
