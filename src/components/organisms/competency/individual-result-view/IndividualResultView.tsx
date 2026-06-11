'use client'

import { BehaviorAssessmentCard } from '@/components/organisms/competency/behavior-assessment-card/BehaviorAssessmentCard'
import { SkillSectionHeader } from '@/components/molecules/skill-section-header/SkillSectionHeader'
import {
  mockOkrLinks,
  mockTeamMembers,
  useCompetencyStore,
} from '@/lib/stores/competency-store'
import { getBehaviorById, getCompetencyById } from '@/types/competency'

export interface IndividualResultViewProps {
  employeeId: string
}

export function IndividualResultView({ employeeId }: IndividualResultViewProps) {
  const sections = useCompetencyStore((s) => s.sections)
  const getGradeById = useCompetencyStore((s) => s.getGradeById)
  const getAssessment = useCompetencyStore((s) => s.getAssessment)

  const employee = mockTeamMembers.find((m) => m.id === employeeId)
  const grade = employee ? getGradeById(employee.gradeId) : undefined
  const assessment = getAssessment(employeeId)

  if (!employee || !grade || !assessment) {
    return (
      <div className="rounded-2xl border border-neutral-200 bg-white p-8 text-neutral-500">
        No assessment data available for this employee.
      </div>
    )
  }

  const competencyGroups = grade.assignments
    .map((assignment) => {
      const comp = getCompetencyById(sections, assignment.compId)
      const behaviors = assignment.behaviorIds
        .map((id) => getBehaviorById(sections, id))
        .filter((b): b is NonNullable<typeof b> => Boolean(b))
      return { comp, behaviors }
    })
    .filter((g) => g.comp)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-5 rounded-[20px] border border-neutral-200 bg-white px-6 py-5">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-accent-600 text-lg font-black text-white">
          {employee.initials}
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-semibold tracking-[0.6px] text-neutral-400">
            {employee.gradeBand} • INDIVIDUAL RESULT
          </span>
          <h1 className="text-[28px] font-black leading-tight text-neutral-900">{employee.name}</h1>
          <p className="text-[var(--font-size-sm)] text-neutral-500">
            {employee.role} • Read-only manager view of self-assessment
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-base font-bold text-neutral-900">Required Competencies</h2>
        {competencyGroups.map(({ comp, behaviors }) =>
          comp ? (
            <div key={comp.id} className="rounded-2xl border border-neutral-200 bg-white p-4">
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
                  const okr = mockOkrLinks.find((l) => l.behaviorId === behavior.id)
                  const displayRating =
                    behaviorAssessment?.managerRating ?? behaviorAssessment?.selfRating

                  return (
                    <BehaviorAssessmentCard
                      key={behavior.id}
                      title={behavior.text}
                      description={behavior.description}
                      rating={displayRating}
                      notes={behaviorAssessment?.notes ?? ''}
                      okrTitle={okr?.okrTitle}
                      achievementPercent={okr?.achievementPercent}
                      notesLabel="Employee reflection / evidence"
                      readOnly
                    />
                  )
                })}
              </div>
            </div>
          ) : null
        )}
      </div>
    </div>
  )
}
