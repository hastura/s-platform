'use client'

import { cn } from '@/lib/utils'
import { ProgressBar } from '@/components/atoms/progress-bar/ProgressBar'
import type { AssessmentStatus } from '@/types/competency'

const STATUS_LABELS: Record<AssessmentStatus, string> = {
  not_started: 'NOT STARTED',
  self_assessed: 'SELF-ASSESSED',
  needs_review: 'NEEDS REVIEW',
  completed: 'COMPLETED',
}

const STATUS_STYLES: Record<AssessmentStatus, string> = {
  not_started: 'bg-neutral-100 text-neutral-600',
  self_assessed: 'bg-success-50 text-success-700',
  needs_review: 'bg-warning-50 text-warning-700', // Figma: amber/warning for needs review
  completed: 'bg-success-50 text-success-700',
}

export interface EmployeeAssessmentCardProps {
  initials: string
  name: string
  role: string
  gradeBand: string
  status: AssessmentStatus
  coveragePercent: number
  onOpen?: () => void
  actionLabel?: string
  className?: string
}

export function EmployeeAssessmentCard({
  initials,
  name,
  role,
  gradeBand,
  status,
  coveragePercent,
  onOpen,
  actionLabel = 'Open Assessment',
  className,
}: EmployeeAssessmentCardProps) {
  return (
    <div
      className={cn(
        'flex h-[280px] flex-col rounded-[20px] border border-neutral-200 bg-white p-5',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-100 text-base font-bold text-accent-500">
          {initials}
        </div>
        <span
          className={cn(
            'inline-flex h-6 min-w-[92px] items-center justify-center rounded-xl px-2.5 text-[10px] font-bold tracking-[0.4px]',
            STATUS_STYLES[status]
          )}
        >
          {STATUS_LABELS[status]}
        </span>
      </div>
      <h3 className="mt-3 text-[19px] font-black text-neutral-900">{name}</h3>
      <p className="text-[13px] text-neutral-500">
        {role} • {gradeBand}
      </p>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-[11px] font-semibold tracking-[0.5px] text-neutral-400">
          MAPPED SKILLS COVERAGE
        </span>
        <span className="text-[13px] font-bold text-accent-600">{coveragePercent}%</span>
      </div>
      <ProgressBar
        value={coveragePercent}
        size="sm"
        className="mt-2 [&>div]:bg-neutral-200 [&>div>div]:bg-accent-600"
      />
      <div className="mt-4 border-t border-neutral-200 pt-4">
        <button
          type="button"
          onClick={onOpen}
          className="flex h-10 w-full items-center justify-center rounded-[10px] border border-neutral-200 text-[13px] font-semibold text-neutral-700 transition-colors hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500"
        >
          {actionLabel}
        </button>
      </div>
    </div>
  )
}
