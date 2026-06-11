'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import {
  OKR_LEVEL_COLOR,
  OKR_LEVEL_ICON_BG,
  OKR_LEVEL_LABEL,
  OKR_LEVEL_PROGRESS,
} from '@/lib/okr-utils'
import type { Objective } from '@/types/okr'
import { ProgressBar } from '@/components/atoms/progress-bar/ProgressBar'
import { IconArrowUpRight, IconBuilding } from '@/components/icons'
import { IconChevronDown } from '@/components/icons/IconChevronDown'
import { OkrRowActions } from '@/components/molecules/okr-row-actions/OkrRowActions'

const INDENT_PER_DEPTH = 64
const CONNECTOR_OFFSET = 16.5
const CONNECTOR_STEP = 32

export interface OKRCascadeRowProps {
  objective: Objective
  depth: number
  isExpanded?: boolean
  hasChildren?: boolean
  isLast?: boolean
  onToggle?: () => void
  onClick?: (objective: Objective) => void
  onEdit?: (objective: Objective) => void
  onAlign?: (objective: Objective) => void
  onAddChild?: (objective: Objective) => void
}

function LevelIcon({ level }: { level: Objective['level'] }) {
  const stroke =
    level === 'company'
      ? 'var(--color-okr-company)'
      : level === 'department'
        ? 'var(--color-okr-department)'
        : level === 'team'
          ? 'var(--color-okr-team)'
          : 'var(--color-neutral-600)'

  if (level === 'company') {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
        <path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
      </svg>
    )
  }
  if (level === 'department') {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
        <path d="m6.08 9.5-3.5 1.6a1 1 0 0 0 0 1.81l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9a1 1 0 0 0 0-1.83l-3.5-1.59" />
        <path d="m6.08 14.5-3.5 1.6a1 1 0 0 0 0 1.81l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9a1 1 0 0 0 0-1.83l-3.5-1.59" />
      </svg>
    )
  }
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

/* Figma OKR Cascading owner tags: Management = indigo accent, Dept Head =
   purple, Lead/other = primary blue. */
function OwnerTag({ role }: { role: string }) {
  const normalized = role.toLowerCase()
  const colorClasses = normalized.includes('management')
    ? 'bg-[var(--color-tag-management-bg)] text-[var(--color-tag-management-text)]'
    : normalized.includes('head')
      ? 'bg-[var(--color-tag-dept-head-bg)] text-[var(--color-tag-dept-head-text)]'
      : 'bg-[var(--color-tag-lead-bg)] text-[var(--color-tag-lead-text)]'

  return (
    <span
      className={cn(
        'inline-flex h-[19px] items-center gap-1 rounded-full px-2 text-[10px] font-bold',
        colorClasses
      )}
    >
      <IconArrowUpRight size={12} />
      {role}
    </span>
  )
}

function JiraBadge() {
  return (
    <span className="inline-flex h-[19px] items-center gap-1 rounded-full bg-primary-600 px-2 text-[10px] font-bold text-white">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
      JIRA
    </span>
  )
}

export function OKRCascadeRow({
  objective,
  depth,
  isExpanded = true,
  hasChildren = false,
  isLast = true,
  onToggle,
  onClick,
  onEdit,
  onAlign,
  onAddChild,
}: OKRCascadeRowProps) {
  const indentPx = depth * INDENT_PER_DEPTH
  const connectorX = CONNECTOR_OFFSET + (depth - 1) * CONNECTOR_STEP

  return (
    <div className="relative pl-0" style={{ marginLeft: indentPx }}>
      {depth > 0 && (
        <>
          <div
            className="absolute top-1/2 h-0.5 w-[17px] -translate-y-1/2 bg-neutral-300"
            style={{ left: connectorX - indentPx }}
            aria-hidden="true"
          />
          {!isLast && (
            <div
              className="absolute w-0.5 bg-neutral-300"
              style={{
                left: connectorX - indentPx,
                top: '50%',
                bottom: '-12px',
              }}
              aria-hidden="true"
            />
          )}
        </>
      )}

      <div
        role="button"
        tabIndex={0}
        onClick={() => onClick?.(objective)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onClick?.(objective)
          }
        }}
        className={cn(
          'mb-3 flex cursor-pointer items-center justify-between rounded-2xl border border-neutral-200 bg-white px-8 py-5 transition-shadow',
          'hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500'
        )}
      >
        <div className="flex min-w-0 flex-1 items-center gap-6">
          {hasChildren ? (
            <button
              type="button"
              aria-label={isExpanded ? 'Collapse' : 'Expand'}
              aria-expanded={isExpanded}
              onClick={(e) => {
                e.stopPropagation()
                onToggle?.()
              }}
              className="flex size-5 shrink-0 items-center justify-center text-neutral-400 transition-colors hover:text-neutral-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            >
              <IconChevronDown
                size={20}
                className={cn('transition-transform', isExpanded ? 'rotate-0' : '-rotate-90')}
              />
            </button>
          ) : (
            <div className="size-5 shrink-0" aria-hidden="true" />
          )}

          <div
            className={cn(
              'flex size-[46px] shrink-0 items-center justify-center rounded-xl shadow-xs',
              OKR_LEVEL_ICON_BG[objective.level]
            )}
          >
            <LevelIcon level={objective.level} />
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={cn(
                  'text-[10px] font-black uppercase tracking-[1px]',
                  OKR_LEVEL_COLOR[objective.level]
                )}
              >
                {OKR_LEVEL_LABEL[objective.level]}
              </span>
              <OwnerTag role={objective.ownerRole} />
              {objective.hasJira && <JiraBadge />}
            </div>
            <h3 className="truncate text-base font-bold tracking-tight text-neutral-900">
              {objective.title}
            </h3>
            <ProgressBar
              value={objective.progress}
              size="md"
              fillClassName={OKR_LEVEL_PROGRESS[objective.level]}
            />
          </div>
        </div>

        <div className="ml-6 flex shrink-0 items-center gap-8">
          <div className="flex flex-col items-end gap-1">
            <span className="text-[10px] font-black uppercase tracking-[1px] text-neutral-500">
              Progress
            </span>
            <span className="text-lg font-black text-neutral-900">{objective.progress}%</span>
          </div>
          <OkrRowActions
            onEdit={() => onEdit?.(objective)}
            onAlign={() => onAlign?.(objective)}
            onAddChild={() => onAddChild?.(objective)}
          />
        </div>
      </div>
    </div>
  )
}
