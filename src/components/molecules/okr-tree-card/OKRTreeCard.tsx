'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import {
  OKR_LEVEL_ICON_BG,
  OKR_LEVEL_LABEL,
  OKR_LEVEL_PROGRESS,
} from '@/lib/okr-utils'
import type { Objective } from '@/types/okr'
import { ProgressBar } from '@/components/atoms/progress-bar/ProgressBar'
import { OkrRowActions } from '@/components/molecules/okr-row-actions/OkrRowActions'

export interface OKRTreeCardProps {
  objective: Objective
  onClick?: (objective: Objective) => void
  onEdit?: (objective: Objective) => void
  onAlign?: (objective: Objective) => void
  onAddChild?: (objective: Objective) => void
  className?: string
}

function LevelIcon({ level }: { level: Objective['level'] }) {
  const colorClass =
    level === 'company'
      ? 'text-[var(--color-okr-company)]'
      : level === 'department'
        ? 'text-[var(--color-okr-department)]'
        : level === 'team'
          ? 'text-[var(--color-okr-team)]'
          : 'text-neutral-600'

  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={colorClass}
      aria-hidden="true"
    >
      {level === 'company' ? (
        <>
          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
          <path d="M4 22h16" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
        </>
      ) : level === 'department' ? (
        <>
          <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
          <path d="m6.08 9.5-3.5 1.6a1 1 0 0 0 0 1.81l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9a1 1 0 0 0 0-1.83l-3.5-1.59" />
        </>
      ) : (
        <>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </>
      )}
    </svg>
  )
}

export function OKRTreeCard({
  objective,
  onClick,
  onEdit,
  onAlign,
  onAddChild,
  className,
}: OKRTreeCardProps) {
  const ownerInitial = objective.ownerName.charAt(0).toUpperCase()

  return (
    <div
      className={cn(
        'flex w-72 flex-col rounded-2xl border border-neutral-200 bg-white p-6 text-left shadow-xs transition-shadow hover:shadow-md',
        className
      )}
      style={{ minHeight: 245 }}
    >
      <button
        type="button"
        onClick={() => onClick?.(objective)}
        className="flex flex-1 flex-col text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
      >
        <div className="mb-2 flex items-start justify-between">
          <div
            className={cn(
              'flex size-11 items-center justify-center rounded-xl shadow-xs',
              OKR_LEVEL_ICON_BG[objective.level]
            )}
          >
            <LevelIcon level={objective.level} />
          </div>
          <div className="flex items-center gap-1.5">
            {objective.hasJira && (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-neutral-400)" strokeWidth="2" aria-hidden="true">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
            )}
            <div className="flex h-7 items-center rounded-full bg-neutral-100 px-3">
              <span className="text-sm font-black text-neutral-900">{objective.progress}%</span>
            </div>
          </div>
        </div>

        <h4 className="mb-2 line-clamp-2 text-sm font-bold leading-snug text-neutral-900">
          {objective.title}
        </h4>

        <ProgressBar
          value={objective.progress}
          size="md"
          fillClassName={OKR_LEVEL_PROGRESS[objective.level]}
          className="mb-3"
        />

        <div className="mb-3 flex items-center justify-between border-t border-neutral-300 pt-3">
          <div className="flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-xl bg-primary-600 text-sm font-black text-white shadow-sm">
              {ownerInitial}
            </div>
            <span className="text-xs font-bold uppercase tracking-tight text-neutral-600">
              {objective.ownerRole}
            </span>
          </div>
        </div>
      </button>

      <OkrRowActions
        className="justify-center"
        onEdit={() => onEdit?.(objective)}
        onAlign={() => onAlign?.(objective)}
        onAddChild={() => onAddChild?.(objective)}
      />
    </div>
  )
}
