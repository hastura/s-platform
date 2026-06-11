'use client'

import { useMemo, useState } from 'react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/atoms'
import { ConfirmModal } from '@/components/molecules'
import { DataTable, type DataTableColumn } from '@/components/organisms/data-table/DataTable'
import { IconPlus, IconEdit, IconTrash, IconAlertTriangle } from '@/components/icons'
import { useSettingsStore, toast } from '@/lib/stores'
import type { RatingScale } from '@/types/settings'
import { RatingScaleModal, type RatingFormValues } from '@/components/organisms/settings/modals/RatingScaleModal'

const COLOR_BAR: Record<RatingScale['color'], string> = {
  success: 'bg-[var(--color-success-500)]',
  primary: 'bg-[var(--color-primary-500)]',
  warning: 'bg-[var(--color-warning-500)]',
  danger: 'bg-[var(--color-danger-500)]',
  neutral: 'bg-[var(--color-neutral-400)]',
}

const COLOR_BADGE: Record<RatingScale['color'], 'success' | 'primary' | 'warning' | 'danger' | 'neutral'> = {
  success: 'success',
  primary: 'primary',
  warning: 'warning',
  danger: 'danger',
  neutral: 'neutral',
}

function findGaps(scales: RatingScale[]): { from: number; to: number }[] {
  const sorted = [...scales].sort((a, b) => a.minScore - b.minScore)
  const gaps: { from: number; to: number }[] = []
  let cursor = 0
  for (const s of sorted) {
    if (s.minScore > cursor) gaps.push({ from: cursor, to: s.minScore - 1 })
    cursor = Math.max(cursor, s.maxScore + 1)
  }
  if (cursor <= 100) gaps.push({ from: cursor, to: 100 })
  return gaps
}

