import * as React from 'react'
import { cn } from '@/lib/utils'

export interface InsightRowProps extends React.HTMLAttributes<HTMLDivElement> {
  period: string
  title: string
  description: string
}

const InsightRow = React.forwardRef<HTMLDivElement, InsightRowProps>(
  ({ className, period, title, description, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex h-[69px] shrink-0 flex-col gap-[3px] self-stretch rounded-[8px] border border-[rgb(255_255_255/0.2)] bg-[rgb(255_255_255/0.1)] p-[16px]',
          className
        )}
        {...props}
      >
        <div className="flex h-[37px] items-center gap-[16px] self-stretch">
          <p className="w-[80px] shrink-0 text-right text-[14px] font-bold leading-[17px] text-[#FFFFFF]">
            {period}
          </p>
          <div className="flex min-w-0 flex-col gap-[5px] self-stretch border-l border-[#FFFFFF] px-[12px] py-0">
            <p className="text-[14px] font-bold leading-[17px] text-[#FFFFFF]">{title}</p>
            <p className="text-[12px] font-normal leading-[15px] text-[#94A3B8]">{description}</p>
          </div>
        </div>
      </div>
    )
  }
)
InsightRow.displayName = 'InsightRow'

export { InsightRow }
