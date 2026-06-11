'use client'

import { cn } from '@/lib/utils'

export interface TargetGapChipProps {
  value: number
  variant?: 'positive' | 'negative'
  className?: string
}

export function TargetGapChip({ value, variant = 'negative', className }: TargetGapChipProps) {
  const formatted = value > 0 ? `+${value}%` : `${value}%`
  return (
    <span
      className={cn(
        'inline-flex h-[26px] min-w-[60px] items-center justify-center rounded-[13px] px-3 text-[13px] font-bold',
        variant === 'negative' ? 'bg-danger-50 text-danger-700' : 'bg-success-50 text-success-700',
        className
      )}
    >
      {formatted}
    </span>
  )
}
