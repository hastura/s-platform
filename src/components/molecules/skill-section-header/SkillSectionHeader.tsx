'use client'

import { cn } from '@/lib/utils'
import { IconChevronDown, IconChevronRight, IconInfo, IconKebab, IconPlus } from '@/components/icons'
import { Tooltip } from '@/components/atoms/tooltip/Tooltip'

export interface SkillSectionHeaderProps {
  title: string
  description?: string
  expanded?: boolean
  onToggle?: () => void
  onAdd?: () => void
  onMenu?: () => void
  behaviorCount?: number
  variant?: 'library' | 'assessment'
  className?: string
}

export function SkillSectionHeader({
  title,
  description,
  expanded = true,
  onToggle,
  onAdd,
  onMenu,
  behaviorCount,
  variant = 'library',
  className,
}: SkillSectionHeaderProps) {
  if (variant === 'assessment') {
    return (
      <div className={cn('flex items-center justify-between px-1 py-3.5', className)}>
        <h3 className="text-[18px] font-bold text-neutral-900">{title}</h3>
        {behaviorCount !== undefined && (
          <span className="inline-flex h-7 items-center rounded-[14px] bg-accent-100 px-3.5 text-[11px] font-bold tracking-[0.5px] text-accent-600">
            {behaviorCount} KEY BEHAVIORS
          </span>
        )}
      </div>
    )
  }

  return (
    <div
      className={cn(
        'flex h-9 items-center justify-between bg-neutral-50 py-1.5 pl-4 pr-2',
        className
      )}
    >
      <div className="flex min-w-0 items-center gap-1">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={expanded}
          aria-label={`${expanded ? 'Collapse' : 'Expand'} ${title}`}
          className="flex size-6 shrink-0 items-center justify-center text-[var(--color-icon-default)]"
        >
          {expanded ? <IconChevronDown size={16} /> : <IconChevronRight size={16} />}
        </button>
        <span className="truncate text-[length:var(--font-size-xs)] font-medium tracking-[var(--letter-spacing-label)] text-neutral-600">
          {title}
        </span>
        {description && (
          <Tooltip content={description} position="right">
            <button
              type="button"
              aria-label={`Info about ${title}`}
              className="shrink-0 text-neutral-400 transition-colors hover:text-neutral-600"
            >
              <IconInfo size={16} />
            </button>
          </Tooltip>
        )}
      </div>
      <div className="flex items-center gap-1">
        {onAdd && (
          <button
            type="button"
            onClick={onAdd}
            aria-label={`Add competency to ${title}`}
            className="flex size-6 shrink-0 items-center justify-center rounded-[3.6px] text-[var(--color-icon-default)] hover:bg-white"
          >
            <IconPlus size={12} />
          </button>
        )}
        {onMenu && (
          <button
            type="button"
            onClick={onMenu}
            aria-label={`Section actions for ${title}`}
            className="flex size-6 shrink-0 items-center justify-center rounded-[3.6px] text-[var(--color-icon-default)] hover:bg-white"
          >
            <IconKebab size={16} />
          </button>
        )}
      </div>
    </div>
  )
}
