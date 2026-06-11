'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { Modal, SuccessModal } from '@/components/molecules'
import { ModalFooterButton } from '@/components/molecules/modal/ModalFooterButton'
import { Spinner } from '@/components/atoms'
import { IconUpload, IconCheckCircle, IconAlertTriangle } from '@/components/icons'
import { CSV_TEMPLATE_HEADERS, type CsvCompetencyRow } from '@/types/competency'

const CSV_TEMPLATE = `${CSV_TEMPLATE_HEADERS}
Core Competencies,Product Strategy,Market Segmentation,Vision Setting,Competitive Analysis
Technical,SQL Proficiency,API Design Awareness,`

function parseCompetencyCsv(text: string): CsvCompetencyRow[] {
  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean)
  if (lines.length === 0) return []

  const header = lines[0].toLowerCase().split(',').map((h) => h.trim())
  const sectionIdx = header.indexOf('section')
  const compIdx = header.indexOf('competency')

  if (sectionIdx === -1 || compIdx === -1) {
    return [
      {
        line: 1,
        section: '',
        competency: '',
        behaviors: [],
        error: 'CSV must include Section and Competency columns',
      },
    ]
  }

  const behaviorStart = compIdx + 1
  const rows: CsvCompetencyRow[] = []
  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(',').map((c) => c.trim())
    rows.push({
      line: i + 1,
      section: cols[sectionIdx] ?? '',
      competency: cols[compIdx] ?? '',
      behaviors: cols.slice(behaviorStart).filter(Boolean),
    })
  }
  return rows
}

function validateRows(rows: CsvCompetencyRow[]): CsvCompetencyRow[] {
  return rows.map((row) => {
    if (row.error) return row
    let error: string | undefined
    if (!row.section) error = 'Section is required'
    else if (!row.competency) error = 'Competency is required'
    else if (row.behaviors.length === 0) error = 'At least one behavior is required'
    return { ...row, error }
  })
}

export interface CompetencyBulkImportModalProps {
  open: boolean
  onClose: () => void
  onSubmit: (rows: CsvCompetencyRow[]) => Promise<void>
}

export function CompetencyBulkImportModal({ open, onClose, onSubmit }: CompetencyBulkImportModalProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [parsed, setParsed] = useState<CsvCompetencyRow[]>([])
  const [dragOver, setDragOver] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [successOpen, setSuccessOpen] = useState(false)
  const [successCount, setSuccessCount] = useState(0)

  const validated = useMemo(() => validateRows(parsed), [parsed])
  const validRows = validated.filter((r) => !r.error)
  const hasErrors = validated.some((r) => r.error)

  useEffect(() => {
    if (!open) {
      setFileName(null)
      setParsed([])
    }
  }, [open])

  const processFile = useCallback((file: File) => {
    setFileName(file.name)
    const reader = new FileReader()
    reader.onload = (e) => {
      const text = e.target?.result as string
      setParsed(parseCompetencyCsv(text))
    }
    reader.readAsText(file)
  }, [])

  function downloadTemplate() {
    const blob = new Blob([CSV_TEMPLATE], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'competency-template.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  async function handleImport() {
    if (validRows.length === 0) return
    setSubmitting(true)
    try {
      await onSubmit(validRows)
      setSuccessCount(validRows.length)
      setSuccessOpen(true)
      onClose()
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        title="Bulk Import Competencies"
        subtitle="Upload a CSV to populate your skill library"
        widthClassName="max-w-[640px]"
        footer={
          <>
            <ModalFooterButton variant="secondary" onClick={onClose} className="flex-none px-8">
              Cancel
            </ModalFooterButton>
            <ModalFooterButton
              onClick={handleImport}
              disabled={submitting || validRows.length === 0 || hasErrors}
              className="bg-accent-600 hover:bg-accent-700"
            >
              {submitting ? <Spinner size={16} /> : `Import ${validRows.length} rows`}
            </ModalFooterButton>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <button
            type="button"
            onClick={downloadTemplate}
            className="self-start text-[var(--font-size-sm)] font-semibold text-accent-600 hover:text-accent-700"
          >
            Download CSV Template
          </button>
          <div
            onDragOver={(e) => {
              e.preventDefault()
              setDragOver(true)
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault()
              setDragOver(false)
              const file = e.dataTransfer.files[0]
              if (file) processFile(file)
            }}
            onClick={() => inputRef.current?.click()}
            className={cn(
              'flex cursor-pointer flex-col items-center gap-3 rounded-xl border-2 border-dashed px-6 py-10 transition-colors',
              dragOver ? 'border-accent-400 bg-accent-50' : 'border-neutral-200 hover:border-accent-300'
            )}
          >
            <IconUpload size={32} className="text-neutral-400" />
            <p className="text-[var(--font-size-sm)] font-semibold text-neutral-700">
              {fileName ? fileName : 'Drop CSV file or click to browse'}
            </p>
            <p className="text-[var(--font-size-xs)] text-neutral-400">
              Headers: {CSV_TEMPLATE_HEADERS}
            </p>
            <input
              ref={inputRef}
              type="file"
              accept=".csv"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) processFile(file)
              }}
            />
          </div>
          {validated.length > 0 && (
            <div className="max-h-48 overflow-y-auto rounded-lg border border-neutral-200">
              {validated.map((row) => (
                <div
                  key={row.line}
                  className={cn(
                    'flex items-center gap-2 border-b border-neutral-100 px-3 py-2 text-[var(--font-size-xs)] last:border-0',
                    row.error ? 'bg-danger-50' : 'bg-white'
                  )}
                >
                  {row.error ? (
                    <IconAlertTriangle size={14} className="shrink-0 text-danger-500" />
                  ) : (
                    <IconCheckCircle size={14} className="shrink-0 text-success-500" />
                  )}
                  <span className="flex-1">
                    {row.error ?? `${row.section} → ${row.competency} (${row.behaviors.length} behaviors)`}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </Modal>
      <SuccessModal
        open={successOpen}
        onClose={() => setSuccessOpen(false)}
        title="Import Complete"
        description={`Successfully imported ${successCount} competencies into your skill library.`}
      />
    </>
  )
}
