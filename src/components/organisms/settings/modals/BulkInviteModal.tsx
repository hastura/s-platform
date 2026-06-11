'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { Modal, SuccessModal } from '@/components/molecules'
import { ModalFooterButton } from '@/components/molecules/modal/ModalFooterButton'
import { Spinner } from '@/components/atoms'
import { IconUpload, IconAlertTriangle, IconCheckCircle } from '@/components/icons'
import { COMPANY_EMAIL_DOMAIN, mockDepartments } from '@/lib/mock'
import { MEMBER_ROLE_LABELS, type MemberRole } from '@/types/settings'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const VALID_ROLES = new Set(Object.keys(MEMBER_ROLE_LABELS))
const VALID_DEPARTMENTS = new Set(mockDepartments.map((d) => d.name))

const CSV_TEMPLATE = `email,role,department
joe@${COMPANY_EMAIL_DOMAIN},employee,Engineering
ana@${COMPANY_EMAIL_DOMAIN},manager,Marketing`

interface ParsedRow {
  line: number
  email: string
  role: MemberRole
  department: string
  error?: string
}

export interface BulkInviteModalProps {
  open: boolean
  onClose: () => void
  onSubmit: (inputs: { email: string; role: MemberRole; department: string }[]) => Promise<void>
  existingEmails: string[]
}

function parseCsv(text: string): ParsedRow[] {
  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean)
  if (lines.length === 0) return []

  const header = lines[0].toLowerCase().split(',').map((h) => h.trim())
  const emailIdx = header.indexOf('email')
  const roleIdx = header.indexOf('role')
  const deptIdx = header.indexOf('department')

  if (emailIdx === -1 || roleIdx === -1 || deptIdx === -1) {
    return [{ line: 1, email: '', role: 'employee', department: '', error: 'CSV must include email, role, and department columns' }]
  }

  const rows: ParsedRow[] = []
  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(',').map((c) => c.trim())
    const email = cols[emailIdx] ?? ''
    const roleRaw = (cols[roleIdx] ?? 'employee').toLowerCase()
    const department = cols[deptIdx] ?? ''
    rows.push({
      line: i + 1,
      email,
      role: roleRaw as MemberRole,
      department,
    })
  }
  return rows
}

function validateRows(rows: ParsedRow[], existingEmails: string[]): ParsedRow[] {
  const seen = new Set<string>()
  return rows.map((row) => {
    if (row.error) return row
    const lower = row.email.toLowerCase()
    let error: string | undefined
    if (!row.email) error = 'Email is required'
    else if (!EMAIL_REGEX.test(row.email)) error = 'Invalid email format'
    else if (!lower.endsWith(`@${COMPANY_EMAIL_DOMAIN}`)) error = `Must be @${COMPANY_EMAIL_DOMAIN}`
    else if (existingEmails.some((e) => e.toLowerCase() === lower)) error = 'Already exists'
    else if (seen.has(lower)) error = 'Duplicate in file'
    else if (!VALID_ROLES.has(row.role)) error = 'Invalid role'
    else if (!row.department) error = 'Department is required'
    else if (!VALID_DEPARTMENTS.has(row.department)) error = 'Unknown department'
    seen.add(lower)
    return { ...row, error }
  })
}

function StepBadge({ step, active }: { step: string; active?: boolean }) {
  return (
    <span
      className={cn(
        'flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full text-[12px] font-bold',
        active
          ? 'bg-[var(--color-primary-600)] text-[var(--color-text-inverse)]'
          : 'border-[1.5px] border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-tertiary)]'
      )}
    >
      {step}
    </span>
  )
}

function InstructionStep({
  step,
  title,
  description,
  action,
  active = false,
}: {
  step: string
  title: string
  description: string
  action?: React.ReactNode
  active?: boolean
}) {
  return (
    <div className="flex items-center justify-between gap-[12px] rounded-[10px] bg-[var(--color-bg-instruction)] p-[12px]">
      <div className="flex min-w-0 flex-1 items-center gap-[12px]">
        <StepBadge step={step} active={active} />
        <div className="flex min-w-0 flex-col gap-[2px]">
          <p className="text-[14px] font-semibold text-[var(--color-text-primary)]">{title}</p>
          <p className="text-[12px] font-normal text-[var(--color-text-tertiary)]">{description}</p>
        </div>
      </div>
      {action}
    </div>
  )
}

