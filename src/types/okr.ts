export type OkrLevel = 'company' | 'department' | 'team' | 'individual'
export type OkrStatus = 'on_track' | 'at_risk' | 'off_track'
export type OkrPageTab = 'overview' | 'alignment' | 'analytics'
export type OkrViewMode = 'list' | 'tree'

export interface OkrTag {
  label: string
  variant?: 'jira' | 'default'
}

export interface KeyResult {
  id: string
  title: string
  progress: number
  status: OkrStatus
  ownerId: string
  weight: number
  target: number
  current: number
  dueDate: string
}

export interface Objective {
  id: string
  title: string
  level: OkrLevel
  status: OkrStatus
  progress: number
  ownerId: string
  ownerName: string
  ownerRole: string
  parentId?: string
  periodId: string
  teamId?: string
  departmentId?: string
  dueDate: string
  tags?: OkrTag[]
  keyResults: KeyResult[]
  children?: Objective[]
  hasJira?: boolean
}

export interface OkrFilters {
  search: string
  ownerId: string | null
  teamId: string | null
  status: OkrStatus | null
  periodId: string | null
}

export interface OkrOwnerOption {
  id: string
  name: string
  role: string
}

export interface OkrTeamOption {
  id: string
  name: string
}

/** Flattened row for cascade list rendering. */
export interface OkrCascadeRowData {
  objective: Objective
  depth: number
  isLast: boolean
  parentChain: boolean[]
}
