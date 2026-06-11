'use client'

import { cn } from '@/lib/utils'

export interface ReviewCareerHeroProps {
  initials: string
  gradeBand: string
  roleTitle: string
  assessmentType?: string
  className?: string
}

export function ReviewCareerHero({
  initials,
  gradeBand,
  roleTitle,
  assessmentType = 'SELF ASSESSMENT',
  className,
}: ReviewCareerHeroProps) {
  return (
    <div
      className={cn(
        'relative flex items-center gap-7 overflow-hidden rounded-[20px] border border-neutral-200 bg-white px-6 py-7',
        className
      )}
    >
      <div className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-2xl bg-accent-600 text-[22px] font-black text-white">
        {initials}
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-[11px] font-semibold tracking-[0.6px] text-neutral-400">
          {gradeBand} • {assessmentType}
        </span>
        <h1 className="text-[28px] font-black leading-tight text-neutral-900">My Career Path</h1>
        <p className="text-[var(--font-size-sm)] text-neutral-500">
          Currently mapped to{' '}
          <span className="font-semibold text-accent-600">{roleTitle}</span> standards.
        </p>
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute right-8 top-1/2 h-24 w-24 -translate-y-1/2 rounded-full border-[12px] border-neutral-100"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-14 top-1/2 h-12 w-12 -translate-y-1/2 rounded-full border-[8px] border-neutral-50"
      />
    </div>
  )
}
