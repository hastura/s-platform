import type { KeyResult, Objective, OkrCascadeRowData, OkrLevel, OkrStatus } from '@/types/okr'

const ON_TRACK_THRESHOLD = 70
const AT_RISK_THRESHOLD = 40

export function deriveStatusFromProgress(progress: number): OkrStatus {
  if (progress >= ON_TRACK_THRESHOLD) return 'on_track'
  if (progress >= AT_RISK_THRESHOLD) return 'at_risk'
  return 'off_track'
}

export function calculateObjectiveProgress(keyResults: KeyResult[]): number {
  if (keyResults.length === 0) return 0
  const totalWeight = keyResults.reduce((sum, kr) => sum + kr.weight, 0)
  if (totalWeight === 0) return 0
  const weighted = keyResults.reduce((sum, kr) => sum + kr.progress * kr.weight, 0)
  return Math.round(weighted / totalWeight)
}

export const OKR_LEVEL_LABEL: Record<OkrLevel, string> = {
  company: 'Company',
  department: 'Department',
  team: 'Team',
  individual: 'Individual',
}

/* Figma OKR Cascading mockup: company = indigo #4f46e5, department = blue
   #3b82f6, team = emerald #059669/#10b981 (NOT the success green scale). */
export const OKR_LEVEL_COLOR: Record<OkrLevel, string> = {
  company: 'text-[var(--color-okr-company)]',
  department: 'text-[var(--color-okr-department)]',
  team: 'text-[var(--color-okr-team)]',
  individual: 'text-[var(--color-okr-individual)]',
}

export const OKR_LEVEL_ICON_BG: Record<OkrLevel, string> = {
  company: 'bg-[var(--color-okr-company-bg)]',
  department: 'bg-[var(--color-okr-department-bg)]',
  team: 'bg-[var(--color-okr-team-bg)]',
  individual: 'bg-[var(--color-okr-individual-bg)]',
}

export const OKR_LEVEL_PROGRESS: Record<OkrLevel, string> = {
  company: 'bg-[var(--color-okr-company)]',
  department: 'bg-[var(--color-okr-department)]',
  team: 'bg-[var(--color-okr-team-progress)]',
  individual: 'bg-neutral-500',
}

export const OKR_STATUS_LABEL: Record<OkrStatus, string> = {
  on_track: 'On Track',
  at_risk: 'At Risk',
  off_track: 'Off Track',
}

export const OKR_STATUS_BADGE: Record<OkrStatus, string> = {
  on_track: 'text-success-500 bg-success-50',
  at_risk: 'text-warning-500 bg-warning-50',
  off_track: 'text-danger-500 bg-danger-50',
}

export function flattenObjectiveTree(
  objectives: Objective[],
  depth = 0,
  parentChain: boolean[] = []
): OkrCascadeRowData[] {
  const rows: OkrCascadeRowData[] = []

  objectives.forEach((objective, index) => {
    const isLast = index === objectives.length - 1
    rows.push({ objective, depth, isLast, parentChain: [...parentChain] })

    if (objective.children?.length) {
      rows.push(
        ...flattenObjectiveTree(objective.children, depth + 1, [...parentChain, !isLast])
      )
    }
  })

  return rows
}

export function filterObjectiveTree(objectives: Objective[], predicate: (obj: Objective) => boolean): Objective[] {
  const result: Objective[] = []

  for (const obj of objectives) {
    const filteredChildren = obj.children ? filterObjectiveTree(obj.children, predicate) : undefined
    const matches = predicate(obj)
    const hasMatchingChildren = Boolean(filteredChildren && filteredChildren.length > 0)

    if (matches || hasMatchingChildren) {
      const next: Objective = { ...obj }
      if (filteredChildren !== undefined) {
        next.children = filteredChildren
      }
      result.push(next)
    }
  }

  return result
}

export function findObjectiveById(objectives: Objective[], id: string): Objective | undefined {
  for (const obj of objectives) {
    if (obj.id === id) return obj
    if (obj.children) {
      const found = findObjectiveById(obj.children, id)
      if (found) return found
    }
  }
  return undefined
}

export function formatDueDate(isoDate: string): string {
  return new Date(isoDate + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}
