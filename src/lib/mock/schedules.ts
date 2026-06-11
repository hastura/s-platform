import type { ReviewCycleSchedule, ScheduleStatus } from '@/types/settings'

export const mockSchedules: ReviewCycleSchedule[] = [
  {
    id: 'sch-001',
    name: 'H1 2026 Performance Review',
    scope: 'okr_competency',
    level: 'department',
    frequency: 'quarterly',
    startDate: '2026-01-01',
    endDate: '2026-06-30',
    archived: false,
  },
  {
    id: 'sch-002',
    name: 'Engineering Weekly Sync',
    scope: 'okr',
    level: 'department',
    frequency: 'weekly',
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    archived: false,
  },
  {
    id: 'sch-003',
    name: 'H2 2026 Preparations',
    scope: 'competency',
    level: 'department',
    frequency: 'semester',
    startDate: '2026-07-01',
    endDate: '2026-12-31',
    archived: false,
  },
  {
    id: 'sch-004',
    name: 'Platform Team Sprint Check-in',
    scope: 'okr',
    level: 'team',
    frequency: 'biweekly',
    startDate: '2026-02-01',
    endDate: '2026-12-18',
    archived: false,
  },
  {
    id: 'sch-005',
    name: 'Design Critique Cadence',
    scope: 'competency',
    level: 'team',
    frequency: 'custom',
    customDays: ['mon', 'wed'],
    startDate: '2026-03-02',
    endDate: '2026-11-30',
    archived: false,
  },
  {
    id: 'sch-006',
    name: 'New Hire 90-Day Review',
    scope: 'okr_competency',
    level: 'employee',
    frequency: 'monthly',
    startDate: '2026-04-01',
    endDate: '2026-06-30',
    archived: false,
  },
  {
    id: 'sch-007',
    name: 'Sales Daily Pipeline Pulse',
    scope: 'okr',
    level: 'employee',
    frequency: 'daily',
    startDate: '2026-01-15',
    endDate: '2026-03-31',
    archived: false,
  },
  {
    id: 'sch-008',
    name: 'FY2025 Annual Review',
    scope: 'okr_competency',
    level: 'department',
    frequency: 'quarterly',
    startDate: '2025-01-01',
    endDate: '2025-12-31',
    archived: true,
  },
]

/** Derive the lifecycle status from the schedule dates (PRD: categorize by status). */
export function getScheduleStatus(schedule: ReviewCycleSchedule, now = new Date()): ScheduleStatus {
  const start = new Date(schedule.startDate + 'T00:00:00')
  const end = new Date(schedule.endDate + 'T23:59:59')
  if (now < start) return 'upcoming'
  if (now > end) return 'completed'
  return 'active'
}
