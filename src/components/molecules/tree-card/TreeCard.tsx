import * as React from "react"
import { cn } from "@/lib/utils"
import { ProgressCard, ProgressCardProps } from "@/components/molecules/progress-card/ProgressCard"

export interface TreeCardProps extends Omit<ProgressCardProps, 'className'> {
  onClick?: () => void
}

const TreeCard = React.forwardRef<HTMLDivElement, TreeCardProps>(
  ({ onClick, ...props }, ref) => {
    return (
      <div
        onClick={onClick}
        className="cursor-pointer"
      >
        <ProgressCard
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)
TreeCard.displayName = "TreeCard"

export { TreeCard }
