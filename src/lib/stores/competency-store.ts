import { create } from 'zustand'
import type {
  Assignment,
  BehaviorRating,
  CompetencyDepartment,
  CsvCompetencyRow,
  EmployeeAssessment,
  Grade,
  Section,
} from '@/types/competency'
import { delay } from '@/lib/mock'
import {
  mockAssessments,
  mockCompetencyDepartments,
  mockHeatmapRows,
  mockOkrLinks,
  mockOrgHealth,
  mockSections,
  mockTeamMembers,
} from '@/lib/mock/competency'

export type ReviewRole = 'admin' | 'manager' | 'employee'
export type ReviewViewLevel = 'org' | 'team' | 'individual'

const DEFAULT_TEAM_ID = 'team-pm'

function defaultReviewStateForRole(role: ReviewRole): {
  reviewViewLevel: ReviewViewLevel
  selectedTeamId: string
  selectedEmployeeId: string | null
} {
  switch (role) {
    case 'admin':
      return { reviewViewLevel: 'org', selectedTeamId: DEFAULT_TEAM_ID, selectedEmployeeId: null }
    case 'manager':
      return { reviewViewLevel: 'team', selectedTeamId: DEFAULT_TEAM_ID, selectedEmployeeId: null }
    case 'employee':
      return { reviewViewLevel: 'org', selectedTeamId: DEFAULT_TEAM_ID, selectedEmployeeId: null }
  }
}

let idCounter = 200

function nextId(prefix: string): string {
  return `${prefix}-${++idCounter}`
}

function cascadeRemoveBehavior(sections: Section[], behaviorId: string): Section[] {
  return sections.map((section) => ({
    ...section,
    competencies: section.competencies.map((comp) => ({
      ...comp,
      behaviors: comp.behaviors.filter((b) => b.id !== behaviorId),
    })),
  }))
}

function cascadeRemoveFromGrades(
  departments: CompetencyDepartment[],
  behaviorId: string
): CompetencyDepartment[] {
  return departments.map((dept) => ({
    ...dept,
    teams: dept.teams.map((team) => ({
      ...team,
      grades: team.grades.map((grade) => ({
        ...grade,
        assignments: grade.assignments
          .map((a) => ({
            ...a,
            behaviorIds: a.behaviorIds.filter((id) => id !== behaviorId),
          }))
          .filter((a) => a.behaviorIds.length > 0),
      })),
    })),
  }))
}

interface CompetencyState {
  sections: Section[]
  departments: CompetencyDepartment[]
  assessments: EmployeeAssessment[]
  selectedDepartmentId: string
  selectedTeamId: string
  selectedEmployeeId: string | null

  /** RBAC view simulation for the consolidated Review page (dev/demo control). */
  simulatedRole: ReviewRole
  reviewViewLevel: ReviewViewLevel

  setSelectedDepartment: (id: string) => void
  setSelectedTeam: (id: string) => void
  setSimulatedRole: (role: ReviewRole) => void
  drillToTeam: (teamId: string) => void
  drillToIndividual: (employeeId: string) => void
  navigateReviewBack: () => void

  // Library CRUD
  addSection: (title: string) => Promise<void>
  addCompetency: (
    sectionId: string,
    name: string,
    description: string | undefined,
    behaviors: Array<{ text: string; description?: string }>
  ) => Promise<void>
  removeBehavior: (behaviorId: string) => Promise<void>
  bulkImportSections: (rows: CsvCompetencyRow[]) => Promise<void>

  // Grade mapping
  assignCompetency: (gradeId: string, assignment: Assignment) => Promise<void>
  unassignCompetency: (gradeId: string, compId: string) => Promise<void>

  // Assessments
  updateSelfRating: (employeeId: string, behaviorId: string, rating: BehaviorRating) => void
  updateBehaviorNotes: (employeeId: string, behaviorId: string, notes: string) => void
  submitSelfAssessment: (employeeId: string) => Promise<void>

  // Read helpers
  getGradeById: (gradeId: string) => Grade | undefined
  getAssessment: (employeeId: string) => EmployeeAssessment | undefined
}

