'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Modal } from '@/components/molecules'
import { Button } from '@/components/ui'
import { IconUpload } from '@/components/icons'

export interface BulkOrgUploadResult {
  imported: number
  skipped: number
  errors: number
}

export interface BulkOrgUploadModalProps {
  open: boolean
  onClose: () => void
  onSuccess: (result: BulkOrgUploadResult) => void
}

/** Figma 454:3629 — CSV bulk upload for organizational structure. */
export function BulkOrgUploadModal({ open, onClose, onSuccess }: BulkOrgUploadModalProps) {
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const dropped = e.dataTransfer.files[0]
    if (dropped?.name.endsWith('.csv')) setFile(dropped)
  }

  const handleUpload = () => {
    onSuccess({ imported: 24, skipped: 0, errors: 0 })
    setFile(null)
  }

  const handleClose = () => {
    setFile(null)
    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Bulk Add Organizational Structure"
      subtitle="Fill in the details"
      widthClassName="max-w-[562px]"
      footer={
        <div className="grid w-full grid-cols-2 gap-[var(--space-3)]">
          <Button variant="outline" onClick={handleClose} className="h-[42px] w-full">
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpload} disabled={!file} className="h-[42px] w-full">
            Upload &amp; Import
          </Button>
        </div>
      }
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-between border-b border-[var(--color-border)] py-[var(--space-4)]">
          <div className="flex items-start gap-[var(--space-3)]">
            <span className="mt-[2px] flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full bg-[var(--color-primary-600)] text-[11px] font-bold text-white">
              01
            </span>
            <div>
              <p className="text-[var(--font-size-sm)] font-semibold text-[var(--color-text-primary)]">Download CSV Template</p>
              <p className="text-[var(--font-size-xs)] text-[var(--color-text-tertiary)]">
                Get the template with all required columns pre-filled.
              </p>
            </div>
          </div>
          <Button variant="primary" className="shrink-0 text-[var(--font-size-sm)]">
            Download Template
          </Button>
        </div>

        <div className="flex items-start gap-[var(--space-3)] border-b border-[var(--color-border)] py-[var(--space-4)]">
          <span className="mt-[2px] flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full border border-[var(--color-border)] text-[11px] font-bold text-[var(--color-text-tertiary)]">
            02
          </span>
          <div>
            <p className="text-[var(--font-size-sm)] font-semibold text-[var(--color-text-primary)]">Fill in the Org Data</p>
            <p className="text-[var(--font-size-xs)] text-[var(--color-text-tertiary)]">
              Open the CSV and fill each row with one org unit&apos;s information.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-[var(--space-3)] pt-[var(--space-4)]">
          <span className="mt-[2px] flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full border border-[var(--color-border)] text-[11px] font-bold text-[var(--color-text-tertiary)]">
            03
          </span>
          <div className="w-full">
            <p className="text-[var(--font-size-sm)] font-semibold text-[var(--color-text-primary)]">Upload Completed CSV</p>
            <p className="mb-[var(--space-3)] text-[var(--font-size-xs)] text-[var(--color-text-tertiary)]">
              Drop your filled CSV below or click to select the file.
            </p>

            <label
              htmlFor="org-csv-upload"
              onDragOver={(e) => {
                e.preventDefault()
                setIsDragging(true)
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={cn(
                'flex h-[140px] w-full cursor-pointer flex-col items-center justify-center gap-[var(--space-2)] rounded-[var(--radius-lg)] border-2 border-dashed transition-colors',
                isDragging
                  ? 'border-[var(--color-primary-400)] bg-[var(--color-primary-50)]'
                  : file
                    ? 'border-[var(--color-success-400)] bg-[var(--color-success-50)]'
                    : 'border-[var(--color-border)] bg-[var(--color-bg-page)] hover:border-[var(--color-primary-300)]'
              )}
            >
              {file ? (
                <>
                  <IconUpload size={24} className="text-[var(--color-success-600)]" />
                  <p className="text-[var(--font-size-sm)] font-medium text-[var(--color-success-600)]">{file.name}</p>
                  <p className="text-[11px] text-[var(--color-text-tertiary)]">Click to change file</p>
                </>
              ) : (
                <>
                  <IconUpload size={24} className="text-[var(--color-text-tertiary)]" />
                  <p className="text-[var(--font-size-sm)] text-[var(--color-text-secondary)]">
                    Drag &amp; drop your CSV file here, or{' '}
                    <span className="font-semibold text-[var(--color-primary-600)]">Browse Files</span>
                  </p>
                  <p className="text-[11px] text-[var(--color-text-tertiary)]">Supports: CSV (max 5MB)</p>
                </>
              )}
              <input
                id="org-csv-upload"
                type="file"
                accept=".csv"
                className="sr-only"
                onChange={(e) => {
                  const selected = e.target.files?.[0]
                  if (selected) setFile(selected)
                }}
              />
            </label>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export interface BulkOrgUploadSuccessModalProps {
  open: boolean
  result: BulkOrgUploadResult
  onClose: () => void
}

export function BulkOrgUploadSuccessModal({ open, result, onClose }: BulkOrgUploadSuccessModalProps) {
  return (
    <Modal open={open} onClose={onClose} title="Structure Imported Successfully!" hideHeader widthClassName="max-w-[460px]">
      <div className="flex flex-col items-center py-[var(--space-4)] text-center">
        <span className="mb-[var(--space-6)] flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[var(--color-success-50)] text-[var(--color-success-500)]">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 16 13 23 26 10" />
          </svg>
        </span>

        <div className="mb-[var(--space-5)] flex w-full gap-[var(--space-4)]">
          {[
            { count: result.imported, label: 'Imported' },
            { count: result.skipped, label: 'Skipped' },
            { count: result.errors, label: 'Errors' },
          ].map(({ count, label }) => (
            <div
              key={label}
              className="flex flex-1 flex-col items-center rounded-[var(--radius-lg)] border border-[var(--color-border)] py-[var(--space-3)]"
            >
              <span className="text-[22px] font-bold text-[var(--color-primary-600)]">{count}</span>
              <span className="text-[var(--font-size-xs)] text-[var(--color-text-tertiary)]">{label}</span>
            </div>
          ))}
        </div>

        <p className="mb-[var(--space-6)] text-[var(--font-size-sm)] text-[var(--color-text-tertiary)]">
          All org units have been added to your organization.
        </p>

        <Button variant="primary" onClick={onClose} className="min-w-[120px]">
          Done
        </Button>
      </div>
    </Modal>
  )
}
