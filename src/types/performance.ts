export const EXECUTION_WEIGHT = 0.8
export const LEADERSHIP_WEIGHT = 0.2

export interface PerformanceScore {
  executionScore: number
  leadershipScore: number
  total: number
}

export type ReviewStatus = 'pending' | 'in_progress' | 'completed'

export interface PerformanceReview {
  id: string
  employeeId: string
  reviewerId: string
  cycleId: string
  status: ReviewStatus
  scores: PerformanceScore
}
