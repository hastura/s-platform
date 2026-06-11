import type { RatingScale } from '@/types/settings'

export const mockRatingScales: RatingScale[] = [
  {
    id: 'rate-001',
    label: 'Outstanding',
    minScore: 90,
    maxScore: 100,
    description: 'Consistently exceeds every expectation and raises the bar for others.',
    color: 'success',
  },
  {
    id: 'rate-002',
    label: 'Exceeds Expectations',
    minScore: 80,
    maxScore: 89,
    description: 'Delivers beyond the agreed objectives in most areas.',
    color: 'primary',
  },
  {
    id: 'rate-003',
    label: 'Meets Expectations',
    minScore: 65,
    maxScore: 79,
    description: 'Reliably achieves the agreed objectives and competencies.',
    color: 'neutral',
  },
  {
    id: 'rate-004',
    label: 'Needs Improvement',
    minScore: 50,
    maxScore: 64,
    description: 'Partially achieves objectives; requires a structured development plan.',
    color: 'warning',
  },
  {
    id: 'rate-005',
    label: 'Unsatisfactory',
    minScore: 0,
    maxScore: 49,
    description: 'Falls significantly short of objectives; immediate action required.',
    color: 'danger',
  },
]
