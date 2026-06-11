'use client'

import { DashboardPageTemplate } from '@/components/templates/DashboardPageTemplate'
import { DashboardMetricRow } from '@/components/organisms/dashboard-metric-row/DashboardMetricRow'
import { OkrPerformanceSection } from '@/components/organisms/okr-performance-section/OkrPerformanceSection'
import { CompetencyGrowthSection } from '@/components/organisms/competency-growth-section/CompetencyGrowthSection'
import { LeaderboardPanel } from '@/components/organisms/leaderboard-panel/LeaderboardPanel'
import { QuickAccessRow } from '@/components/organisms/quick-access-row/QuickAccessRow'
import { mockDashboardData } from '@/lib/mock/dashboard'

export default function DashboardPage() {
  const data = mockDashboardData

  return (
    <DashboardPageTemplate
      greetingName={data.greeting.name}
      greetingSubtitle={data.greeting.subtitle}
    >
      <DashboardMetricRow
        okr={data.metrics.okr}
        competency={data.metrics.competency}
        overall={data.metrics.overall}
      />

      <div className="flex flex-col gap-[var(--space-12)]">
        <OkrPerformanceSection chart={data.okrPerformance} brain={data.okrBrain} />
        <CompetencyGrowthSection chart={data.competencyGrowth} brain={data.competencyBrain} />
        <LeaderboardPanel entriesByScope={data.leaderboardByScope} />
      </div>

      <QuickAccessRow items={data.quickAccess} />
    </DashboardPageTemplate>
  )
}
