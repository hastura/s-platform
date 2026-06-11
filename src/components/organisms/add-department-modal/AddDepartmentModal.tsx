'use client'

import * as React from "react"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui'
import { FormField } from '@/components/atoms/form-field/FormField'

const departmentSchema = z.object({
  name: z.string().min(2, 'Department name must be at least 2 characters'),
  memberCount: z.number().min(0, 'Must have at least 0 members'),
  teamCount: z.number().min(0, 'Must have at least 0 teams'),
  color: z.string(),
})

export type DepartmentFormData = z.infer<typeof departmentSchema>

export interface AddDepartmentModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: DepartmentFormData) => void
}

const DEPARTMENT_COLORS = [
  '#2563eb', // blue
  '#7c3aed', // purple
  '#10b981', // green
  '#f59e0b', // amber
  '#ef4444', // red
  '#06b6d4', // cyan
]

export function AddDepartmentModal({ isOpen, onClose, onSubmit }: AddDepartmentModalProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<DepartmentFormData>({
    resolver: zodResolver(departmentSchema),
    defaultValues: {
      name: '',
      memberCount: 0,
      teamCount: 0,
      color: '#2563eb',
    },
  })

  const selectedColor = watch('color')

  const handleFormSubmit = async (data: DepartmentFormData) => {
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
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[var(--z-overlay)]"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={cn(
          "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] bg-white rounded-[var(--radius-2xl)] shadow-[var(--shadow-2xl)] z-[var(--z-modal)] overflow-hidden",
          "animate-in fade-in zoom-in-95 duration-200"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-[var(--space-6)] py-[var(--space-5)] border-b border-[var(--color-border)]">
          <h2 className="text-[var(--color-text-primary)] font-bold text-[20px]">
            Add New Department
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
          <FormField label="Department Name" error={errors.name?.message} required>
            <input {...register('name')} placeholder="e.g., Engineering" />
          </FormField>

          <div className="grid grid-cols-2 gap-[var(--space-4)]">
            <FormField label="Members" error={errors.memberCount?.message} helpText="Current member count">
              <input {...register('memberCount', { valueAsNumber: true })} type="number" min="0" />
            </FormField>

            <FormField label="Teams" error={errors.teamCount?.message} helpText="Number of teams">
              <input {...register('teamCount', { valueAsNumber: true })} type="number" min="0" />
            </FormField>
          </div>

          {/* Color Picker */}
          <div className="flex flex-col gap-[var(--space-2)]">
            <label className="text-[var(--font-size-sm)] font-semibold text-[var(--color-text-primary)]">
              Accent Color
            </label>
            <div className="flex items-center gap-[var(--space-2)]">
              {DEPARTMENT_COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setValue('color', color)}
                  className={cn(
                    "w-[32px] h-[32px] rounded-full transition-all",
                    selectedColor === color ? "ring-2 ring-offset-2 ring-[var(--color-primary-600)] scale-110" : "hover:scale-105"
                  )}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
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
              {isSubmitting ? 'Saving...' : 'Add Department'}
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}