export const useCompetencyStore = create<CompetencyState>((set, get) => ({
  sections: mockSections,
  departments: mockCompetencyDepartments,
  assessments: mockAssessments,
  selectedDepartmentId: 'dept-product-tech',
  selectedTeamId: DEFAULT_TEAM_ID,
  selectedEmployeeId: null,
  simulatedRole: 'admin',
  reviewViewLevel: 'org',

  setSimulatedRole: (role) =>
    set({ simulatedRole: role, ...defaultReviewStateForRole(role) }),

  drillToTeam: (teamId) =>
    set({ selectedTeamId: teamId, reviewViewLevel: 'team', selectedEmployeeId: null }),

  drillToIndividual: (employeeId) =>
    set({ selectedEmployeeId: employeeId, reviewViewLevel: 'individual' }),

  navigateReviewBack: () => {
    const { simulatedRole, reviewViewLevel } = get()
    if (reviewViewLevel === 'individual') {
      set({ reviewViewLevel: 'team', selectedEmployeeId: null })
      return
    }
    if (reviewViewLevel === 'team' && simulatedRole === 'admin') {
      set({ reviewViewLevel: 'org', selectedEmployeeId: null })
    }
  },

  setSelectedDepartment: (id) => {
    const dept = get().departments.find((d) => d.id === id)
    const firstTeam = dept?.teams[0]?.id ?? ''
    set({ selectedDepartmentId: id, selectedTeamId: firstTeam })
  },

  setSelectedTeam: (id) => set({ selectedTeamId: id }),

  addSection: async (title) => {
    await delay()
    set((state) => ({
      sections: [...state.sections, { id: nextId('sec'), title, competencies: [] }],
    }))
  },

  addCompetency: async (sectionId, name, description, behaviorInputs) => {
    await delay()
    set((state) => ({
      sections: state.sections.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              competencies: [
                ...s.competencies,
                {
                  id: nextId('comp'),
                  name,
                  description,
                  behaviors: behaviorInputs.map(({ text, description: behaviorDescription }) => ({
                    id: nextId('beh'),
                    text,
                    description: behaviorDescription,
                  })),
                },
              ],
            }
          : s
      ),
    }))
  },

  removeBehavior: async (behaviorId) => {
    await delay(250)
    set((state) => ({
      sections: cascadeRemoveBehavior(state.sections, behaviorId),
      departments: cascadeRemoveFromGrades(state.departments, behaviorId),
    }))
  },

  bulkImportSections: async (rows) => {
    await delay(700)
    const valid = rows.filter((r) => !r.error && r.section && r.competency)
    set((state) => {
      let sections = [...state.sections]
      for (const row of valid) {
        let section = sections.find(
          (s) => s.title.toLowerCase() === row.section.toLowerCase()
        )
        if (!section) {
          section = { id: nextId('sec'), title: row.section, competencies: [] }
          sections = [...sections, section]
        }
        const behaviors = row.behaviors
          .filter(Boolean)
          .map((text) => ({ id: nextId('beh'), text }))
        const existingIdx = sections.findIndex((s) => s.id === section!.id)
        sections = sections.map((s, i) =>
          i === existingIdx
            ? {
                ...s,
                competencies: [
                  ...s.competencies,
                  { id: nextId('comp'), name: row.competency, behaviors },
                ],
              }
            : s
        )
      }
      return { sections }
    })
  },

  assignCompetency: async (gradeId, assignment) => {
    await delay()
    set((state) => ({
      departments: state.departments.map((dept) => ({
        ...dept,
        teams: dept.teams.map((team) => ({
          ...team,
          grades: team.grades.map((grade) =>
            grade.id === gradeId
              ? {
                  ...grade,
                  assignments: [
                    ...grade.assignments.filter((a) => a.compId !== assignment.compId),
                    assignment,
                  ],
                }
              : grade
          ),
        })),
      })),
    }))
  },

  unassignCompetency: async (gradeId, compId) => {
    await delay(250)
    set((state) => ({
      departments: state.departments.map((dept) => ({
        ...dept,
        teams: dept.teams.map((team) => ({
          ...team,
          grades: team.grades.map((grade) =>
            grade.id === gradeId
              ? {
                  ...grade,
                  assignments: grade.assignments.filter((a) => a.compId !== compId),
                }
              : grade
          ),
        })),
      })),
    }))
  },

  updateSelfRating: (employeeId, behaviorId, rating) => {
    set((state) => ({
      assessments: state.assessments.map((a) =>
        a.employeeId === employeeId
          ? {
              ...a,
              behaviors: a.behaviors.map((b) =>
                b.behaviorId === behaviorId ? { ...b, selfRating: rating } : b
              ),
            }
          : a
      ),
    }))
  },

  updateBehaviorNotes: (employeeId, behaviorId, notes) => {
    set((state) => ({
      assessments: state.assessments.map((a) =>
        a.employeeId === employeeId
          ? {
              ...a,
              behaviors: a.behaviors.map((b) =>
                b.behaviorId === behaviorId ? { ...b, notes } : b
              ),
            }
          : a
      ),
    }))
  },

  submitSelfAssessment: async (employeeId) => {
    await delay()
    set((state) => ({
      assessments: state.assessments.map((a) =>
        a.employeeId === employeeId
          ? { ...a, status: 'self_assessed' as const, submittedAt: new Date().toISOString().slice(0, 10) }
          : a
      ),
    }))
  },

  getGradeById: (gradeId) => {
    for (const dept of get().departments) {
      for (const team of dept.teams) {
        const grade = team.grades.find((g) => g.id === gradeId)
        if (grade) return grade
      }
    }
    return undefined
  },

  getAssessment: (employeeId) => get().assessments.find((a) => a.employeeId === employeeId),
}))

export { mockTeamMembers, mockOkrLinks, mockOrgHealth, mockHeatmapRows }
