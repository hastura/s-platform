'use client'

import { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Modal, Select } from '@/components/molecules'
import { ModalFooterButton } from '@/components/molecules/modal/ModalFooterButton'
import { Input, Spinner } from '@/components/atoms'
import { mockDepartments, COMPANY_EMAIL_DOMAIN } from '@/lib/mock'
import { MEMBER_ROLE_LABELS } from '@/types/settings'

const inviteSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters'),
  email: z
    .string()
    .trim()
    .email('Enter a valid email address')
    .refine((email) => email.toLowerCase().endsWith(`@${COMPANY_EMAIL_DOMAIN}`), {
      message: `Must be a company email (@${COMPANY_EMAIL_DOMAIN})`,
    }),
  role: z.enum(['super_admin', 'company_admin', 'manager', 'employee'], { error: 'Select a role' }),
  department: z.string().min(1, 'Select a department'),
})

export type InviteFormValues = z.infer<typeof inviteSchema>

const ROLE_OPTIONS = Object.entries(MEMBER_ROLE_LABELS).map(([value, label]) => ({ value, label }))
const DEPARTMENT_OPTIONS = mockDepartments.map((d) => ({ value: d.name, label: d.name }))

export interface InviteEmployeeModalProps {
  open: boolean
  onClose: () => void
  onSubmit: (values: InviteFormValues) => Promise<void>
  existingEmails: string[]
}

/** Invite Employee modal — Figma node 636:4513, extended with PRD role/department fields. */
export function InviteEmployeeModal({ open, onClose, onSubmit, existingEmails }: InviteEmployeeModalProps) {
  const [submitting, setSubmitting] = useState(false)
  const {
    register,
    handleSubmit,
    control,
    reset,
    setError,
    formState: { errors, isValid },
  } = useForm<InviteFormValues>({
    resolver: zodResolver(inviteSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      role: undefined as unknown as InviteFormValues['role'],
      department: '',
    },
  })

  useEffect(() => {
    if (open) {
      reset({ name: '', email: '', role: undefined as unknown as InviteFormValues['role'], department: '' })
    }
  }, [open, reset])

  async function submit(values: InviteFormValues) {
    if (existingEmails.some((e) => e.toLowerCase() === values.email.toLowerCase())) {
      setError('email', { type: 'duplicate', message: 'This email already belongs to a member or pending invite' })
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
      title="Invite Employee"
      subtitle="Fill in the details"
      widthClassName="max-w-[650px]"
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
      <form onSubmit={handleSubmit(submit)} className="flex w-full max-w-[600px] flex-col gap-[16px]" noValidate>
        <div className="flex flex-col gap-[4px]">
          <label htmlFor="invite-name" className="font-[var(--font-family-jakarta)] text-[14px] font-normal text-[var(--color-neutral-950)]">
            Name
          </label>
          <Input id="invite-name" variant="field" placeholder="e.g. Joe" {...register('name')} />
          {errors.name && (
            <span className="text-[var(--font-size-xs)] font-medium text-[var(--color-danger-600)]">{errors.name.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-[4px]">
          <label htmlFor="invite-email" className="font-[var(--font-family-jakarta)] text-[14px] font-normal text-[var(--color-neutral-950)]">
            Company Email
          </label>
          <Input id="invite-email" variant="field" type="email" placeholder={`e.g. joe@${COMPANY_EMAIL_DOMAIN}`} {...register('email')} />
          {errors.email && (
            <span className="text-[var(--font-size-xs)] font-medium text-[var(--color-danger-600)]">{errors.email.message}</span>
          )}
        </div>

        <div className="flex gap-[16px]">
          <div className="flex flex-1 flex-col gap-[4px]">
            <label className="font-[var(--font-family-jakarta)] text-[14px] font-normal text-[var(--color-neutral-950)]">
              Role
            </label>
            <Controller
              control={control}
              name="role"
              render={({ field }) => (
                <Select
                  variant="field"
                  aria-label="Role"
                  options={ROLE_OPTIONS}
                  value={field.value ?? null}
                  onValueChange={field.onChange}
                  placeholder="Select role"
                  error={!!errors.role}
                />
              )}
            />
            {errors.role && (
              <span className="text-[var(--font-size-xs)] font-medium text-[var(--color-danger-600)]">{errors.role.message}</span>
            )}
          </div>
          <div className="flex flex-1 flex-col gap-[4px]">
            <label className="font-[var(--font-family-jakarta)] text-[14px] font-normal text-[var(--color-neutral-950)]">
              Department
            </label>
            <Controller
              control={control}
              name="department"
              render={({ field }) => (
                <Select
                  variant="field"
                  aria-label="Department"
                  options={DEPARTMENT_OPTIONS}
                  value={field.value || null}
                  onValueChange={field.onChange}
                  placeholder="Select department"
                  error={!!errors.department}
                />
              )}
            />
            {errors.department && (
              <span className="text-[var(--font-size-xs)] font-medium text-[var(--color-danger-600)]">{errors.department.message}</span>
            )}
          </div>
        </div>
      </form>
    </Modal>
  )
}
