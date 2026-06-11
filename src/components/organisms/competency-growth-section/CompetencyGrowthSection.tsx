'use client'

import * as React from 'react'
import { useState } from 'react'
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { ChartCard } from '@/components/molecules/chart-card/ChartCard'
import { StrativyBrainPanel } from '@/components/organisms/strativy-brain-panel/StrativyBrainPanel'
import { DASHBOARD_SCOPE_TABS } from '@/lib/mock/dashboard'
import type { DashboardBrainContent, DashboardScopeFilter } from '@/types/dashboard'
import { cn } from '@/lib/utils'

export interface CompetencyGrowthSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  chart: {
    title: string
    lastUpdated: string
    dataByScope: Record<DashboardScopeFilter, { label: string; value: number }[]>
    targetScore: number
    insightMessage: string
  }
  brain: DashboardBrainContent
}

const CompetencyGrowthSection = React.forwardRef<HTMLDivElement, CompetencyGrowthSectionProps>(
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
          filterAriaLabel="Competency growth scope filter"
          className="min-h-[520px]"
          footer={
            <p className="rounded-[var(--radius-sm)] bg-[var(--color-success-50)] px-[var(--space-3)] py-[var(--space-2)] text-[var(--font-size-2xs)] text-[var(--color-success-700)]">
              <span className="font-bold">Insight: </span>
              {chart.insightMessage}
            </p>
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
                domain={[2, 5]}
                ticks={[2, 3, 4, 5]}
                tick={{ fill: 'var(--color-text-tertiary)', fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                width={28}
              />
              <Tooltip
                formatter={(value) => [Number(value ?? 0).toFixed(1), 'Score']}
                contentStyle={{
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--color-border-subtle)',
                  fontSize: '12px',
                }}
              />
              <ReferenceLine
                y={chart.targetScore}
                stroke="var(--color-success-500)"
                strokeDasharray="4 4"
                label={{
                  value: `Target ${chart.targetScore}`,
                  position: 'insideTopRight',
                  fill: 'var(--color-success-600)',
                  fontSize: 10,
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
CompetencyGrowthSection.displayName = 'CompetencyGrowthSection'

export { CompetencyGrowthSection }
