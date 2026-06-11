'use client'

import { cn } from '@/lib/utils'
import { GradeMappingCard } from '@/components/organisms/competency/grade-mapping-card/GradeMappingCard'
import type { CompetencyDepartment, Grade, Section } from '@/types/competency'
import { getCompetencyById } from '@/types/competency'

export interface MappingWorkspaceProps {
  departments: CompetencyDepartment[]
  sections: Section[]
  selectedDepartmentId: string
  onDepartmentChange: (id: string) => void
  onAddCompetency: (gradeId: string) => void
  onSave?: () => void
}

function getAssignedSkillNames(grade: Grade, sections: Section[]): string[] {
  return grade.assignments
    .map((a) => getCompetencyById(sections, a.compId)?.name)
    .filter((name): name is string => Boolean(name))
}

/** Figma Mapping Workspace — Org IA & Competency Mapping panel. */
export function MappingWorkspace({
  departments,
  sections,
  selectedDepartmentId,
  onDepartmentChange,
  onAddCompetency,
  onSave,
}: MappingWorkspaceProps) {
  const department = departments.find((d) => d.id === selectedDepartmentId)

  return (
    <div className="flex min-w-0 flex-1 flex-col px-6">
      <div className="flex min-h-[72px] items-start justify-between gap-4">
        <div className="pt-4">
          <h1 className="text-[22px] font-black leading-[27px] text-[var(--color-neutral-900)]">
            Org IA & Competency Mapping
          </h1>
          <p className="mt-1 max-w-[472px] text-[13px] font-normal leading-4 text-[var(--color-neutral-500)]">
            Design your competency frameworks by departments and grade levels. Assign skills from
            the library to each job grade.
          </p>
        </div>
        <button
          type="button"
          onClick={onSave}
          className="mt-[19px] flex h-[35px] w-[116px] shrink-0 items-center justify-center rounded-[7px] bg-[var(--color-primary-600)] px-4 py-[6px] text-[14px] font-normal leading-[21px] text-white transition-colors hover:bg-[var(--color-primary-700)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)] focus-visible:ring-offset-2"
        >
          Save
        </button>
      </div>

      {departments.length > 0 && (
        <div
          role="tablist"
          aria-label="Department filter"
          className="mt-6 flex flex-wrap gap-2"
        >
          {departments.map((d) => {
            const active = d.id === selectedDepartmentId
            return (
              <button
                key={d.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => onDepartmentChange(d.id)}
                className={cn(
                  'h-[28px] rounded-[14px] px-3 text-[12px] font-bold leading-[15px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)]',
                  active
                    ? 'bg-[var(--color-primary-600)] text-white'
                    : 'bg-[var(--color-neutral-100)] text-[var(--color-neutral-400)] hover:text-[var(--color-neutral-600)]'
                )}
              >
                {d.name.toUpperCase()}
              </button>
            )
          })}
        </div>
      )}

      <div className="mt-4 flex flex-col gap-6">
        {departments.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[var(--color-neutral-300)] bg-[var(--color-neutral-50)] px-6 py-10 text-center">
            <p className="text-sm font-semibold text-[var(--color-neutral-700)]">
              No departments in Company Setup yet
            </p>
            <p className="mt-2 text-sm text-[var(--color-neutral-500)]">
              Add departments and job positions under Company Setup → Org Structure, then return here
              to map competencies.
            </p>
          </div>
        ) : (
          department?.teams.map((team) => (
            <section key={team.id} className="flex flex-col gap-4">
              <h2 className="text-[16px] font-bold leading-[19px] text-[var(--color-neutral-900)]">
                {team.name}
              </h2>
              {team.grades.length === 0 ? (
                <p className="text-[13px] text-[var(--color-neutral-500)]">
                  No job positions yet. Add roles under this group in Company Setup.
                </p>
              ) : (
                <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
                  {team.grades.map((grade) => (
                    <GradeMappingCard
                      key={grade.id}
                      gradeTitle={grade.level}
                      gradeBand={grade.band}
                      assignedSkills={getAssignedSkillNames(grade, sections)}
                      onAddCompetency={() => onAddCompetency(grade.id)}
                    />
                  ))}
                </div>
              )}
            </section>
          ))
        )}
      </div>
    </div>
  )
}