/** Rating scale CRUD — PRD-first, built in the established design language. */
export function RatingScalesStep() {
  const ratingScales = useSettingsStore((s) => s.ratingScales)
  const addRatingScale = useSettingsStore((s) => s.addRatingScale)
  const updateRatingScale = useSettingsStore((s) => s.updateRatingScale)
  const deleteRatingScale = useSettingsStore((s) => s.deleteRatingScale)

  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<RatingScale | null>(null)
  const [deleting, setDeleting] = useState<RatingScale | null>(null)

  const sorted = useMemo(() => [...ratingScales].sort((a, b) => b.minScore - a.minScore), [ratingScales])
  const gaps = useMemo(() => findGaps(ratingScales), [ratingScales])

  async function handleSubmit(values: RatingFormValues) {
    if (editing) {
      await updateRatingScale(editing.id, values)
      toast({ title: 'Rating updated', description: `"${values.label}" now covers ${values.minScore}–${values.maxScore}%.`, variant: 'success' })
    } else {
      await addRatingScale(values)
      toast({ title: 'Rating added', description: `"${values.label}" covers ${values.minScore}–${values.maxScore}%.`, variant: 'success' })
    }
  }

  const columns: DataTableColumn<RatingScale>[] = [
    {
      key: 'label',
      header: 'RATING',
      widthClassName: 'w-[240px]',
      render: (row) => (
        <span className="flex items-center gap-[var(--space-2)] pr-[var(--space-3)]">
          <span className={cn('h-[10px] w-[10px] shrink-0 rounded-full', COLOR_BAR[row.color])} />
          <span className="truncate text-[var(--font-size-sm)] font-semibold text-[var(--color-text-primary)]">{row.label}</span>
        </span>
      ),
    },
    {
      key: 'range',
      header: 'SCORE RANGE',
      widthClassName: 'w-[160px]',
      render: (row) => (
        <Badge variant={COLOR_BADGE[row.color]}>{row.minScore}% – {row.maxScore}%</Badge>
      ),
    },
    {
      key: 'description',
      header: 'DESCRIPTION',
      render: (row) => (
        <span className="truncate pr-[var(--space-4)] text-[var(--font-size-sm)] text-[var(--color-text-secondary)]">
          {row.description}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'ACTION',
      widthClassName: 'w-[110px]',
      render: (row) => (
        <span className="flex items-center gap-[var(--space-2)]">
          <button
            type="button"
            onClick={() => {
              setEditing(row)
              setModalOpen(true)
            }}
            aria-label={`Edit rating ${row.label}`}
            className="flex h-[28px] w-[28px] items-center justify-center rounded-[var(--radius-md)] text-[var(--color-neutral-500)] transition-colors hover:bg-[var(--color-neutral-100)] hover:text-[var(--color-primary-600)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)]"
          >
            <IconEdit size={15} />
          </button>
          <button
            type="button"
            onClick={() => setDeleting(row)}
            aria-label={`Delete rating ${row.label}`}
            className="flex h-[28px] w-[28px] items-center justify-center rounded-[var(--radius-md)] text-[var(--color-neutral-500)] transition-colors hover:bg-[var(--color-danger-50)] hover:text-[var(--color-danger-600)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)]"
          >
            <IconTrash size={15} />
          </button>
        </span>
      ),
    },
  ]

  return (
    <section
      aria-label="Rating Scales"
      className="flex w-full flex-col gap-[var(--space-6)] rounded-[var(--radius-2xl)] border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-[var(--space-6)]"
    >
      <div className="flex items-center justify-between gap-[var(--space-4)]">
        <div className="flex max-w-[460px] flex-col">
          <h2 className="text-[18px] font-bold leading-[19.8px] text-[var(--color-text-primary)]">Rating Scales</h2>
          <p className="text-[var(--font-size-xs)] font-medium leading-[18px] tracking-[var(--letter-spacing-label)] text-[var(--color-text-secondary)]">
            Map final performance scores (0–100%) to rating labels used in review summaries.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setEditing(null)
            setModalOpen(true)
          }}
          className="flex h-[35px] items-center justify-center gap-[var(--space-2)] rounded-[7px] bg-[var(--color-primary-600)] px-[var(--space-4)] py-[6px] text-[var(--font-size-sm)] text-white transition-all hover:bg-[var(--color-primary-700)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)] focus-visible:ring-offset-2"
        >
          <IconPlus size={12} />
          Add Rating
        </button>
      </div>

      <div className="flex flex-col gap-[var(--space-2)]">
        <div className="flex h-[12px] w-full overflow-hidden rounded-[var(--radius-full)] bg-[var(--color-neutral-200)]" aria-hidden="true">
          {[...ratingScales]
            .sort((a, b) => a.minScore - b.minScore)
            .map((s) => (
              <span
                key={s.id}
                className={cn('h-full', COLOR_BAR[s.color])}
                style={{ width: `${s.maxScore - s.minScore + 1}%` }}
                title={`${s.label}: ${s.minScore}–${s.maxScore}%`}
              />
            ))}
        </div>
        <div className="flex items-center justify-between text-[var(--font-size-xs)] font-medium text-[var(--color-text-tertiary)]">
          <span>0%</span>
          <span>100%</span>
        </div>
      </div>

      {gaps.length > 0 && (
        <div className="flex items-start gap-[var(--space-3)] rounded-[var(--radius-xl)] border border-[var(--color-warning-200)] bg-[var(--color-warning-50)] p-[var(--space-4)]">
          <IconAlertTriangle size={18} className="mt-[1px] shrink-0 text-[var(--color-warning-600)]" />
          <p className="text-[var(--font-size-sm)] font-medium text-[var(--color-warning-800)]">
            Coverage gap{gaps.length > 1 ? 's' : ''} detected: scores{' '}
            {gaps.map((g) => (g.from === g.to ? `${g.from}%` : `${g.from}–${g.to}%`)).join(', ')} are not mapped to
            any rating.
          </p>
        </div>
      )}

      <DataTable
        aria-label="Rating scales"
        columns={columns}
        rows={sorted}
        rowKey={(row) => row.id}
        emptyState={
          <p className="text-[var(--font-size-sm)] font-medium text-[var(--color-text-tertiary)]">
            No rating scales defined yet. Add one to map scores to labels.
          </p>
        }
      />

      <RatingScaleModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        otherScales={ratingScales.filter((s) => s.id !== editing?.id)}
        initial={editing ?? undefined}
      />

      <ConfirmModal
        open={deleting !== null}
        onClose={() => setDeleting(null)}
        onConfirm={async () => {
          if (!deleting) return
          await deleteRatingScale(deleting.id)
          toast({ title: 'Rating deleted', description: `"${deleting.label}" was removed.`, variant: 'success' })
        }}
        title="Delete rating?"
        description={
          deleting
            ? `"${deleting.label}" (${deleting.minScore}–${deleting.maxScore}%) will be removed. Scores in this range will be unmapped.`
            : ''
        }
        confirmLabel="Delete"
        destructive
      />
    </section>
  )
}
