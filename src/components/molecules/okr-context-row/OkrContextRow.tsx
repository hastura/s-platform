'use client'

import { cn } from '@/lib/utils'
import { IconTarget } from '@/components/icons'

export interface OkrContextRowProps {
  okrTitle: string
  achievementPercent: number
  className?: string
}

export function OkrContextRow({ okrTitle, achievementPercent, className }: OkrContextRowProps) {
  return (
    <div
      className={cn(
        'flex h-16 items-center justify-between rounded-xl border border-neutral-200 border-b border-t bg-neutral-50 px-6 py-3',
        className
      )}
    >
      <div className="flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent-100 text-accent-600">
          <IconTarget size={18} />
        </div>
        <div className="flex flex-col gap-px">
          <span className="text-[8px] font-medium tracking-[0.72px] text-accent-500">
            LINKED OKR CONTEXT
          </span>
          <span className="text-[11px] font-bold text-accent-700">{okrTitle}</span>
        </div>
      </div>
      <div className="text-right text-neutral-900">
        <p className="text-[19px] font-bold leading-none">{achievementPercent}%</p>
        <p className="text-[8px] font-normal">Achievement</p>
      </div>
    </div>
  )
}
