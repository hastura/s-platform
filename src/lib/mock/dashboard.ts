import { COMPANY_SETUP_STEPS } from '@/types/company-setup'
import type {
  DashboardData,
  DashboardMetric,
  DashboardScopeFilter,
} from '@/types/dashboard'
import { mockWeightConfig } from './weight-config'

/** Active OKR count — mirrors OKR module mock list length. */
export const MOCK_ACTIVE_OKR_COUNT = 4

/** Defined competency frameworks — mirrors Competency module mock count. */
export const MOCK_COMPETENCY_COUNT = 3

const LAST_UPDATED = 'October 12, 2023'

const OKR_CHART_BY_SCOPE: Record<DashboardScopeFilter, { label: string; value: number }[]> = {
  dept: [
    { label: 'Jan', value: 28 },
    { label: 'Feb', value: 35 },
    { label: 'Mar', value: 42 },
    { label: 'Apr', value: 48 },
    { label: 'Mei', value: 55 },
    { label: 'Jun', value: 62 },
    { label: 'Jul', value: 68 },
  ],
  team: [
    { label: 'Jan', value: 32 },
    { label: 'Feb', value: 38 },
    { label: 'Mar', value: 44 },
    { label: 'Apr', value: 50 },
    { label: 'Mei', value: 58 },
    { label: 'Jun', value: 64 },
    { label: 'Jul', value: 72 },
  ],
  employee: [
    { label: 'Jan', value: 24 },
    { label: 'Feb', value: 30 },
    { label: 'Mar', value: 36 },
    { label: 'Apr', value: 42 },
    { label: 'Mei', value: 48 },
    { label: 'Jun', value: 54 },
    { label: 'Jul', value: 60 },
  ],
}

const COMPETENCY_CHART_BY_SCOPE: Record<DashboardScopeFilter, { label: string; value: number }[]> = {
  dept: [
    { label: 'Q1-2023', value: 2.4 },
    { label: 'Q2-2023', value: 2.8 },
    { label: 'Q3-2023', value: 3.6 },
    { label: 'Q4-2023', value: 3.4 },
    { label: 'Q1-2024', value: 3.9 },
  ],
  team: [
    { label: 'Q1-2023', value: 2.6 },
    { label: 'Q2-2023', value: 3.0 },
    { label: 'Q3-2023', value: 3.7 },
    { label: 'Q4-2023', value: 3.5 },
    { label: 'Q1-2024', value: 4.1 },
  ],
  employee: [
    { label: 'Q1-2023', value: 2.2 },
    { label: 'Q2-2023', value: 2.5 },
    { label: 'Q3-2023', value: 3.2 },
    { label: 'Q4-2023', value: 3.1 },
    { label: 'Q1-2024', value: 3.6 },
  ],
}

const LEADERBOARD_BY_SCOPE: Record<
  DashboardScopeFilter,
  { rank: number; name: string; okrProgress: number; score: number }[]
> = {
  dept: [
    { rank: 1, name: 'Product & Design Dept', okrProgress: 85, score: 4.8 },
    { rank: 2, name: 'Engineering Dept', okrProgress: 70, score: 4.5 },
    { rank: 3, name: 'Marketing Dept', okrProgress: 60, score: 4.2 },
  ],
  team: [
    { rank: 1, name: 'Product Management', okrProgress: 82, score: 4.7 },
    { rank: 2, name: 'Platform Team', okrProgress: 74, score: 4.4 },
    { rank: 3, name: 'Growth Team', okrProgress: 63, score: 4.1 },
  ],
  employee: [
    { rank: 1, name: 'Budi Santoso', okrProgress: 88, score: 4.9 },
    { rank: 2, name: 'Sari Wijaya', okrProgress: 76, score: 4.6 },
    { rank: 3, name: 'Dewi Lestari', okrProgress: 65, score: 4.3 },
  ],
}

/** Blend OKR and competency percentages using configured performance weights. */
export function computeOverallProgress(okrProgress: number, competencyProgress: number): number {
  const { okrWeight, competencyWeight } = mockWeightConfig
  return Math.round((okrProgress * okrWeight + competencyProgress * competencyWeight) / 100)
}

function buildTrendLabel(trend: number): string {
  const prefix = trend >= 0 ? '+' : ''
  return `${prefix}${trend}%`
}

