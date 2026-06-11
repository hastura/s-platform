import type { CSSProperties } from 'react'

// ============================================
// DASHBOARD - TYPE DEFINITIONS
// ============================================

export type DashboardScopeFilter = 'dept' | 'team' | 'employee'

export interface DashboardMetric {
  label: string
  value: number
  trend: number
  trendLabel: string
}

export interface DashboardChartPoint {
  label: string
  value: number
}

export interface DashboardBrainInsight {
  period: string
  title: string
  description: string
}

export interface DashboardBrainContent {
  title: string
  lastUpdated: string
  summary: string
  insights: DashboardBrainInsight[]
}

export interface DashboardChartSection {
  title: string
  lastUpdated: string
  dataByScope: Record<DashboardScopeFilter, DashboardChartPoint[]>
  footerHighlight?: string
  footerMessage?: string
}

export interface DashboardLeaderboardEntry {
  rank: number
  name: string
  okrProgress: number
  score: number
  scoreMax?: number
}

export interface DashboardQuickAccessItem {
  title: string
  description: string
  href: string
  badge: string
  gradientStyle: CSSProperties
}

export interface DashboardData {
  greeting: {
    name: string
    subtitle: string
  }
  metrics: {
    okr: DashboardMetric
    competency: DashboardMetric
    overall: DashboardMetric
  }
  okrPerformance: DashboardChartSection
  okrBrain: DashboardBrainContent
  competencyGrowth: DashboardChartSection & {
    targetScore: number
    insightMessage: string
  }
  competencyBrain: DashboardBrainContent
  leaderboardByScope: Record<DashboardScopeFilter, DashboardLeaderboardEntry[]>
  quickAccess: DashboardQuickAccessItem[]
}
