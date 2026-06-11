'use client'

import { useMemo, useState } from 'react'
import { cn } from '@/lib/utils'
import { Badge, Switch } from '@/components/atoms'
import { Select } from '@/components/molecules'
import { DataTable, type DataTableColumn } from '@/components/organisms/data-table/DataTable'
import { IconPlus, IconSearch, IconTrash } from '@/components/icons'
import { Button } from '@/components/ui'
import type { CompanySetupEmployee } from '@/types/company-setup'
import { getDepartmentNames } from '@/lib/mock/departments'

const STATUS_BADGE: Record<
  CompanySetupEmployee['status'],
  { variant: 'success' | 'warning' | 'primary' | 'neutral'; className?: string }
> = {
  Permanent: { variant: 'success' },
  Contract: { variant: 'warning' },
  Probation: { variant: 'primary', className: 'bg-[var(--color-accent-50)] text-[var(--color-accent-600)]' },
  Intern: { variant: 'neutral' },
}

const STATUS_FILTER_OPTIONS = [
  { value: 'all', label: 'All Status' },
  { value: 'Permanent', label: 'Permanent' },
  { value: 'Contract', label: 'Contract' },
  { value: 'Probation', label: 'Probation' },
  { value: 'Intern', label: 'Intern' },
]

export interface CompanySetupEmployeeStepProps {
  employees: CompanySetupEmployee[]
  onAdd: () => void
  onBulkImport: () => void
  onDelete: (employee: CompanySetupEmployee) => void
  onToggleActive: (employee: CompanySetupEmployee, active: boolean) => void
}

/** Figma Organism/Employee Step — Company Setup wizard employee roster. */
export function CompanySetupEmployeeStep({
  employees,
  onAdd,
  onBulkImport,
  onDelete,
  onToggleActive,
}: CompanySetupEmployeeStepProps) {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [deptFilter, setDeptFilter] = useState('all')

  const deptOptions = useMemo(
    () => [{ value: 'all', label: 'All Departments' }, ...getDepartmentNames().map((d) => ({ value: d, label: d }))],
    []
  )

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return employees.filter((emp) => {
      if (statusFilter !== 'all' && emp.status !== statusFilter) return false
      if (deptFilter !== 'all' && emp.department !== deptFilter) return false
      if (q && ![emp.name, emp.id, emp.position].some((v) => v.toLowerCase().includes(q))) return false
      return true
    })
  }, [employees, search, statusFilter, deptFilter])

  const columns: DataTableColumn<CompanySetupEmployee>[] = [
    {
      key: 'id',
      header: 'EMPLOYEE ID',
      render: (emp) => (
        <span className="font-mono text-[var(--font-size-sm)] font-medium text-[var(--color-text-tertiary)]">{emp.id}</span>
      ),
    },
    {
      key: 'name',
      header: 'NAME',
      render: (emp) => (
        <span className={cn('text-[var(--font-size-sm)] font-semibold text-[var(--color-text-primary)]', !emp.active && 'opacity-50')}>
          {emp.name}
        </span>
      ),
    },
    {
      key: 'department',
      header: 'DEPARTMENT',
      render: (emp) => (
        <span className="text-[var(--font-size-sm)] text-[var(--color-text-secondary)]">{emp.department ?? '—'}</span>
      ),
    },
    {
      key: 'position',
      header: 'JOB POSITION',
      render: (emp) => (
        <span className="text-[var(--font-size-sm)] text-[var(--color-text-secondary)]">{emp.position}</span>
      ),
    },
    {
      key: 'status',
      header: 'STATUS',
      widthClassName: 'w-[120px]',
      render: (emp) => (
        <Badge variant={STATUS_BADGE[emp.status].variant} size="sm" className={STATUS_BADGE[emp.status].className}>
          {emp.status}
        </Badge>
      ),
    },
    {
      key: 'actions',
      header: 'ACTION',
      widthClassName: 'w-[120px]',
      render: (emp) => (
        <div className="flex items-center gap-[38px] px-[var(--space-4)]">
          <button
            type="button"
            onClick={() => onDelete(emp)}
            aria-label={`Delete ${emp.name}`}
            className="text-[var(--color-danger-500)] transition-colors hover:text-[var(--color-danger-600)]"
          >
            <IconTrash size={18} />
          </button>
          <Switch
            checked={emp.active}
            onCheckedChange={(active) => onToggleActive(emp, active)}
            aria-label={`Toggle active status for ${emp.name}`}
          />
        </div>
      ),
    },
  ]

  return (
    <div className="flex flex-col gap-[var(--space-4)] p-[var(--space-6)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[var(--space-3)]">
          <h2 className="text-[20px] font-bold text-[var(--color-text-primary)]">Employee Management</h2>
          <span className="rounded-full bg-[var(--color-primary-50)] px-[var(--space-3)] py-[var(--space-1)] text-[var(--font-size-xs)] font-semibold text-[var(--color-primary-600)]">
            {employees.length} employees
          </span>
        </div>
        <div className="flex gap-[var(--space-2)]">
          <Button
            variant="outline"
            onClick={onBulkImport}
            className="h-[36px] rounded-[var(--radius-lg)] border-[var(--color-border)] px-[var(--space-4)] text-[var(--font-size-sm)] font-semibold text-[var(--color-text-secondary)]"
          >
            Bulk Import
          </Button>
          <Button
            onClick={onAdd}
            className="h-[36px] gap-[var(--space-2)] rounded-[var(--radius-lg)] bg-[var(--color-primary-600)] px-[var(--space-4)] text-[var(--font-size-sm)] font-semibold text-white hover:bg-[var(--color-primary-700)]"
          >
            <IconPlus size={14} />
            Add Employee
          </Button>
        </div>
      </div>

      <div className="flex gap-[var(--space-2-5)]">
        <div className="flex h-[38px] flex-1 items-center gap-[var(--space-2)] rounded-[10px] border border-[var(--color-border)] bg-[var(--color-bg-page)] px-[var(--space-3)] py-[var(--space-2-5)]">
          <IconSearch size={14} className="shrink-0 text-[var(--color-text-tertiary)]" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, ID, or position…"
            className="w-full bg-transparent text-[var(--font-size-sm)] text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-tertiary)]"
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={setStatusFilter}
          options={STATUS_FILTER_OPTIONS}
          aria-label="Filter by status"
          variant="filter"
          className="min-w-[130px]"
        />
        <Select
          value={deptFilter}
          onValueChange={setDeptFilter}
          options={deptOptions}
          aria-label="Filter by department"
          variant="filter"
          className="min-w-[160px]"
        />
      </div>

      <DataTable
        columns={columns}
        rows={filtered}
        rowKey={(emp) => emp.id}
        aria-label="Employee roster"
        emptyState={
          <div className="flex flex-col items-center gap-[var(--space-2)] text-[var(--color-text-tertiary)]">
            <p className="text-[var(--font-size-sm)]">No employees found</p>
          </div>
        }
      />
    </div>
  )
}
