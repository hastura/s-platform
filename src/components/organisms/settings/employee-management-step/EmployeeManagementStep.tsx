'use client'

import { useMemo, useState } from 'react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/atoms'
import { Select } from '@/components/molecules'
import { DataTable, type DataTableColumn } from '@/components/organisms/data-table/DataTable'
import { IconEdit, IconSearch, IconTrash } from '@/components/icons'
import { useSettingsStore } from '@/lib/stores'
import { mockDepartments } from '@/lib/mock'
import type { EmploymentStatus, Member } from '@/types/settings'

const EMPLOYMENT_BADGE: Record<EmploymentStatus, { label: string; variant: 'success' | 'warning' | 'invited' }> = {
  permanent: { label: 'Permanent', variant: 'success' },
  contract: { label: 'Contract', variant: 'warning' },
  probation: { label: 'Probation', variant: 'invited' },
}

const STATUS_FILTER_OPTIONS = [
  { value: 'all', label: 'All Status' },
  { value: 'permanent', label: 'Permanent' },
  { value: 'contract', label: 'Contract' },
  { value: 'probation', label: 'Probation' },
]

const DEPT_FILTER_OPTIONS = [
  { value: 'all', label: 'All Departments' },
  ...mockDepartments.map((d) => ({ value: d.name, label: d.name })),
]

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  return name.slice(0, 2).toUpperCase()
}

export interface EmployeeManagementStepProps {
  onRemoveRequest: (member: Member) => void
}

/** Employee Management table — Figma node 614:3789 (Organism/Employee Step). */
export function EmployeeManagementStep({ onRemoveRequest }: EmployeeManagementStepProps) {
  const members = useSettingsStore((s) => s.members)

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [deptFilter, setDeptFilter] = useState('all')

  const filteredMembers = useMemo(() => {
    const q = search.trim().toLowerCase()
    return members.filter((m) => {
      if (statusFilter !== 'all' && m.status !== statusFilter) return false
      if (deptFilter !== 'all' && m.department !== deptFilter) return false
      if (q && ![m.name, m.employeeId, m.position, m.email].some((v) => v.toLowerCase().includes(q))) return false
      return true
    })
  }, [members, search, statusFilter, deptFilter])

  const columns: DataTableColumn<Member>[] = [
    {
      key: 'index',
      header: '#',
      widthClassName: 'w-[48px]',
      render: (_m, index) => (
        <span className="text-[var(--font-size-sm)] font-medium text-[var(--color-neutral-400)]">{index + 1}</span>
      ),
    },
    {
      key: 'name',
      header: 'NAME',
      render: (m) => (
        <span className={cn('flex min-w-0 items-center gap-[var(--space-2)] pr-[var(--space-3)]', !m.active && 'opacity-50')}>
          <span
            aria-hidden="true"
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--color-neutral-100)] text-[10px] font-medium text-[var(--color-neutral-400)]"
          >
            {getInitials(m.name)}
          </span>
          <span className="truncate text-[var(--font-size-sm)] font-medium text-[var(--color-neutral-900)]">{m.name}</span>
        </span>
      ),
    },
    {
      key: 'position',
      header: 'POSITION',
      widthClassName: 'w-[200px]',
      render: (m) => (
        <span className="truncate pr-[var(--space-2)] text-[var(--font-size-sm)] font-normal text-[var(--color-neutral-600)]">{m.position}</span>
      ),
    },
    {
      key: 'email',
      header: 'EMAIL',
      render: (m) => (
        <span className="truncate pr-[var(--space-2)] text-[var(--font-size-sm)] font-normal text-[var(--color-neutral-600)]">{m.email}</span>
      ),
    },
    {
      key: 'status',
      header: 'EMPLOYMENT',
      widthClassName: 'w-[120px]',
      render: (m) => {
        const badge = EMPLOYMENT_BADGE[m.status]
        return (
          <Badge variant={badge.variant} size="status">
            {badge.label}
          </Badge>
        )
      },
    },
    {
      key: 'action',
      header: 'ACTION',
      widthClassName: 'w-[120px]',
      render: (m) => (
        <span className="flex items-center gap-[38px]">
          <button
            type="button"
            aria-label={`Edit ${m.name}`}
            className="text-[var(--color-neutral-500)] transition-colors hover:text-[var(--color-neutral-700)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)]"
          >
            <IconEdit size={18} />
          </button>
          <button
            type="button"
            onClick={() => onRemoveRequest(m)}
            aria-label={`Remove ${m.name}`}
            className="text-[var(--color-danger-500)] transition-colors hover:text-[var(--color-danger-600)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)]"
          >
            <IconTrash size={18} />
          </button>
        </span>
      ),
    },
  ]

  return (
    <>
      <div className="flex items-center gap-[10px]">
        <div className="flex h-[35px] flex-1 items-center gap-[var(--space-2)] rounded-[10px] border border-[var(--color-neutral-200)] bg-[var(--color-neutral-50)] px-[14px]">
          <IconSearch size={14} className="shrink-0 text-[var(--color-neutral-400)]" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, ID, or position…"
            aria-label="Search employees"
            className="w-full bg-transparent text-[13px] text-[var(--color-neutral-900)] outline-none placeholder:text-[var(--color-neutral-400)]"
          />
        </div>
        <Select
          aria-label="Filter by status"
          variant="filter"
          options={STATUS_FILTER_OPTIONS}
          value={statusFilter}
          onValueChange={setStatusFilter}
          className="w-[150px]"
        />
        <Select
          aria-label="Filter by department"
          variant="filter"
          options={DEPT_FILTER_OPTIONS}
          value={deptFilter}
          onValueChange={setDeptFilter}
          className="w-[190px]"
        />
      </div>

      <DataTable
        aria-label="Employees"
        columns={columns}
        rows={filteredMembers}
        rowKey={(m) => m.id}
        emptyState={
          <div className="flex flex-col items-center gap-[var(--space-2)] text-center">
            <p className="text-[var(--font-size-sm)] font-semibold text-[var(--color-text-secondary)]">
              No employees match your filters
            </p>
            <p className="text-[var(--font-size-xs)] font-medium text-[var(--color-text-tertiary)]">
              Try a different search term or clear the status/department filters.
            </p>
          </div>
        }
      />
    </>
  )
}

export function useEmployeeCount() {
  const members = useSettingsStore((s) => s.members)
  return members.length
}
