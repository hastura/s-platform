'use client'

import * as React from "react"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui'
import { FormField } from '@/components/atoms/form-field/FormField'
import type { Employee } from '@/components/molecules/employee-card/EmployeeCard'

const employeeSchema = z.object({
  id: z.string().min(1, 'Employee ID is required'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  position: z.string().min(1, 'Position is required'),
  department: z.string().optional(),
  status: z.enum(['Permanent', 'Contract', 'Probation', 'Intern']),
})

export type EmployeeFormData = z.infer<typeof employeeSchema>

export interface AddEmployeeModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: EmployeeFormData) => void
  initialData?: Employee
}

export function AddEmployeeModal({ isOpen, onClose, onSubmit, initialData }: AddEmployeeModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
    defaultValues: initialData ? {
      id: initialData.id,
      name: initialData.name,
      email: initialData.email,
      position: initialData.position,
      department: initialData.department,
      status: initialData.status,
    } : {
      id: '',
      name: '',
      email: '',
      position: '',
      department: '',
      status: 'Permanent',
    },
  })

  const handleFormSubmit = async (data: EmployeeFormData) => {
    await onSubmit(data)
    reset()
    onClose()
  }

  React.useEffect(() => {
    if (!isOpen) {
      reset()
    }
  }, [isOpen, reset])

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[var(--z-overlay)] transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={cn(
          "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] bg-white rounded-[var(--radius-2xl)] shadow-[var(--shadow-2xl)] z-[var(--z-modal)] overflow-hidden",
          "animate-in fade-in zoom-in-95 duration-200"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-[var(--space-6)] py-[var(--space-5)] border-b border-[var(--color-border)]">
          <h2 className="text-[var(--color-text-primary)] font-bold text-[20px]">
            {initialData ? 'Edit Employee' : 'Add New Employee'}
          </h2>
          <button
            onClick={onClose}
            className="w-[40px] h-[40px] rounded-full hover:bg-[var(--color-neutral-100)] flex items-center justify-center transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-[var(--space-4)] px-[var(--space-6)] py-[var(--space-5)]">
          <FormField label="Employee ID" error={errors.id?.message} required>
            <input {...register('id')} placeholder="e.g., 00021090084" />
          </FormField>

          <FormField label="Full Name" error={errors.name?.message} required>
            <input {...register('name')} placeholder="e.g., Budi Santoso" />
          </FormField>

          <FormField label="Email" error={errors.email?.message} helpText="Optional but recommended">
            <input {...register('email')} type="email" placeholder="e.g., budi@company.com" />
          </FormField>

          <FormField label="Position" error={errors.position?.message} required>
            <input {...register('position')} placeholder="e.g., Customer Service Supervisor" />
          </FormField>

          <div className="grid grid-cols-2 gap-[var(--space-4)]">
            <FormField label="Department" error={errors.department?.message}>
              <input {...register('department')} placeholder="e.g., Operations" />
            </FormField>

            <FormField label="Status" error={errors.status?.message} required>
              <select {...register('status')} className="flex h-11 w-full rounded-[var(--radius-md)] border bg-[var(--color-neutral-50)] px-[var(--space-4)] py-2 text-[14px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)] transition-all border-[var(--color-border)]">
                <option value="Permanent">Permanent</option>
                <option value="Contract">Contract</option>
                <option value="Probation">Probation</option>
                <option value="Intern">Intern</option>
              </select>
            </FormField>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-[var(--space-3)] pt-[var(--space-4)] border-t border-[var(--color-border)] mt-[var(--space-2)]">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="rounded-[var(--radius-md)]"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="rounded-[var(--radius-md)]"
            >
              {isSubmitting ? 'Saving...' : initialData ? 'Update Employee' : 'Add Employee'}
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}
