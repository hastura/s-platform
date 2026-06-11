'use client'

import { cn } from '@/lib/utils'
import { IconRibbon } from '@/components/icons'

export interface CompetencyMetricCardProps {
  label: string
  value: string
  className?: string
}

export function CompetencyMetricCard({ label, value, className }: CompetencyMetricCardProps) {
  return (
    <div
      className={cn(
        'h-[100px] overflow-hidden rounded-2xl border border-neutral-200 bg-white px-[19px] pt-[13px]',
        className
      )}
    >
      <div className="flex h-7 w-7 items-center justify-center rounded-md bg-accent-100 text-accent-600">
        <IconRibbon size={16} />
      </div>
      <p className="mt-2 text-[10px] font-semibold tracking-[0.5px] text-neutral-400">{label}</p>
      <p className="text-[28px] font-black leading-none text-accent-600">{value}</p>
    </div>
  )
}
