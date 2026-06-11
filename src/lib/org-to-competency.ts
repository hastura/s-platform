import { flattenOrgNodes } from '@/lib/mock/departments'
import type { OrgNode } from '@/types/company-setup'
import type { Assignment, CompetencyDepartment, CompetencyTeam, Grade } from '@/types/competency'

/** Parse "Junior Product Manager (G5)" → title + Grade band. */
export function parseRoleLabel(name: string): { level: string; band: string } {
  const gMatch = name.match(/^(.+?)\s*\(G(\d+)\)\s*$/i)
  if (gMatch) {
    return { level: gMatch[1].trim(), band: `Grade ${gMatch[2]}` }
  }
  const gradeMatch = name.match(/^(.+?)\s*\(Grade\s*(\d+)\)\s*$/i)
  if (gradeMatch) {
    return { level: gradeMatch[1].trim(), band: `Grade ${gradeMatch[2]}` }
  }
  return { level: name, band: '' }
}

function roleToGrade(role: OrgNode, teamId: string): Grade {
  const { level, band } = parseRoleLabel(role.name)
  return {
    id: role.id,
    teamId,
    level,
    band,
    assignments: [],
  }
}

function teamsFromDepartment(dept: OrgNode): CompetencyTeam[] {
  const teams: CompetencyTeam[] = []

  for (const child of dept.children) {
    if (child.level === 'role') {
      const fallback = teams.find((t) => t.id === `${dept.id}-roles`)
      if (fallback) {
        fallback.grades.push(roleToGrade(child, fallback.id))
      } else {
        teams.push({
          id: `${dept.id}-roles`,
          departmentId: dept.id,
          name: 'Job Positions',
          grades: [roleToGrade(child, `${dept.id}-roles`)],
        })
      }
      continue
    }

    if (child.level === 'team') {
      teams.push({
        id: child.id,
        departmentId: dept.id,
        name: child.name,
        grades: child.children.filter((c) => c.level === 'role').map((r) => roleToGrade(r, child.id)),
      })
      continue
    }

    if (child.level === 'division') {
      const directRoles = child.children.filter((c) => c.level === 'role')
      if (directRoles.length > 0) {
        teams.push({
          id: child.id,
          departmentId: dept.id,
          name: child.name,
          grades: directRoles.map((r) => roleToGrade(r, child.id)),
        })
        continue
      }

      const nestedTeams = child.children.filter((c) => c.level === 'team')
      if (nestedTeams.length > 0) {
        for (const teamChild of nestedTeams) {
          teams.push({
            id: teamChild.id,
            departmentId: dept.id,
            name: teamChild.name,
            grades: teamChild.children
              .filter((c) => c.level === 'role')
              .map((r) => roleToGrade(r, teamChild.id)),
          })
        }
      } else {
        teams.push({
          id: child.id,
          departmentId: dept.id,
          name: child.name,
          grades: [],
        })
      }
    }
  }

  return teams
}

/** Build competency setup departments/teams/grades from Company Setup org tree. */
export function orgNodesToCompetencyDepartments(orgNodes: OrgNode[]): CompetencyDepartment[] {
  const departments = flattenOrgNodes(orgNodes).filter((n) => n.level === 'department')

  return departments.map((dept) => ({
    id: dept.id,
    name: dept.name,
    teams: teamsFromDepartment(dept),
  }))
}

/** Preserve skill assignments when org structure is refreshed from Company Setup. */
export function mergeCompetencyAssignments(
  next: CompetencyDepartment[],
  previous: CompetencyDepartment[]
): CompetencyDepartment[] {
  const assignmentsByGradeId = new Map<string, Assignment[]>()

  for (const dept of previous) {
    for (const team of dept.teams) {
      for (const grade of team.grades) {
        if (grade.assignments.length > 0) {
          assignmentsByGradeId.set(grade.id, grade.assignments)
        }
      }
    }
  }

  return next.map((dept) => ({
    ...dept,
    teams: dept.teams.map((team) => ({
      ...team,
      grades: team.grades.map((grade) => ({
        ...grade,
        teamId: team.id,
        assignments: assignmentsByGradeId.get(grade.id) ?? grade.assignments,
      })),
    })),
  }))
}
