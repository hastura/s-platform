import * as React from "react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarProps } from "@/components/atoms/avatar/Avatar"
import { ProgressBar } from "@/components/atoms/progress-bar/ProgressBar"
import { Typography } from "@/components/atoms/typography/Typography"

export interface ProgressCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  progress: number
  progressColor?: string
  icon?: React.ReactNode
  iconBg?: string
  ownerInitial?: string
  ownerLabel?: string
  hasLink?: boolean
  avatarProps?: Partial<AvatarProps>
}

const ProgressCard = React.forwardRef<HTMLDivElement, ProgressCardProps>(
  ({ 
    className,
    title, 
    progress, 
    progressColor,
    icon,
    iconBg = "bg-[rgba(37,99,235,0.1)]",
    ownerInitial = "U",
    ownerLabel = "Owner",
    hasLink = false,
    avatarProps,
    ...props 
  }, ref) => {
    const barWidth = `${progress}%`
    const barColor = progressColor || (progress >= 70 ? 'bg-[var(--color-success-600)]' : progress >= 40 ? 'bg-[var(--color-warning-600)]' : 'bg-[var(--color-danger-600)]')

    return (
      <div
        ref={ref}
        className={cn(
          "w-[288px] h-[245px] bg-white border-2 border-[var(--color-border)] rounded-[32px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] cursor-pointer hover:shadow-[0px_4px_12px_0px_rgba(0,0,0,0.08)] transition-shadow relative",
          className
        )}
        {...props}
      >
        {/* Top row: icon + progress pill */}
        <div className="absolute left-[24px] top-[24px] right-[24px] flex items-center justify-between" style={{ height: '44px' }}>
          <div className={cn('w-[44px] h-[44px] rounded-[12px] flex items-center justify-center shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]', iconBg)}>
            {icon}
          </div>
          <div className="flex items-center gap-[6px]">
            {hasLink && (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
            )}
            <div className="h-[28px] px-[12px] bg-[var(--color-neutral-100)] rounded-full flex items-center">
              <span className="text-[var(--color-text-primary)] font-black text-[14px] leading-none">{progress}%</span>
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="absolute left-[24px] top-[84px] right-[24px] overflow-hidden" style={{ height: '40px' }}>
          <Typography variant="h4" className="line-clamp-2">{title}</Typography>
        </div>

        {/* Progress bar */}
        <div className="absolute left-[24px] top-[140px] right-[24px] h-[8px] bg-[var(--color-neutral-50)] rounded-full overflow-hidden shadow-[inset_0px_2px_4px_0px_rgba(0,0,0,0.05)]">
          <div className={cn('h-full rounded-full', barColor)} style={{ width: barWidth }} />
        </div>

        {/* Footer */}
        <div className="absolute left-[24px] top-[168px] right-[24px] border-t border-[var(--color-neutral-300)] flex items-center" style={{ height: '49px' }}>
          <div className="flex items-center gap-[10px] mt-[1px]">
            <Avatar 
              initial={ownerInitial} 
              size="sm" 
              {...avatarProps}
            />
            <span className="text-[var(--color-text-secondary)] font-bold text-[12px] tracking-[-0.6px] uppercase whitespace-nowrap">{ownerLabel}</span>
          </div>
        </div>
      </div>
    )
  }
)
ProgressCard.displayName = "ProgressCard"

export { ProgressCard }
