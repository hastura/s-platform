'use client'

import { Badge } from '@/components/atoms'
import { IconInfo } from '@/components/icons'
import { useSettingsStore } from '@/lib/stores'

const JOB_LEVELS = [
  { level: 'Staff', appraisedBy: 'Direct Manager', notes: 'Execution-focused review' },
  { level: 'Senior Staff', appraisedBy: 'Direct Manager', notes: 'Execution + mentorship signals' },
  { level: 'Manager', appraisedBy: 'Department Head', notes: 'Team outcomes included' },
  { level: 'Department Head', appraisedBy: 'VP / C-Level', notes: 'Org-level OKR alignment' },
  { level: 'VP / C-Level', appraisedBy: 'CEO / Board', notes: 'Company OKR ownership' },
]

/** Role Appraisal — PRD placeholder tab showing how the global config applies per job level. */
export function RoleAppraisalStep() {
  const weightConfig = useSettingsStore((s) => s.weightConfig)
  const ratingScales = useSettingsStore((s) => s.ratingScales)

  return (
    <section
      aria-label="Role Appraisal"
      className="flex w-full flex-col gap-[var(--space-6)] rounded-[var(--radius-2xl)] border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-[var(--space-6)]"
    >
      <div className="flex flex-col">
        <h2 className="text-[18px] font-bold leading-[19.8px] text-[var(--color-text-primary)]">Role Appraisal</h2>
        <p className="text-[var(--font-size-xs)] font-medium leading-[18px] tracking-[var(--letter-spacing-label)] text-[var(--color-text-secondary)]">
          How the company-wide weight and rating configuration applies across job levels.
        </p>
      </div>

      <div className="flex items-start gap-[var(--space-3)] rounded-[var(--radius-xl)] border border-[var(--color-primary-200)] bg-[var(--color-primary-50)] p-[var(--space-4)]">
        <IconInfo size={18} className="mt-[1px] shrink-0 text-[var(--color-primary-600)]" />
        <p className="text-[var(--font-size-sm)] font-medium text-[var(--color-primary-800)]">
          All job levels currently use the company default: OKR {weightConfig.okrWeight}% + Competency{' '}
          {weightConfig.competencyWeight}% with {ratingScales.length} rating bands. Per-level overrides arrive in a
          later release.
        </p>
      </div>

      <div className="overflow-hidden rounded-[10px] border border-[var(--color-border)]">
        <div className="flex h-[44px] items-center border-b border-[var(--color-border)] bg-[var(--color-bg-page)] px-[var(--space-4)]">
          <span className="flex-1 text-[var(--font-size-2xs)] font-bold uppercase tracking-[0.55px] text-[var(--color-text-muted)]">Job Level</span>
          <span className="w-[180px] text-[var(--font-size-2xs)] font-bold uppercase tracking-[0.55px] text-[var(--color-text-muted)]">Weight Profile</span>
          <span className="w-[170px] text-[var(--font-size-2xs)] font-bold uppercase tracking-[0.55px] text-[var(--color-text-muted)]">Appraised By</span>
          <span className="flex-1 text-[var(--font-size-2xs)] font-bold uppercase tracking-[0.55px] text-[var(--color-text-muted)]">Notes</span>
        </div>
        {JOB_LEVELS.map((row) => (
          <div key={row.level} className="flex h-[52px] items-center border-b border-[var(--color-border)] bg-[var(--color-surface)] px-[var(--space-4)] last:border-b-0">
            <span className="flex-1 text-[var(--font-size-sm)] font-semibold text-[var(--color-text-primary)]">{row.level}</span>
            <span className="w-[180px]">
              <Badge variant="primary">
                OKR {weightConfig.okrWeight}% · Comp {weightConfig.competencyWeight}%
              </Badge>
            </span>
            <span className="w-[170px] text-[var(--font-size-sm)] text-[var(--color-text-secondary)]">{row.appraisedBy}</span>
            <span className="flex-1 text-[var(--font-size-sm)] text-[var(--color-text-secondary)]">{row.notes}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
