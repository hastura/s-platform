'use client'

import * as React from 'react'
import { useState } from 'react'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { ChartCard } from '@/components/molecules/chart-card/ChartCard'
import { StrativyBrainPanel } from '@/components/organisms/strativy-brain-panel/StrativyBrainPanel'
import { DASHBOARD_SCOPE_TABS } from '@/lib/mock/dashboard'
import type { DashboardBrainContent, DashboardChartSection, DashboardScopeFilter } from '@/types/dashboard'
import { cn } from '@/lib/utils'

export interface OkrPerformanceSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  chart: DashboardChartSection
  brain: DashboardBrainContent
}

const OkrPerformanceSection = React.forwardRef<HTMLDivElement, OkrPerformanceSectionProps>(
  ({ className, chart, brain, ...props }, ref) => {
    const [scope, setScope] = useState<DashboardScopeFilter>('dept')
    const data = chart.dataByScope[scope]

    return (
      <div
        ref={ref}
        className={cn('grid grid-cols-1 gap-[var(--space-5)] lg:grid-cols-[1.545fr_1fr]', className)}
        {...props}
      >
        <ChartCard
          title={chart.title}
          lastUpdated={chart.lastUpdated}
          filterItems={[...DASHBOARD_SCOPE_TABS]}
          filterValue={scope}
          onFilterChange={(value) => setScope(value as DashboardScopeFilter)}
          filterAriaLabel="OKR performance scope filter"
          className="min-h-[520px]"
          footer={
            chart.footerHighlight || chart.footerMessage ? (
              <p className="rounded-[var(--radius-sm)] bg-[var(--color-success-50)] px-[var(--space-3)] py-[var(--space-2)] text-[var(--font-size-2xs)]">
                {chart.footerHighlight ? (
                  <span className="font-bold text-[var(--color-success-700)]">{chart.footerHighlight} </span>
                ) : null}
                <span className="text-[var(--color-text-muted)]">{chart.footerMessage}</span>
              </p>
            ) : undefined
          }
        >
          <ResponsiveContainer width="100%" height={360}>
            <LineChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
              <CartesianGrid stroke="var(--color-neutral-200)" strokeDasharray="0" vertical={false} />
              <XAxis
                dataKey="label"
                tick={{ fill: 'var(--color-text-muted)', fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                domain={[0, 100]}
                ticks={[25, 50, 75, 100]}
                tickFormatter={(v) => `${v}%`}
                tick={{ fill: 'var(--color-text-tertiary)', fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                width={36}
              />
              <Tooltip
                formatter={(value) => [`${Number(value ?? 0)}%`, 'Progress']}
                contentStyle={{
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--color-border-subtle)',
                  fontSize: '12px',
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="var(--color-primary-500)"
                strokeWidth={2}
                dot={{ r: 4, fill: 'var(--color-primary-500)', strokeWidth: 0 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <StrativyBrainPanel brainContent={brain} className="min-h-[520px]" />
      </div>
    )
  }
)
OkrPerformanceSection.displayName = 'OkrPerformanceSection'

export { OkrPerformanceSection }
