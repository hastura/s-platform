export * from './departments'
export * from './members'
export * from './schedules'
export * from './ratings'
export * from './weight-config'
export * from './dashboard'
export * from './okrs'
export {
  mockSections,
  mockCompetencyDepartments,
  mockTeamMembers,
  mockOkrLinks,
  mockAssessments,
  mockOrgHealth,
  mockHeatmapRows,
} from './competency'

/** Simulate API latency for mock mutations. */
export function delay(ms = 450): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
