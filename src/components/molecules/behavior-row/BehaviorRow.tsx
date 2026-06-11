'use client'

import { cn } from '@/lib/utils'
import { IconInfo, IconTrash } from '@/components/icons'
import { Tooltip } from '@/components/atoms/tooltip/Tooltip'

export interface BehaviorRowProps {
  text: string
  description?: string
  onRemove?: () => void
  className?: string
}

export function BehaviorRow({ text, description, onRemove, className }: BehaviorRowProps) {
  return (
    <div
      className={cn(
        'flex h-[34px] items-center justify-between bg-neutral-50 py-[5px] pl-7 pr-2',
        className
      )}
    >
      <div className="flex min-w-0 items-center gap-1">
        <span className="truncate text-[length:var(--font-size-xs)] font-medium tracking-[var(--letter-spacing-label)] text-neutral-400">
          {text}
        </span>
        {description && (
          <Tooltip content={description} position="right">
            <button
              type="button"
              aria-label={`Info about ${text}`}
              className="flex size-4 shrink-0 items-center justify-center text-neutral-400 transition-colors hover:text-neutral-600"
            >
              <IconInfo size={16} />
            </button>
          </Tooltip>
        )}
      </div>
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${text}`}
          className="flex size-6 shrink-0 items-center justify-center rounded-[3.6px] text-danger-500 transition-colors hover:bg-danger-50"
        >
          <IconTrash size={16} />
        </button>
      )}
    </div>
  )
}
