'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { mockSchedules } from '@/lib/mock/schedules'
import { mockOkrOwners, mockOkrTeams } from '@/lib/mock/okrs'
import { OKR_STATUS_LABEL } from '@/lib/okr-utils'
import type { OkrFilters, OkrStatus } from '@/types/okr'
import { Select } from '@/components/molecules/select/Select'
import { SearchBar } from '@/components/molecules/search-bar/SearchBar'
import { Button } from '@/components/ui/Button'
import { IconUpload } from '@/components/icons'

export interface OKRToolbarProps {
  filters: OkrFilters
  onFiltersChange: (filters: OkrFilters) => void
  onExport?: () => void
  className?: string
}

const STATUS_OPTIONS: { value: string; label: string }[] = [
  { value: '', label: 'All Statuses' },
  ...(['on_track', 'at_risk', 'off_track'] as OkrStatus[]).map((s) => ({
    value: s,
    label: OKR_STATUS_LABEL[s],
  })),
]

export function OKRToolbar({ filters, onFiltersChange, onExport, className }: OKRToolbarProps) {
  const periodOptions = mockSchedules
    .filter((s) => s.scope === 'okr' || s.scope === 'okr_competency')
    .map((s) => ({ value: s.id, label: s.name }))

  const ownerOptions = [
    { value: '', label: 'All Owners' },
    ...mockOkrOwners.map((o) => ({ value: o.id, label: o.name })),
  ]

  const teamOptions = [
    { value: '', label: 'All Teams' },
    ...mockOkrTeams.map((t) => ({ value: t.id, label: t.name })),
  ]

  function patch(partial: Partial<OkrFilters>) {
    onFiltersChange({ ...filters, ...partial })
  }

  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-3 rounded-2xl border border-[var(--color-border-subtle)] bg-white p-4 shadow-elevation-03',
        className
      )}
    >
      <div className="w-56">
        <Select
          aria-label="Performance period"
          variant="filter"
          value={filters.periodId}
          onValueChange={(v) => patch({ periodId: v || null })}
          options={periodOptions}
          placeholder="Select period"
        />
      </div>

      <SearchBar
        placeholder="Search objectives & KRs…"
        value={filters.search}
        onChange={(e) => patch({ search: e.target.value })}
        className="w-56"
        aria-label="Search OKRs"
      />

      <Select
        aria-label="Filter by owner"
        variant="filter"
        className="w-40"
        value={filters.ownerId ?? ''}
        onValueChange={(v) => patch({ ownerId: v || null })}
        options={ownerOptions}
        placeholder="Owner"
      />

      <Select
        aria-label="Filter by team"
        variant="filter"
        className="w-44"
        value={filters.teamId ?? ''}
        onValueChange={(v) => patch({ teamId: v || null })}
        options={teamOptions}
        placeholder="Team"
      />

      <Select
        aria-label="Filter by status"
        variant="filter"
        className="w-36"
        value={filters.status ?? ''}
        onValueChange={(v) => patch({ status: (v as OkrStatus) || null })}
        options={STATUS_OPTIONS}
        placeholder="Status"
      />

      <div className="ml-auto">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onExport}
          className="gap-2 rounded-lg"
          aria-label="Export OKR data"
        >
          <IconUpload size={16} />
          Export
        </Button>
      </div>
    </div>
  )
}
