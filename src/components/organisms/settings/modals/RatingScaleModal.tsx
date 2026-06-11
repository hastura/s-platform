'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Modal, Select } from '@/components/molecules'
import { ModalFooterButton } from '@/components/molecules/modal/ModalFooterButton'
import { Input, Spinner } from '@/components/atoms'
import type { RatingScale } from '@/types/settings'

const ratingSchema = z
  .object({
    label: z.string().trim().min(2, 'Label must be at least 2 characters'),
    minScore: z
      .number({ error: 'Enter a number between 0 and 100' })
      .int('Whole numbers only')
      .min(0, 'Minimum is 0')
      .max(100, 'Maximum is 100'),
    maxScore: z
      .number({ error: 'Enter a number between 0 and 100' })
      .int('Whole numbers only')
      .min(0, 'Minimum is 0')
      .max(100, 'Maximum is 100'),
    description: z.string().trim().min(1, 'Description is required'),
    color: z.enum(['success', 'primary', 'warning', 'danger', 'neutral']),
  })
  .refine((data) => data.minScore <= data.maxScore, {
    message: 'Min score must be less than or equal to max score',
    path: ['maxScore'],
  })

export type RatingFormValues = z.infer<typeof ratingSchema>

const COLOR_OPTIONS = [
  { value: 'success', label: 'Green — top performance' },
  { value: 'primary', label: 'Blue — above expectations' },
  { value: 'neutral', label: 'Slate — meets expectations' },
  { value: 'warning', label: 'Amber — needs improvement' },
  { value: 'danger', label: 'Red — unsatisfactory' },
]

export interface RatingScaleModalProps {
  open: boolean
  onClose: () => void
  onSubmit: (values: RatingFormValues) => Promise<void>
  otherScales: RatingScale[]
  initial?: RatingScale
}

export function RatingScaleModal({ open, onClose, onSubmit, otherScales, initial }: RatingScaleModalProps) {
  const [submitting, setSubmitting] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    setError,
    formState: { errors, isValid },
  } = useForm<RatingFormValues>({
    resolver: zodResolver(ratingSchema),
    mode: 'onChange',
    defaultValues: initial
      ? {
          label: initial.label,
          minScore: initial.minScore,
          maxScore: initial.maxScore,
          description: initial.description,
          color: initial.color,
        }
      : { label: '', minScore: 0, maxScore: 100, description: '', color: 'neutral' },
  })

  useEffect(() => {
    if (open) {
      reset(
        initial
          ? {
              label: initial.label,
              minScore: initial.minScore,
              maxScore: initial.maxScore,
              description: initial.description,
              color: initial.color,
            }
          : { label: '', minScore: 0, maxScore: 100, description: '', color: 'neutral' }
      )
    }
  }, [open, initial, reset])

  const color = watch('color')

  async function submit(values: RatingFormValues) {
    const overlapping = otherScales.find(
      (s) => values.minScore <= s.maxScore && values.maxScore >= s.minScore
    )
    if (overlapping) {
      setError('minScore', {
        type: 'overlap',
        message: `Range overlaps with "${overlapping.label}" (${overlapping.minScore}–${overlapping.maxScore})`,
      })
      return
    }
    setSubmitting(true)
    try {
      await onSubmit(values)
      onClose()
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={initial ? 'Edit Rating' : 'Add Rating'}
      subtitle="Define a rating band for the final performance score"
      widthClassName="max-w-[560px]"
      footer={
        <>
          <ModalFooterButton variant="secondary" onClick={onClose} disabled={submitting}>
            Cancel
          </ModalFooterButton>
          <ModalFooterButton variant="primary" onClick={handleSubmit(submit)} disabled={!isValid || submitting}>
            {submitting ? <Spinner size={16} /> : 'Save'}
          </ModalFooterButton>
        </>
      }
    >
      <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-[var(--space-5)]" noValidate>
        <div className="flex flex-col gap-[var(--space-1)]">
          <label htmlFor="rating-label" className="text-[var(--font-size-sm)] font-semibold text-[var(--color-text-primary)]">
            Label <span className="text-[var(--color-danger-600)]">*</span>
          </label>
          <Input id="rating-label" placeholder="e.g. Exceeds Expectations" {...register('label')} />
          {errors.label && (
            <span className="text-[var(--font-size-xs)] font-medium text-[var(--color-danger-600)]">{errors.label.message}</span>
          )}
        </div>

        <div className="flex gap-[var(--space-4)]">
          <div className="flex flex-1 flex-col gap-[var(--space-1)]">
            <label htmlFor="rating-min" className="text-[var(--font-size-sm)] font-semibold text-[var(--color-text-primary)]">
              Min Score (%) <span className="text-[var(--color-danger-600)]">*</span>
            </label>
            <Input id="rating-min" type="number" min={0} max={100} {...register('minScore', { valueAsNumber: true })} />
            {errors.minScore && (
              <span className="text-[var(--font-size-xs)] font-medium text-[var(--color-danger-600)]">{errors.minScore.message}</span>
            )}
          </div>
          <div className="flex flex-1 flex-col gap-[var(--space-1)]">
            <label htmlFor="rating-max" className="text-[var(--font-size-sm)] font-semibold text-[var(--color-text-primary)]">
              Max Score (%) <span className="text-[var(--color-danger-600)]">*</span>
            </label>
            <Input id="rating-max" type="number" min={0} max={100} {...register('maxScore', { valueAsNumber: true })} />
            {errors.maxScore && (
              <span className="text-[var(--font-size-xs)] font-medium text-[var(--color-danger-600)]">{errors.maxScore.message}</span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-[var(--space-1)]">
          <label htmlFor="rating-desc" className="text-[var(--font-size-sm)] font-semibold text-[var(--color-text-primary)]">
            Description <span className="text-[var(--color-danger-600)]">*</span>
          </label>
          <Input id="rating-desc" placeholder="What this rating means" {...register('description')} />
          {errors.description && (
            <span className="text-[var(--font-size-xs)] font-medium text-[var(--color-danger-600)]">{errors.description.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-[var(--space-1)]">
          <label id="rating-color-label" className="text-[var(--font-size-sm)] font-semibold text-[var(--color-text-primary)]">
            Color
          </label>
          <Select
            aria-label="Rating color"
            options={COLOR_OPTIONS}
            value={color}
            onValueChange={(v) => setValue('color', v as RatingFormValues['color'], { shouldValidate: true })}
          />
        </div>
      </form>
    </Modal>
  )
}
