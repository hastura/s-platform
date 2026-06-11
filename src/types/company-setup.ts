// ============================================
// COMPANY SETUP - TYPE DEFINITIONS
// ============================================

import { type Employee } from '@/components/molecules/employee-card/EmployeeCard'
import { type Department } from '@/components/molecules/department-card/DepartmentCard'

// ── Org Structure Types ──────────────────────────────────────

/** Figma org hierarchy: Top Management → Dept → Division → Squad/Team → Role */
export type OrgLevel =
  | 'top_management'
  | 'department'
  | 'division'
  | 'team'
  | 'role'

export interface OrgNode {
  id: string
  name: string
  level: OrgLevel
  children: OrgNode[]
}

export interface CompanySetupEmployee extends Employee {
  active: boolean
  team?: string
  /** Job grade (5–9) used by Competency grade mapping. */
  grade?: number
  managerId?: string
  orgUnitId?: string
}

// ── Company Setup Steps ──────────────────────────────────────

export type CompanySetupStep = 
  | 'employees'
  | 'org'
  | 'competencies'
  | 'levels'
  | 'weights'
  | 'schedule'

export const COMPANY_SETUP_STEPS: CompanySetupStep[] = [
  'employees',
  'org',
  'competencies',
  'levels',
  'weights',
  'schedule',
]

// ── Employee Types ───────────────────────────────────────────

export type EmployeeStatus = 'Permanent' | 'Contract' | 'Probation' | 'Intern'

export interface EmployeeFormData {
  id: string
  name: string
  email?: string
  position: string
  department?: string
  status: EmployeeStatus
}

// ── Department Types ─────────────────────────────────────────

export interface DepartmentFormData {
  name: string
  memberCount: number
  teamCount: number
  color: string
}

// ── Competency Types ─────────────────────────────────────────

export interface CompetencyTemplate {
  id: string
  name: string
  description: string
  categories: CompetencyCategory[]
}

export interface CompetencyCategory {
  id: string
  name: string
  weight: number
  indicators: CompetencyIndicator[]
}

export interface CompetencyIndicator {
  id: string
  description: string
  levels: string[]
}

// ── Level Assignment Types ───────────────────────────────────

export interface EmployeeLevel {
  employeeId: string
  level: string
  competencyScore?: number
}

export const EMPLOYEE_LEVELS = [
  'Junior',
  'Mid',
  'Senior',
  'Lead',
  'Manager',
  'Director',
  'VP',
  'C-Level',
] as const

export type EmployeeLevelType = typeof EMPLOYEE_LEVELS[number]

// ── Weight Setup Types ───────────────────────────────────────

export interface WeightConfig {
  okrWeight: number
  competencyWeight: number
}

// ── Schedule Types ───────────────────────────────────────────

export interface ReviewSchedule {
  startDate: Date
  endDate: Date
  reminderDays: number
  frequency: 'monthly' | 'quarterly' | 'semi-annual' | 'annual'
}

// ── Company Setup State ──────────────────────────────────────

export interface CompanySetupState {
  companyName: string
  currentStep: CompanySetupStep
  employees: Employee[]
  departments: Department[]
  competencies: CompetencyTemplate[]
  employeeLevels: EmployeeLevel[]
  weightConfig: WeightConfig
  reviewSchedule: ReviewSchedule | null
  isComplete: boolean
}
