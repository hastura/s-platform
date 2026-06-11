import * as React from "react"
import { cn } from "@/lib/utils"
import { Avatar } from "@/components/atoms/avatar/Avatar"
import { Badge } from "@/components/atoms/badge/Badge"

export interface Employee {
  id: string
  name: string
  email?: string
  position: string
  department?: string
  status: 'Permanent' | 'Contract' | 'Probation' | 'Intern'
  avatar?: string
}

export interface EmployeeCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  employee: Employee
  onEdit?: (employee: Employee) => void
  onDelete?: (employee: Employee) => void
}

const statusVariant = (status: Employee['status']) => {
  switch (status) {
    case 'Permanent': return 'success'
    case 'Contract': return 'primary'
    case 'Probation': return 'warning'
    case 'Intern': return 'neutral'
  }
}

const EmployeeCard = React.forwardRef<HTMLDivElement, EmployeeCardProps>(
  ({ className, employee, onEdit, onDelete, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center gap-[var(--space-4)] px-[var(--space-6)] py-[var(--space-4)] border-b border-[var(--color-neutral-100)] last:border-0 hover:bg-[var(--color-neutral-50)] transition-colors group",
          className
        )}
        {...props}
      >
        {/* Employee ID */}
        <div className="w-[120px] shrink-0">
          <span className="text-[var(--color-text-tertiary)] text-[14px] font-medium font-mono">{employee.id}</span>
        </div>

        {/* Name + Avatar */}
        <div className="flex items-center gap-[var(--space-3)] flex-1 min-w-0">
          <Avatar 
            initial={employee.name.charAt(0).toUpperCase()} 
            src={employee.avatar}
            size="sm"
          />
          <div className="flex flex-col gap-0 min-w-0">
            <span className="text-[var(--color-text-primary)] text-[14px] font-semibold truncate">{employee.name}</span>
            {employee.email && (
              <span className="text-[var(--color-text-tertiary)] text-[12px] truncate">{employee.email}</span>
            )}
          </div>
        </div>

        {/* Position */}
        <div className="w-[200px] shrink-0">
          <span className="text-[var(--color-text-secondary)] text-[14px]">{employee.position}</span>
        </div>

        {/* Department */}
        {employee.department && (
          <div className="w-[140px] shrink-0">
            <Badge variant="neutral" size="sm">{employee.department}</Badge>
          </div>
        )}

        {/* Status */}
        <div className="w-[100px] shrink-0">
          <Badge variant={statusVariant(employee.status)} size="sm">{employee.status}</Badge>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-[var(--space-2)] shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit?.(employee)}
            className="w-[32px] h-[32px] rounded-[var(--radius-md)] flex items-center justify-center text-[var(--color-text-tertiary)] hover:bg-[var(--color-primary-50)] hover:text-[var(--color-primary-600)] transition-colors"
            title="Edit"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
            </svg>
          </button>
          <button
            onClick={() => onDelete?.(employee)}
            className="w-[32px] h-[32px] rounded-[var(--radius-md)] flex items-center justify-center text-[var(--color-text-tertiary)] hover:bg-[var(--color-danger-50)] hover:text-[var(--color-danger-600)] transition-colors"
            title="Delete"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
          </button>
        </div>
      </div>
    )
  }
)
EmployeeCard.displayName = "EmployeeCard"

export { EmployeeCard }
