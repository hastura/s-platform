'use client'

import { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { cn } from '@/lib/utils'
import { Modal, Select, DatePickerField } from '@/components/molecules'
import { ModalFooterButton } from '@/components/molecules/modal/ModalFooterButton'
import { Input, Spinner } from '@/components/atoms'
import { IconInfo } from '@/components/icons'
import {
  ASSESSMENT_SCOPE_LABELS,
  FREQUENCY_LABELS,
  type ReviewCycleSchedule,
  type ScheduleLevel,
  type Weekday,
} from '@/types/settings'

const WEEKDAYS: { value: Weekday; label: string; full: string }[] = [
  { value: 'sun', label: 'S', full: 'Sunday' },
  { value: 'mon', label: 'M', full: 'Monday' },
  { value: 'tue', label: 'T', full: 'Tuesday' },
  { value: 'wed', label: 'W', full: 'Wednesday' },
  { value: 'thu', label: 'T', full: 'Thursday' },
  { value: 'fri', label: 'F', full: 'Friday' },
  { value: 'sat', label: 'S', full: 'Saturday' },
]

const scheduleSchema = z
  .object({
    name: z.string().trim().min(3, 'Cycle name must be at least 3 characters'),
    scope: z.enum(['okr', 'competency', 'okr_competency'], { error: 'Select an assessment scope' }),
    startDate: z.string().min(1, 'Start date is required'),
    endDate: z.string().min(1, 'End date is required'),
    frequency: z.enum(['daily', 'weekly', 'biweekly', 'monthly', 'quarterly', 'semester', 'custom'], {
      error: 'Select a check-in frequency',
    }),
    customDays: z.array(z.enum(['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'])),
  })
  .refine((data) => !data.startDate || !data.endDate || data.endDate > data.startDate, {
    message: 'End date must be after the start date',
    path: ['endDate'],
  })
  .refine((data) => data.frequency !== 'custom' || data.customDays.length > 0, {
    message: 'Choose at least one delivery day',
    path: ['customDays'],
  })

export type ScheduleFormValues = z.infer<typeof scheduleSchema>

const SCOPE_OPTIONS = Object.entries(ASSESSMENT_SCOPE_LABELS).map(([value, label]) => ({ value, label }))
const FREQUENCY_OPTIONS = Object.entries(FREQUENCY_LABELS).map(([value, label]) => ({ value, label }))

export interface ScheduleModalProps {
  open: boolean
  onClose: () => void
  onSubmit: (values: ScheduleFormValues & { level: ScheduleLevel }) => Promise<void>
  level: ScheduleLevel
  initial?: ReviewCycleSchedule
}

/** Add/Edit Schedule modal — Figma node 641:11569 with the Custom Day panel (1255:890). */
export function ScheduleModal({ open, onClose, onSubmit, level, initial }: ScheduleModalProps) {
  const [submitting, setSubmitting] = useState(false)
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors, isValid, isDirty },
  } = useForm<ScheduleFormValues>({
    resolver: zodResolver(scheduleSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      scope: undefined as unknown as ScheduleFormValues['scope'],
      startDate: '',
      endDate: '',
      frequency: undefined as unknown as ScheduleFormValues['frequency'],
      customDays: [],
    },
  })

  useEffect(() => {
    if (open) {
      reset(
        initial
          ? {
              name: initial.name,
              scope: initial.scope,
              startDate: initial.startDate,
              endDate: initial.endDate,
              frequency: initial.frequency,
              customDays: initial.customDays ?? [],
            }
          : {
              name: '',
              scope: undefined as unknown as ScheduleFormValues['scope'],
              startDate: '',
              endDate: '',
              frequency: undefined as unknown as ScheduleFormValues['frequency'],
              customDays: [],
            }
      )
    }
  }, [open, initial, reset])

  const frequency = watch('frequency')

  async function submit(values: ScheduleFormValues) {
    setSubmitting(true)
    try {
      await onSubmit({ ...values, level: initial?.level ?? level })
      onClose()
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={initial ? 'Edit Schedule' : 'Add Schedule'}
      subtitle="Fill in the details"
      widthClassName="max-w-[650px]"
      footer={
        <>
          <ModalFooterButton variant="secondary" onClick={onClose} disabled={submitting}>
            Cancel
          </ModalFooterButton>
          <ModalFooterButton
            variant="primary"
            onClick={handleSubmit(submit)}
            disabled={!isValid || submitting || (!!initial && !isDirty)}
          >
            {submitting ? <Spinner size={16} /> : 'Save'}
          </ModalFooterButton>
        </>
      }
    >
      <form onSubmit={handleSubmit(submit)} className="flex w-full max-w-[600px] flex-col gap-[16px]" noValidate>
        <div className="flex flex-col gap-[4px]">
          <label htmlFor="schedule-name" className="font-[var(--font-family-jakarta)] text-[14px] font-normal text-[var(--color-neutral-950)]">
            Cycle Name
          </label>
          <Input id="schedule-name" variant="field" placeholder="e.g. 00021090084" {...register('name')} />
          {errors.name && (
            <span className="text-[var(--font-size-xs)] font-medium text-[var(--color-danger-600)]">{errors.name.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-[4px]">
          <label className="font-[var(--font-family-jakarta)] text-[14px] font-normal text-[var(--color-neutral-950)]">
            Assessment Scope
          </label>
          <Controller
            control={control}
            name="scope"
            render={({ field }) => (
              <Select
                variant="field"
                aria-label="Assessment scope"
                options={SCOPE_OPTIONS}
                value={field.value ?? null}
                onValueChange={field.onChange}
                placeholder="e.g. OKR & Competency"
                error={!!errors.scope}
              />
            )}
          />
          {errors.scope && (
            <span className="text-[var(--font-size-xs)] font-medium text-[var(--color-danger-600)]">{errors.scope.message}</span>
          )}
        </div>

        <div className="flex gap-[16px]">
          <div className="flex flex-1 flex-col gap-[4px]">
            <label className="font-[var(--font-family-jakarta)] text-[14px] font-normal text-[var(--color-neutral-950)]">
              Start Date
            </label>
            <Controller
              control={control}
              name="startDate"
              render={({ field }) => (
                <DatePickerField
                  variant="field"
                  aria-label="Start date"
                  value={field.value}
                  onValueChange={field.onChange}
                  placeholder="1 Jan 2026"
                  error={!!errors.startDate}
                />
              )}
            />
            {errors.startDate && (
              <span className="text-[var(--font-size-xs)] font-medium text-[var(--color-danger-600)]">{errors.startDate.message}</span>
            )}
          </div>
          <div className="flex flex-1 flex-col gap-[4px]">
            <label className="font-[var(--font-family-jakarta)] text-[14px] font-normal text-[var(--color-neutral-950)]">
              End Date
            </label>
            <Controller
              control={control}
              name="endDate"
              render={({ field }) => (
                <DatePickerField
                  variant="field"
                  aria-label="End date"
                  value={field.value}
                  onValueChange={field.onChange}
                  placeholder="1 Apr 2026"
                  error={!!errors.endDate}
                />
              )}
            />
            {errors.endDate && (
              <span className="text-[var(--font-size-xs)] font-medium text-[var(--color-danger-600)]">{errors.endDate.message}</span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-[4px]">
          <label className="font-[var(--font-family-jakarta)] text-[14px] font-normal text-[var(--color-neutral-950)]">
            Check-in Frequency
          </label>
          <Controller
            control={control}
            name="frequency"
            render={({ field }) => (
              <Select
                variant="field"
                aria-label="Check-in frequency"
                options={FREQUENCY_OPTIONS}
                value={field.value ?? null}
                onValueChange={field.onChange}
                placeholder="Daily"
                error={!!errors.frequency}
              />
            )}
          />
          {errors.frequency && (
            <span className="text-[var(--font-size-xs)] font-medium text-[var(--color-danger-600)]">{errors.frequency.message}</span>
          )}
        </div>

        {frequency === 'custom' && (
          <div className="flex flex-col gap-[12px] rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-bg-page)] p-[16px]">
            <p className="text-[var(--font-size-sm)] font-bold text-[var(--color-text-primary)]">Custom Day</p>
            <p className="text-[var(--font-size-xs)] font-medium text-[var(--color-text-secondary)]">
              Choose report delivery days:
            </p>
            <Controller
              control={control}
              name="customDays"
              render={({ field }) => (
                <div className="flex items-center gap-[8px]" role="group" aria-label="Report delivery days">
                  {WEEKDAYS.map((day) => {
                    const selected = field.value.includes(day.value)
                    return (
                      <button
                        key={day.value}
                        type="button"
                        aria-label={day.full}
                        aria-pressed={selected}
                        onClick={() =>
                          field.onChange(
                            selected
                              ? field.value.filter((d) => d !== day.value)
                              : [...field.value, day.value]
                          )
                        }
                        className={cn(
                          'flex h-[34px] w-[34px] items-center justify-center rounded-full text-[var(--font-size-xs)] font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)]',
                          selected
                            ? 'bg-[var(--color-primary-600)] text-white shadow-[0px_4px_6px_rgba(59,130,246,0.3)]'
                            : 'bg-[var(--color-surface-subtle)] text-[var(--color-text-tertiary)] hover:bg-[var(--color-neutral-200)]'
                        )}
                      >
                        {day.label}
                      </button>
                    )
                  })}
                </div>
              )}
            />
            {errors.customDays && (
              <span className="text-[var(--font-size-xs)] font-medium text-[var(--color-danger-600)]">{errors.customDays.message}</span>
            )}
          </div>
        )}

        <div className="flex items-center gap-[12px] rounded-[6px] border border-[var(--color-neutral-300)] bg-[var(--color-bg-page)] p-[12px]">
          <IconInfo size={24} className="shrink-0 text-[var(--color-text-primary)]" />
          <p className="text-[14px] font-normal leading-[21px] text-[var(--color-text-secondary)]">
            Your recurring check-ins (weekly, monthly, etc.) will be scheduled based on the start date you choose.
          </p>
        </div>
      </form>
    </Modal>
  )
}
