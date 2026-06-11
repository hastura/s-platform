'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { IconEdit, IconPlus, IconPlannerReview } from '@/components/icons'

export interface OkrRowActionsProps {
  onEdit?: () => void
  onAlign?: () => void
  onAddChild?: () => void
  className?: string
}

function ActionButton({
  label,
  onClick,
  children,
}: {
  label: string
  onClick?: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={(e) => {
        e.stopPropagation()
        onClick?.()
      }}
      className="flex size-[48px] shrink-0 items-center justify-center rounded-[7.2px] bg-primary-50 text-primary-600 transition-colors hover:bg-primary-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
    >
      {children}
    </button>
  )
}

/** 48×48 edit / align / add action cluster shared by list rows and tree cards. */
export function OkrRowActions({ onEdit, onAlign, onAddChild, className }: OkrRowActionsProps) {
  return (
    <div className={cn('flex items-center gap-3 px-2', className)}>
      <div className="flex items-center gap-2 border-r border-neutral-100 pr-4">
        <ActionButton label="Edit objective" onClick={onEdit}>
          <IconEdit size={20} />
        </ActionButton>
        <ActionButton label="View alignment" onClick={onAlign}>
          <IconPlannerReview size={20} />
        </ActionButton>
      </div>
      <ActionButton label="Add child objective" onClick={onAddChild}>
        <IconPlus size={20} />
      </ActionButton>
    </div>
  )
}
