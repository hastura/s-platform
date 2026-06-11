// ── Settings domain types (Phase 2A) ─────────────────────────

// Performance Weight Configuration
export interface PerformanceWeightConfig {
  /** OKR weight in percent (0–100). Competency weight is always 100 − okrWeight. */
  okrWeight: number
  competencyWeight: number
  /** True while an appraisal cycle is running — weights are locked. */
  isLocked: boolean
  updatedAt: string
  updatedBy: string
}

export const WEIGHT_STEP = 5
export const WEIGHT_TOTAL = 100

// Schedule & Reminders
export type AssessmentScope = 'okr' | 'competency' | 'okr_competency'

export type CheckInFrequency =
  | 'daily'
  | 'weekly'
  | 'biweekly'
  | 'monthly'
  | 'quarterly'
  | 'semester'
  | 'custom'

export type ScheduleLevel = 'department' | 'team' | 'employee'

export type Weekday = 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat'

export type ScheduleStatus = 'upcoming' | 'active' | 'completed'

export interface ReviewCycleSchedule {
  id: string
  name: string
  scope: AssessmentScope
  level: ScheduleLevel
  frequency: CheckInFrequency
  /** Only set when frequency === 'custom'. */
  customDays?: Weekday[]
  /** ISO date strings (yyyy-mm-dd). */
  startDate: string
  endDate: string
  archived: boolean
}

// Invite Members
export type MemberRole = 'super_admin' | 'company_admin' | 'manager' | 'employee'

export type EmploymentStatus = 'permanent' | 'contract' | 'probation'

export interface Member {
  id: string
  employeeId: string
  name: string
  email: string
  department: string
  team?: string
  position: string
  role: MemberRole
  status: EmploymentStatus
  /** Account enabled/disabled toggle. */
  active: boolean
}

export type InviteStatus = 'pending' | 'expired' | 'revoked'

export interface PendingInvite {
  id: string
  email: string
  name: string
  role: MemberRole
  department: string
  invitedAt: string
  expiresAt: string
  status: InviteStatus
}

// Performance Config — rating scales
export interface RatingScale {
  id: string
  label: string
  /** Inclusive lower bound of the final score range (0–100). */
  minScore: number
  /** Inclusive upper bound of the final score range (0–100). */
  maxScore: number
  description: string
  color: 'success' | 'primary' | 'warning' | 'danger' | 'neutral'
}

export const MEMBER_ROLE_LABELS: Record<MemberRole, string> = {
  super_admin: 'Super Admin',
  company_admin: 'Company Admin',
  manager: 'Manager',
  employee: 'Employee',
}

export const ASSESSMENT_SCOPE_LABELS: Record<AssessmentScope, string> = {
  okr: 'OKR Only',
  competency: 'Competencies Only',
  okr_competency: 'OKR & Competencies',
}

export const FREQUENCY_LABELS: Record<CheckInFrequency, string> = {
  daily: 'Daily',
  weekly: 'Weekly',
  biweekly: 'Bi-weekly',
  monthly: 'Monthly',
  quarterly: 'Quarterly',
  semester: 'Semester',
  custom: 'Custom',
}
