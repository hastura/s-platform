'use client'

import { TargetGapChip } from '@/components/molecules/target-gap-chip/TargetGapChip'
import { cn } from '@/lib/utils'
import type { HeatmapRow } from '@/types/competency'

const BAR_COLORS = {
  accent: 'bg-accent-600',
  success: 'bg-success-500',
  warning: 'bg-warning-500',
  danger: 'bg-danger-500',
} as const

export interface HeatmapTeamChip {
  id: string
  name: string
}

export interface CompetencyHeatmapTableProps {
  title: string
  rows: HeatmapRow[]
  gradeColumns: string[]
  teams?: HeatmapTeamChip[]
  onTeamClick?: (teamId: string) => void
  onRowClick?: (rowIndex: number) => void
  className?: string
}

export function CompetencyHeatmapTable({
  title,
  rows,
  gradeColumns,
  teams,
  onTeamClick,
  onRowClick,
  className,
}: CompetencyHeatmapTableProps) {
  return (
    <div className={cn('overflow-hidden rounded-2xl border border-neutral-200 bg-white', className)}>
      <div className="border-b border-neutral-200 px-6 py-5">
        <div className="flex flex-col gap-3">
          <h2 className="text-base font-bold text-neutral-900">{title}</h2>
          {teams && teams.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-semibold tracking-[0.5px] text-neutral-400">
                TEAMS
              </span>
              {teams.map((team) => (
                <button
                  key={team.id}
                  type="button"
                  onClick={() => onTeamClick?.(team.id)}
                  className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-[12px] font-semibold text-neutral-700 transition-colors hover:border-accent-300 hover:bg-accent-50 hover:text-accent-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500"
                >
                  {team.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="overflow-x-auto px-4 pb-4">
        <div
          className="grid min-w-[800px] items-center rounded-lg bg-neutral-100 px-2 py-3 text-[11px] font-semibold tracking-[0.5px] text-neutral-400"
          style={{ gridTemplateColumns: `200px repeat(${gradeColumns.length}, 1fr) 100px` }}
        >
          <span className="pl-2">COMPETENCY</span>
          {gradeColumns.map((col) => (
            <span key={col} className="text-center">
              {col}
            </span>
          ))}
          <span className="text-center">ORG TARGET GAP</span>
        </div>
        {rows.map((row, idx) => (
          <div
            key={`${row.competencyName}-${idx}`}
            role={onRowClick ? 'button' : undefined}
            tabIndex={onRowClick ? 0 : undefined}
            onClick={onRowClick ? () => onRowClick(idx) : undefined}
            onKeyDown={
              onRowClick
                ? (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      onRowClick(idx)
                    }
                  }
                : undefined
            }
            className={cn(
              'grid min-w-[800px] items-center gap-4 border border-neutral-200 px-2 py-5',
              idx % 2 === 1 ? 'bg-neutral-50/80' : 'bg-white',
              onRowClick &&
                'cursor-pointer transition-colors hover:bg-accent-50/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent-500'
            )}
            style={{ gridTemplateColumns: `200px repeat(${gradeColumns.length}, 1fr) 100px` }}
          >
            <span className="text-[var(--font-size-sm)] font-semibold text-neutral-900">
              {row.competencyName}
            </span>
            {row.cells.map((cell, cellIdx) => (
              <div key={cellIdx} className="flex flex-col gap-2">
                <span className="text-[12px] font-semibold text-neutral-700">
                  {cell.proficiency}% Proficiency
                </span>
                <div className="h-[6px] w-full max-w-[120px] rounded-[3px] bg-neutral-200">
                  <div
                    className={cn('h-full rounded-[3px]', BAR_COLORS[cell.barVariant])}
                    style={{ width: `${cell.proficiency}%` }}
                  />
                </div>
              </div>
            ))}
            <div className="flex justify-center">
              <TargetGapChip value={row.targetGap} variant={row.gapVariant} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
