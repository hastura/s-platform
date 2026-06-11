'use client'

import { cn } from '@/lib/utils'

export interface DepartmentFilterProps {
  value: string
  options: { id: string; label: string }[]
  onChange: (id: string) => void
  className?: string
}

export function DepartmentFilter({ value, options, onChange, className }: DepartmentFilterProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Filter by department"
      className={cn(
        'h-9 min-w-[160px] appearance-none rounded-full border border-neutral-200 bg-white px-4 text-[12px] font-semibold text-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500',
        className
      )}
    >
      <option value="all">Filter: All Departments</option>
      {options.map((opt) => (
        <option key={opt.id} value={opt.id}>
          {opt.label}
        </option>
      ))}
    </select>
  )
}
