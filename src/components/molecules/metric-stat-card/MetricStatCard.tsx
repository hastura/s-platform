import * as React from 'react'
import { cn } from '@/lib/utils'
import { ProgressBar } from '@/components/atoms/progress-bar/ProgressBar'

export interface MetricStatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string
  value: number
  trendLabel: string
  trendDirection?: 'up' | 'down' | 'neutral'
  icon: React.ReactNode
  iconBgClass?: string
  barVariant?: 'default' | 'success' | 'warning'
}

const MetricStatCard = React.forwardRef<HTMLDivElement, MetricStatCardProps>(
  (
    {
      className,
      label,
      value,
      trendLabel,
      trendDirection = 'up',
      icon,
      iconBgClass = 'bg-[var(--color-primary-50)]',
      barVariant = 'default',
      ...props
    },
    ref
  ) => {
    const trendColor =
      trendDirection === 'up'
        ? 'bg-[var(--color-success-100)] text-[var(--color-success-600)]'
        : trendDirection === 'down'
          ? 'bg-[var(--color-danger-100)] text-[var(--color-danger-600)]'
          : 'bg-[var(--color-neutral-100)] text-[var(--color-text-muted)]'

    return (
      <div
        ref={ref}
        className={cn(
          'flex h-[160px] flex-1 flex-col gap-[var(--space-3)] rounded-[var(--radius-2xl)] border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-[var(--space-5)] shadow-[var(--shadow-elevation-02)]',
          className
        )}
        {...props}
      >
        <div className="flex items-start justify-between">
          <div
            className={cn(
              'flex size-10 items-center justify-center rounded-[var(--radius-md)]',
              iconBgClass
            )}
          >
            {icon}
          </div>
          <span
            className={cn(
              'rounded-[var(--radius-sm)] px-[var(--space-2)] py-[var(--space-1)] text-[var(--font-size-xs)] font-bold tracking-[var(--letter-spacing-label)]',
              trendColor
            )}
          >
            {trendLabel}
          </span>
        </div>

        <p className="text-[var(--font-size-2xl)] font-semibold leading-[26px] text-[var(--color-text-primary)]">
          {value}%
        </p>

        <p className="text-[var(--font-size-xs)] font-bold tracking-[var(--letter-spacing-label)] text-[var(--color-text-secondary)]">
          {label}
        </p>

        <ProgressBar value={value} max={100} size="sm" variant={barVariant} flatTrack className="mt-auto" />
      </div>
    )
  }
)
MetricStatCard.displayName = 'MetricStatCard'

export { MetricStatCard }
