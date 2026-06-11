'use client'

import { cn } from '@/lib/utils'

export interface TeamSelectorProps {
  value: string
  options: { id: string; label: string }[]
  onChange: (id: string) => void
  className?: string
}

export function TeamSelector({ value, options, onChange, className }: TeamSelectorProps) {
  const selected = options.find((o) => o.id === value)

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Select team"
      className={cn(
        'h-9 min-w-[200px] appearance-none rounded-full border border-neutral-200 bg-white px-4 text-[13px] font-bold text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500',
        className
      )}
    >
      {options.map((opt) => (
        <option key={opt.id} value={opt.id}>
          {opt.label}
        </option>
      ))}
      {!selected && options.length === 0 && <option value="">No teams</option>}
    </select>
  )
}
