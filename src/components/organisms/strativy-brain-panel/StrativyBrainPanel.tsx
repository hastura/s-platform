import * as React from 'react'
import { cn } from '@/lib/utils'
import { InsightRow } from '@/components/molecules/insight-row/InsightRow'
import type { DashboardBrainContent } from '@/types/dashboard'

export interface StrativyBrainPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  brainContent: DashboardBrainContent
}

const StrativyBrainPanel = React.forwardRef<HTMLDivElement, StrativyBrainPanelProps>(
  ({ className, brainContent, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex min-h-[658px] flex-col items-start gap-[26px] rounded-[8px] p-[24px] [background-image:var(--gradient-brain-panel)]',
          className
        )}
        {...props}
      >
        <div className="flex w-full flex-col gap-[4px] self-stretch">
          <h3 className="text-[20px] font-bold leading-[24px] text-[#FFFFFF]">
            {brainContent.title}
          </h3>
          <p className="text-[12px] font-normal leading-[15px] text-[#94A3B8]">
            Last update: {brainContent.lastUpdated}
          </p>
        </div>

        <div className="flex w-full flex-col gap-[3px] self-stretch rounded-[8px] border border-[rgb(255_255_255/0.2)] bg-[rgb(255_255_255/0.1)] p-[16px]">
          <p className="text-[16px] font-bold leading-[24px] text-[#FFFFFF]">Overall Summary:</p>
          <p className="text-[16px] font-normal leading-[24px] text-[#FFFFFF]">
            {brainContent.summary}
          </p>
        </div>

        <div className="flex min-h-0 w-full flex-1 flex-col self-stretch">
          <p className="text-[16px] font-bold leading-[19px] text-[#FFFFFF]">Insights</p>
          <div className="brain-panel-scrollbar mt-[26px] flex min-h-0 flex-1 flex-col gap-[7px] overflow-y-auto self-stretch pr-[4px]">
            {brainContent.insights.map((insight) => (
              <InsightRow
                key={`${insight.period}-${insight.title}`}
                period={insight.period}
                title={insight.title}
                description={insight.description}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }
)
StrativyBrainPanel.displayName = 'StrativyBrainPanel'

export { StrativyBrainPanel }
