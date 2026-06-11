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
        'flex min-h-[129px] flex-col rounded-[14px] border border-neutral-200 bg-white px-[15px] py-[14px]',
        className
      )}
    >
      <h3 className="text-[14px] font-bold text-neutral-900">{gradeTitle}</h3>
      {gradeBand ? (
        <p className="mt-0.5 text-[10px] font-medium text-neutral-400">{gradeBand}</p>
      ) : null}
      <div className="my-[10px] h-px bg-neutral-200" />
      <p className="text-[10px] font-semibold tracking-[0.5px] text-neutral-400">ASSIGNED SKILLS</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {assignedSkills.length === 0 ? (
          <span className="text-[11px] text-neutral-400">No skills assigned</span>
        ) : (
          assignedSkills.map((skill) => <AssignedSkillChip key={skill} label={skill} />)
        )}
      </div>
      <button
        type="button"
        onClick={onAddCompetency}
        className="mt-3 text-left text-[11px] font-semibold text-neutral-400 transition-colors hover:text-accent-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500"
      >
        + ADD COMPETENCY
      </button>
    </div>
  )
}
