'use client'

import { GradeMappingCard } from '@/components/organisms/competency/grade-mapping-card/GradeMappingCard'
import { ChipTabs } from '@/components/molecules/chip-tabs/ChipTabs'
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
    <div className="flex min-w-0 flex-1 flex-col gap-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-neutral-900">Org IA & Competency Mapping</h1>
          <p className="mt-1 max-w-xl text-[var(--font-size-sm)] text-neutral-500">
            Design your competency frameworks by departments and grade levels. Assign skills from
            the library to each job grade.
          </p>
        </div>
        <button
          type="button"
          onClick={onSave}
          className="shrink-0 rounded-full bg-accent-600 px-6 py-2.5 text-[var(--font-size-sm)] font-semibold text-white hover:bg-accent-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500"
        >
          Save
        </button>
      </div>

      <ChipTabs
        variant="filter"
        colorScheme="accent"
        aria-label="Department filter"
        items={departments.map((d) => ({ value: d.id, label: d.name.toUpperCase() }))}
        value={selectedDepartmentId}
        onValueChange={onDepartmentChange}
      />

      {department?.teams.map((team) => (
        <section key={team.id} className="flex flex-col gap-4">
          <h2 className="text-lg font-bold text-neutral-900">{team.name}</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
        </section>
      ))}
    </div>
  )
}