function buildOverallMetric(okr: DashboardMetric, competency: DashboardMetric): DashboardMetric {
  const value = computeOverallProgress(okr.value, competency.value)
  const trend = Math.round((okr.trend * mockWeightConfig.okrWeight + competency.trend * mockWeightConfig.competencyWeight) / 100)
  return {
    label: 'Overall Progress',
    value,
    trend,
    trendLabel: buildTrendLabel(trend),
  }
}

const okrMetric: DashboardMetric = {
  label: 'OKR Progress',
  value: 60,
  trend: 12,
  trendLabel: '+12%',
}

const competencyMetric: DashboardMetric = {
  label: 'Competency Progress',
  value: 40,
  trend: 2,
  trendLabel: '+2%',
}

export const mockDashboardData: DashboardData = {
  greeting: {
    name: 'Admin',
    subtitle: "Here's what's happening across your organization.",
  },
  metrics: {
    okr: okrMetric,
    competency: competencyMetric,
    overall: buildOverallMetric(okrMetric, competencyMetric),
  },
  okrPerformance: {
    title: 'OKR Performance',
    lastUpdated: LAST_UPDATED,
    dataByScope: OKR_CHART_BY_SCOPE,
    footerHighlight: '↑ 12.5%',
    footerMessage: 'Average progress has improved compared to last month.',
  },
  okrBrain: {
    title: 'Strativy Brain - OKR Performance',
    lastUpdated: LAST_UPDATED,
    summary:
      "This quarter's data highlights robust performance. Despite a pressure drop in February (Section 4), swift recalibration led to a recovery, exceeding projected targets.",
    insights: [
      {
        period: 'January',
        title: 'Crude Oil Extraction',
        description: 'Peak extraction observed in the Volkovysk Basin',
      },
      {
        period: 'February',
        title: 'Gas Lift Optimization',
        description: 'Gas lift needs adjustment for optimal output.',
      },
      {
        period: 'March',
        title: 'Water Cut Analysis',
        description: 'Water cut levels require immediate attention.',
      },
      {
        period: 'April',
        title: 'Enhanced Oil Recovery',
        description: 'EOR techniques boosted production in key sectors.',
      },
    ],
  },
  competencyGrowth: {
    title: 'Competency Growth Analytics',
    lastUpdated: LAST_UPDATED,
    dataByScope: COMPETENCY_CHART_BY_SCOPE,
    targetScore: 3.8,
    insightMessage:
      'The score exceeded the target (3.8) in Q3 thanks to an intensive upskilling program.',
  },
  competencyBrain: {
    title: 'Strativy Brain - Competency Growth Analytics',
    lastUpdated: LAST_UPDATED,
    summary:
      "This semester's performance shows strong resilience. Despite a cost anomaly in March (Point C), a quick strategic response led to a sharp recovery, projecting achievements above target.",
    insights: [
      {
        period: 'Q1-2024',
        title: 'Production Volume',
        description: 'Target output in Q1 exceeded by 15%',
      },
      {
        period: 'Q2-2024',
        title: 'Pumping Pressure',
        description: 'Pressure stabilized after new pump install',
      },
      {
        period: 'Q3-2024',
        title: 'Gas Flow Velocity',
        description: 'Velocity increased 8% with new catalyst',
      },
      {
        period: 'Q4-2024',
        title: 'Refinement Purity',
        description: 'Purity levels are within acceptable range',
      },
    ],
  },
  leaderboardByScope: LEADERBOARD_BY_SCOPE,
  quickAccess: [
    {
      title: 'Company Setup',
      description: 'Configure org structure, levels & weights',
      href: '/company-setup',
      badge: `${COMPANY_SETUP_STEPS.length} steps`,
      gradientStyle: { backgroundImage: 'var(--gradient-quick-access-primary)' },
    },
    {
      title: 'OKR Cascading',
      description: 'Align objectives from company to individual',
      href: '/okr',
      badge: `${MOCK_ACTIVE_OKR_COUNT} OKRs active`,
      gradientStyle: { backgroundImage: 'var(--gradient-quick-access-success)' },
    },
    {
      title: 'Competency Hub',
      description: 'Manage frameworks and assessments',
      href: '/competency',
      badge: `${MOCK_COMPETENCY_COUNT} competencies`,
      gradientStyle: { backgroundImage: 'var(--gradient-quick-access-warning)' },
    },
  ],
}

export const DASHBOARD_SCOPE_TABS = [
  { value: 'dept', label: 'Dept' },
  { value: 'team', label: 'Team' },
  { value: 'employee', label: 'Employee' },
] as const
