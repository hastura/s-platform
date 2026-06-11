'use client'

import { useMemo, useState } from 'react'
import { cn } from '@/lib/utils'
import { Badge, Switch } from '@/components/atoms'
import { Select } from '@/components/molecules'
import { DataTable, type DataTableColumn } from '@/components/organisms/data-table/DataTable'
import { IconSearch, IconTrash } from '@/components/icons'
import { useSettingsStore } from '@/lib/stores'
import { mockDepartments } from '@/lib/mock'
import type { EmploymentStatus, Member } from '@/types/settings'

const EMPLOYMENT_BADGE: Record<
  EmploymentStatus,
  { label: string; variant: 'success' | 'warning' | 'invited' }
> = {
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

export interface EmployeeManagementStepProps {
  onRemoveRequest: (member: Member) => void
}

/** Employee Management table — Figma EmployeeStep (Invite Members tab). */
export function EmployeeManagementStep({ onRemoveRequest }: EmployeeManagementStepProps) {
  const members = useSettingsStore((s) => s.members)
  const toggleMemberActive = useSettingsStore((s) => s.toggleMemberActive)

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [deptFilter, setDeptFilter] = useState('all')

  const filteredMembers = useMemo(() => {
    const q = search.trim().toLowerCase()
    return members.filter((m) => {
      if (statusFilter !== 'all' && m.status !== statusFilter) return false
      if (deptFilter !== 'all' && m.department !== deptFilter) return false
      if (q && ![m.name, m.employeeId, m.position, m.department, m.email].some((v) => v.toLowerCase().includes(q))) {
        return false
      }
      return true
    })
  }, [members, search, statusFilter, deptFilter])

  const columns: DataTableColumn<Member>[] = [
    {
      key: 'employeeId',
      header: 'EMPLOYEE ID',
      render: (m) => (
        <span className="text-[var(--font-size-sm)] font-medium text-[var(--color-neutral-400)]">{m.employeeId}</span>
      ),
    },
    {
      key: 'name',
      header: 'NAME',
      render: (m) => (
        <span
          className={cn(
            'text-[var(--font-size-sm)] font-semibold text-[var(--color-neutral-900)]',
            !m.active && 'opacity-50'
          )}
        >
          {m.name}
        </span>
      ),
    },
    {
      key: 'department',
      header: 'DEPARTMENT',
      render: (m) => (
        <span className="text-[var(--font-size-sm)] font-normal text-[var(--color-neutral-600)]">{m.department}</span>
      ),
    },
    {
      key: 'position',
      header: 'JOB POSITION',
      render: (m) => (
        <span className="truncate text-[var(--font-size-sm)] font-normal text-[var(--color-neutral-600)]">{m.position}</span>
      ),
    },
    {
      key: 'status',
      header: 'STATUS',
      widthClassName: 'w-[245px]',
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
      render: (m) => (
        <div className="flex items-center gap-[38px]">
          <button
            type="button"
            onClick={() => onRemoveRequest(m)}
            aria-label={`Remove ${m.name}`}
            className="text-[var(--color-danger-500)] transition-colors hover:text-[var(--color-danger-600)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)]"
          >
            <IconTrash size={18} />
          </button>
          <Switch
            checked={m.active}
            onCheckedChange={() => toggleMemberActive(m.id)}
            aria-label={`Toggle active status for ${m.name}`}
          />
        </div>
      ),
    },
  ]

  return (
    <>
      <div className="flex items-center gap-[10px]">
        <div className="flex h-9 flex-1 items-center gap-2 rounded-[10px] border border-[var(--color-neutral-200)] bg-[var(--color-neutral-50)] px-[14px] py-[10px]">
          <IconSearch size={14} className="shrink-0 text-[var(--color-neutral-400)]" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, ID, or position…"
            aria-label="Search employees"
            className="w-full bg-transparent text-[13px] font-normal text-[var(--color-neutral-900)] outline-none placeholder:text-[var(--color-neutral-400)]"
          />
        </div>
        <Select
          aria-label="Filter by status"
          variant="filter"
          options={STATUS_FILTER_OPTIONS}
          value={statusFilter}
          onValueChange={setStatusFilter}
          className="w-[100px]"
        />
        <Select
          aria-label="Filter by department"
          variant="filter"
          options={DEPT_FILTER_OPTIONS}
          value={deptFilter}
          onValueChange={setDeptFilter}
          className="w-[141px]"
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
