import * as React from 'react'
import { MetricStatCard } from '@/components/molecules/metric-stat-card/MetricStatCard'
import { IconTarget } from '@/components/icons/IconTarget'
import { IconRibbon } from '@/components/icons/IconRibbon'
import { IconCheckCircle } from '@/components/icons/IconCheckCircle'
import type { DashboardMetric } from '@/types/dashboard'
import { cn } from '@/lib/utils'

export interface DashboardMetricRowProps extends React.HTMLAttributes<HTMLDivElement> {
  okr: DashboardMetric
  competency: DashboardMetric
  overall: DashboardMetric
}

const DashboardMetricRow = React.forwardRef<HTMLDivElement, DashboardMetricRowProps>(
  ({ className, okr, competency, overall, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('grid grid-cols-1 gap-[var(--space-4)] lg:grid-cols-3', className)} {...props}>
        <MetricStatCard
          label={okr.label}
          value={okr.value}
          trendLabel={okr.trendLabel}
          trendDirection={okr.trend >= 0 ? 'up' : 'down'}
          icon={<IconTarget size={18} className="text-[var(--color-primary-600)]" />}
          iconBgClass="bg-[var(--color-primary-50)]"
          barVariant="default"
        />
        <MetricStatCard
          label={competency.label}
          value={competency.value}
          trendLabel={competency.trendLabel}
          trendDirection={competency.trend >= 0 ? 'up' : 'down'}
          icon={<IconRibbon size={18} className="text-[var(--color-success-600)]" />}
          iconBgClass="bg-[var(--color-success-50)]"
          barVariant="success"
        />
        <MetricStatCard
          label={overall.label}
          value={overall.value}
          trendLabel={overall.trendLabel}
          trendDirection={overall.trend >= 0 ? 'up' : 'down'}
          icon={<IconCheckCircle size={18} className="text-[var(--color-warning-600)]" />}
          iconBgClass="bg-[var(--color-warning-50)]"
          barVariant="warning"
        />
      </div>
    )
  }
)
DashboardMetricRow.displayName = 'DashboardMetricRow'

export { DashboardMetricRow }
