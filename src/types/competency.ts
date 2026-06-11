// ── Competency Management types ─────────────────────────────────────────────

/** Per-behavior rating on the Figma 1–5 scale (Rarely → Consistently). */
export type BehaviorRating = 1 | 2 | 3 | 4 | 5

export const BEHAVIOR_RATING_MAX = 5

export const RATING_SCALE_LABELS: Record<BehaviorRating, string> = {
  1: 'Rarely',
  2: 'Sometimes',
  3: 'Often',
  4: 'Usually',
  5: 'Consistently',
}

/** Normalize an average 1–5 behavior rating to a 0–100 percentage. */
export function normalizeBehaviorScore(avgRating: number): number {
  return Math.round((avgRating / BEHAVIOR_RATING_MAX) * 100)
}

// ── Skill library ───────────────────────────────────────────────────────────

export interface Behavior {
  id: string
  text: string
  description?: string
}

export interface Competency {
  id: string
  name: string
  description?: string
  behaviors: Behavior[]
}

export interface Section {
  id: string
  title: string
  description?: string
  competencies: Competency[]
}

// ── Organizational mapping ────────────────────────────────────────────────────

export interface Assignment {
  compId: string
  behaviorIds: string[]
}

export interface Grade {
  id: string
  teamId: string
  level: string
  band: string
  assignments: Assignment[]
}

export interface CompetencyTeam {
  id: string
  departmentId: string
  name: string
  grades: Grade[]
}

export interface CompetencyDepartment {
  id: string
  name: string
  teams: CompetencyTeam[]
}

// ── Assessments ───────────────────────────────────────────────────────────────

export type AssessmentStatus = 'not_started' | 'self_assessed' | 'needs_review' | 'completed'

export interface BehaviorAssessment {
  behaviorId: string
  selfRating?: BehaviorRating
  managerRating?: BehaviorRating
  notes?: string
}

export interface EmployeeAssessment {
  employeeId: string
  gradeId: string
  status: AssessmentStatus
  behaviors: BehaviorAssessment[]
  submittedAt?: string
}

export interface TeamMember {
  id: string
  name: string
  initials: string
  role: string
  gradeId: string
  gradeBand: string
  teamId: string
  managerId?: string
}

export interface OkrLink {
  behaviorId: string
  okrTitle: string
  achievementPercent: number
}

// ── Admin analytics ───────────────────────────────────────────────────────────

export interface OrgHealthMetrics {
  frameworkCoverage: number
  criticalSkillGaps: number
  pendingAppraisals: number
  qoqGrowthVelocity: number
}

export interface HeatmapCell {
  gradeLabel: string
  proficiency: number
  barVariant: 'accent' | 'success' | 'warning' | 'danger'
}

export interface HeatmapRow {
  competencyName: string
  cells: HeatmapCell[]
  targetGap: number
  gapVariant: 'positive' | 'negative'
}

// ── CSV import ────────────────────────────────────────────────────────────────

export const CSV_TEMPLATE_HEADERS = 'Section,Competency,Behavior 1,Behavior 2,Behavior 3'

export interface CsvCompetencyRow {
  line: number
  section: string
  competency: string
  behaviors: string[]
  error?: string
}

// ── Helpers ─────────────────────────────────────────────────────────────────

export function getCompetencyById(sections: Section[], compId: string): Competency | undefined {
  for (const section of sections) {
    const found = section.competencies.find((c) => c.id === compId)
    if (found) return found
  }
  return undefined
}

export function getBehaviorById(sections: Section[], behaviorId: string): Behavior | undefined {
  for (const section of sections) {
    for (const comp of section.competencies) {
      const found = comp.behaviors.find((b) => b.id === behaviorId)
      if (found) return found
    }
  }
  return undefined
}

export function computeAssignmentCoverage(
  assignment: Assignment,
  sections: Section[]
): { total: number; mapped: number; percent: number } {
  const comp = getCompetencyById(sections, assignment.compId)
  const total = comp?.behaviors.length ?? 0
  const mapped = assignment.behaviorIds.length
  return { total, mapped, percent: total > 0 ? Math.round((mapped / total) * 100) : 0 }
}

export function computeEmployeeCoverage(
  grade: Grade,
  sections: Section[],
  assessment?: EmployeeAssessment
): number {
  const requiredIds = grade.assignments.flatMap((a) => a.behaviorIds)
  if (requiredIds.length === 0) return 0
  if (!assessment) return 0
  const rated = assessment.behaviors.filter(
    (b) => requiredIds.includes(b.behaviorId) && (b.selfRating ?? b.managerRating)
  ).length
  return Math.round((rated / requiredIds.length) * 100)
}

/** Legacy aliases kept for backward compatibility. */
export type CompetencyBehavior = Behavior
export type CompetencyDefinition = Competency & { description?: string; appliesTo?: string[] }
