import * as React from "react"
import { cn } from "@/lib/utils"

export interface Department {
  id: string
  name: string
  memberCount: number
  teamCount: number
  icon?: React.ReactNode
  color?: string
}

export interface DepartmentCardProps extends React.HTMLAttributes<HTMLDivElement> {
  department: Department
  onEdit?: (department: Department) => void
}

const DepartmentCard = React.forwardRef<HTMLDivElement, DepartmentCardProps>(
  ({ className, department, onEdit, ...props }, ref) => {
    const accentColor = department.color || 'var(--color-primary-600)'
    
    return (
      <div
        ref={ref}
        onClick={() => onEdit?.(department)}
        className={cn(
          "p-[var(--space-5)] border border-[var(--color-border)] rounded-[var(--radius-lg)] bg-white hover:border-[var(--color-primary-300)] hover:shadow-md transition-all cursor-pointer group relative overflow-hidden",
          className
        )}
        {...props}
      >
        {/* Accent bar */}
        <div 
          className="absolute top-0 left-0 right-0 h-[3px]" 
          style={{ backgroundColor: accentColor }}
        />
        
        <div className="flex items-start justify-between mb-[var(--space-3)]">
          <div className="flex items-center gap-[var(--space-3)]">
            <div 
              className="w-[40px] h-[40px] rounded-[var(--radius-md)] flex items-center justify-center"
              style={{ backgroundColor: `${accentColor}15` }}
            >
              {department.icon || (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="8" height="8" rx="2" /><rect x="14" y="2" width="8" height="8" rx="2" />
                  <rect x="8" y="14" width="8" height="8" rx="2" />
                </svg>
              )}
            </div>
            <h3 className="text-[var(--color-text-primary)] font-bold text-[16px]">{department.name}</h3>
          </div>
          <span className="text-[10px] text-[var(--color-text-tertiary)] font-medium uppercase tracking-wider">Dept</span>
        </div>
        
        <div className="flex items-center gap-[var(--space-4)]">
          <div className="flex items-center gap-[var(--space-1)] text-[var(--color-text-secondary)] text-[14px]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <span className="font-medium">{department.memberCount} Members</span>
          </div>
          <div className="flex items-center gap-[var(--space-1)] text-[var(--color-text-tertiary)] text-[14px]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
            </svg>
            <span>{department.teamCount} Teams</span>
          </div>
        </div>
      </div>
    )
  }
)
DepartmentCard.displayName = "DepartmentCard"

export { DepartmentCard }
