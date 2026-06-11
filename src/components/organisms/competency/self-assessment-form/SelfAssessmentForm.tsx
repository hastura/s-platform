'use client'

import { BehaviorAssessmentCard } from '@/components/organisms/competency/behavior-assessment-card/BehaviorAssessmentCard'
import { SkillSectionHeader } from '@/components/molecules/skill-section-header/SkillSectionHeader'
import type { BehaviorRating, Grade, OkrLink, Section } from '@/types/competency'
import { getBehaviorById, getCompetencyById } from '@/types/competency'
import type { EmployeeAssessment } from '@/types/competency'

export interface SelfAssessmentFormProps {
  grade: Grade
  sections: Section[]
  assessment: EmployeeAssessment
  okrLinks: OkrLink[]
  onRatingChange: (behaviorId: string, rating: BehaviorRating) => void
  onNotesChange: (behaviorId: string, notes: string) => void
  onSubmit: () => void
  submitting?: boolean
}

export function SelfAssessmentForm({
  grade,
  sections,
  assessment,
  okrLinks,
  onRatingChange,
  onNotesChange,
  onSubmit,
  submitting = false,
}: SelfAssessmentFormProps) {
  const competencyGroups = grade.assignments
    .map((assignment) => {
      const comp = getCompetencyById(sections, assignment.compId)
      const behaviors = assignment.behaviorIds
        .map((id) => getBehaviorById(sections, id))
        .filter((b): b is NonNullable<typeof b> => Boolean(b))
      return { comp, behaviors }
    })
    .filter((g) => g.comp)

  const requiredBehaviorIds = competencyGroups.flatMap((g) => g.behaviors.map((b) => b.id))
  const allRated = requiredBehaviorIds.every((id) => {
    const entry = assessment.behaviors.find((b) => b.behaviorId === id)
    return entry?.selfRating !== undefined
  })

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-base font-bold text-neutral-900">Required Competencies</h2>
      {competencyGroups.map(({ comp, behaviors }) =>
        comp ? (
          <div
            key={comp.id}
            className="rounded-2xl border border-neutral-200 bg-white p-4"
          >
            <SkillSectionHeader
              variant="assessment"
              title={comp.name}
              behaviorCount={behaviors.length}
            />
            <div className="mt-2 flex flex-col gap-3">
              {behaviors.map((behavior) => {
                const behaviorAssessment = assessment.behaviors.find(
                  (b) => b.behaviorId === behavior.id
                )
                const okr = okrLinks.find((l) => l.behaviorId === behavior.id)
                return (
                  <BehaviorAssessmentCard
                    key={behavior.id}
                    title={behavior.text}
                    description={behavior.description}
                    rating={behaviorAssessment?.selfRating}
                    onRatingChange={(r) => onRatingChange(behavior.id, r)}
                    notes={behaviorAssessment?.notes ?? ''}
                    onNotesChange={(n) => onNotesChange(behavior.id, n)}
                    okrTitle={okr?.okrTitle}
                    achievementPercent={okr?.achievementPercent}
                  />
                )
              })}
            </div>
          </div>
        ) : null
      )}
      <div className="flex justify-end pt-4">
        <button
          type="button"
          onClick={onSubmit}
          disabled={submitting || !allRated}
          className="rounded-full bg-neutral-900 px-8 py-3 text-[var(--font-size-sm)] font-bold tracking-wide text-white transition-colors hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? 'SUBMITTING…' : 'SUBMIT SELF-ASSESSMENT'}
        </button>
      </div>
    </div>
  )
}