/** Bulk Invite — CSV upload flow per Figma node 641:11052. */
export function BulkInviteModal({ open, onClose, onSubmit, existingEmails }: BulkInviteModalProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [parsed, setParsed] = useState<ParsedRow[]>([])
  const [dragOver, setDragOver] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [successOpen, setSuccessOpen] = useState(false)

  const validated = useMemo(() => validateRows(parsed, existingEmails), [parsed, existingEmails])
  const validRows = validated.filter((r) => !r.error)
  const invalidRows = validated.filter((r) => r.error)
  const canSubmit = validRows.length > 0 && !submitting

  const reset = useCallback(() => {
    setFileName(null)
    setParsed([])
    setDragOver(false)
    setSubmitting(false)
    if (inputRef.current) inputRef.current.value = ''
  }, [])

  useEffect(() => {
    if (open) reset()
  }, [open, reset])

  function downloadTemplate() {
    const blob = new Blob([CSV_TEMPLATE], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'strativy-invite-template.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  async function processFile(file: File) {
    if (!file.name.toLowerCase().endsWith('.csv')) {
      setParsed([{ line: 0, email: '', role: 'employee', department: '', error: 'Please upload a .csv file' }])
      setFileName(file.name)
      return
    }
    const text = await file.text()
    setFileName(file.name)
    setParsed(parseCsv(text))
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) void processFile(file)
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files?.[0]
    if (file) void processFile(file)
  }

  async function handleSubmit() {
    if (!canSubmit) return
    setSubmitting(true)
    try {
      const inputs = validRows.map((r) => ({ email: r.email, role: r.role, department: r.department }))
      await onSubmit(inputs)
      onClose()
      setSuccessOpen(true)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        title="Bulk Invite"
        subtitle="Fill in the details"
        widthClassName="max-w-[562px]"
        footer={
          <>
            <ModalFooterButton variant="secondary" onClick={onClose} disabled={submitting}>
              Cancel
            </ModalFooterButton>
            <ModalFooterButton variant="primary" onClick={handleSubmit} disabled={!canSubmit}>
              {submitting ? <Spinner size={16} /> : 'Submit'}
            </ModalFooterButton>
          </>
        }
      >
        <div className="mx-auto flex w-full max-w-[512px] flex-col gap-[8px]">
          <InstructionStep
            step="01"
            active
            title="Download CSV Template"
            description="Get the template with all required columns pre-filled."
            action={
              <button
                type="button"
                onClick={downloadTemplate}
                className="flex h-[33px] shrink-0 items-center justify-center gap-[8px] rounded-[7px] bg-[var(--color-primary-600)] px-[16px] py-[6px] text-[14px] font-normal text-[var(--color-text-inverse)] transition-colors hover:bg-[var(--color-primary-700)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)]"
              >
                Download Template
              </button>
            }
          />
          <InstructionStep
            step="02"
            title="Fill in the Employee Data"
            description="Open the CSV and fill each row with one employee's information."
          />
          <InstructionStep
            step="03"
            title="Upload Completed CSV"
            description="Drop your filled CSV below or click to select the file."
          />

          {invalidRows.length > 0 && (
            <div className="flex items-start gap-[8px] rounded-[8px] border border-[var(--color-danger-200)] bg-[var(--color-danger-50)] px-[12px] py-[8px]">
              <IconAlertTriangle size={16} className="mt-[2px] shrink-0 text-[var(--color-danger-600)]" />
              <p className="text-[12px] font-medium text-[var(--color-danger-800)]">
                {invalidRows.length} row{invalidRows.length === 1 ? '' : 's'} with errors — only valid rows will be invited.
              </p>
            </div>
          )}

          {validRows.length > 0 && invalidRows.length === 0 && (
            <div className="flex items-start gap-[8px] rounded-[8px] border border-[var(--color-primary-200)] bg-[var(--color-primary-50)] px-[12px] py-[8px]">
              <IconCheckCircle size={16} className="mt-[2px] shrink-0 text-[var(--color-primary-600)]" />
              <p className="text-[12px] font-medium text-[var(--color-primary-800)]">
                {validRows.length} valid invite{validRows.length === 1 ? '' : 's'} ready to send.
              </p>
            </div>
          )}

          <div
            role="button"
            tabIndex={0}
            onDragOver={(e) => {
              e.preventDefault()
              setDragOver(true)
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                inputRef.current?.click()
              }
            }}
            className={cn(
              'flex h-[140px] cursor-pointer flex-col items-center justify-center gap-[8px] rounded-[10px] border-2 border-dashed p-[16px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)]',
              dragOver || fileName
                ? 'border-[var(--color-primary-400)] bg-[var(--color-primary-50)]'
                : 'border-[var(--color-border-dropzone)] bg-[var(--color-bg-dropzone)] hover:border-[var(--color-primary-400)]'
            )}
            aria-label="Upload CSV file"
          >
            <IconUpload size={40} className="text-[var(--color-text-muted)]" />
            <p className="text-[14px] text-[var(--color-text-muted)]">
              Drag & drop your CSV file here, or{' '}
              <span className="font-semibold text-[var(--color-primary-600)]">Browse Files</span>
            </p>
            <p className="text-[11px] font-normal text-[var(--color-text-tertiary)]">Supports: .CSV (max 5MB)</p>
            {fileName && (
              <p className="text-[12px] font-semibold text-[var(--color-primary-600)]">{fileName}</p>
            )}
            <input ref={inputRef} type="file" accept=".csv,text/csv" className="sr-only" onChange={handleFileChange} />
          </div>
        </div>
      </Modal>

      <SuccessModal
        open={successOpen}
        onClose={() => setSuccessOpen(false)}
        description="The employee, has been successfully invited!"
      />
    </>
  )
}
