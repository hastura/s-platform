'use client'

import { AssignedSkillChip } from '@/components/molecules/assigned-skill-chip/AssignedSkillChip'
import { cn } from '@/lib/utils'

export interface GradeMappingCardProps {
  gradeTitle: string
  gradeBand: string
  assignedSkills: string[]
  onAddCompetency?: () => void
  className?: string
}

/** Figma Organism/Grade Mapping Card — job grade card in Mapping Workspace. */
export function GradeMappingCard({
  gradeTitle,
  gradeBand,
  assignedSkills,
  onAddCompetency,
  className,
}: GradeMappingCardProps) {
  return (
    <div
      className={cn(
        'flex min-h-[129px] w-full max-w-[360px] flex-col rounded-[14px] border border-[#E2E8EF] bg-white px-4 pt-[15px] pb-3',
        className
      )}
    >
      <h3 className="text-[14px] font-bold leading-[17px] text-[var(--color-neutral-900)]">
        {gradeTitle}
      </h3>
      {gradeBand ? (
        <p className="sr-only">{gradeBand}</p>
      ) : null}
      <div className="mt-[13px] h-px w-full bg-[#E2E8EF]" />
      <p className="mt-3 text-[10px] font-semibold leading-3 tracking-[0.5px] text-[var(--color-neutral-400)]">
        ASSIGNED SKILLS
      </p>
      <div className="mt-1.5 flex flex-wrap gap-2">
        {assignedSkills.length === 0 ? (
          <span className="text-[11px] text-[var(--color-neutral-400)]">No skills assigned</span>
        ) : (
          assignedSkills.map((skill) => <AssignedSkillChip key={skill} label={skill} />)
        )}
      </div>
      <button
        type="button"
        onClick={onAddCompetency}
        className="mt-auto pt-2 text-left text-[11px] font-semibold leading-[13px] text-[var(--color-neutral-400)] transition-colors hover:text-[var(--color-primary-600)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)]"
      >
        + ADD COMPETENCY
      </button>
    </div>
  )
}
