'use client'

import { useMemo, useState } from 'react'
import { Badge } from '@/components/atoms'
import { ChipTabs, ConfirmModal, KebabMenu, formatDisplayDate } from '@/components/molecules'
import { DataTable, type DataTableColumn } from '@/components/organisms/data-table/DataTable'
import { IconPlus, IconEdit, IconArchive } from '@/components/icons'
import { useSettingsStore, toast } from '@/lib/stores'
import { getScheduleStatus } from '@/lib/mock'
import {
  ASSESSMENT_SCOPE_LABELS,
  FREQUENCY_LABELS,
  type ReviewCycleSchedule,
  type ScheduleLevel,
  type ScheduleStatus,
} from '@/types/settings'
import { ScheduleModal, type ScheduleFormValues } from '@/components/organisms/settings/modals/ScheduleModal'

const SCOPE_TABS = [
  { value: 'all', label: 'All' },
  { value: 'okr', label: 'OKR' },
  { value: 'competency', label: 'Competency' },
]

const LEVEL_TABS = [
  { value: 'department', label: 'Dept' },
  { value: 'team', label: 'Team' },
  { value: 'employee', label: 'Employee' },
]

const STATUS_BADGE: Record<ScheduleStatus, { label: string; variant: 'success' | 'primary' | 'neutral' }> = {
  active: { label: 'Active', variant: 'success' },
  upcoming: { label: 'Upcoming', variant: 'primary' },
  completed: { label: 'Completed', variant: 'neutral' },
}

const DAY_SHORT: Record<string, string> = {
  sun: 'Sun', mon: 'Mon', tue: 'Tue', wed: 'Wed', thu: 'Thu', fri: 'Fri', sat: 'Sat',
}

/** Schedule & Reminders — Figma node 621:645. */
export function ScheduleRemindersStep() {
  const schedules = useSettingsStore((s) => s.schedules)
  const addSchedule = useSettingsStore((s) => s.addSchedule)
  const updateSchedule = useSettingsStore((s) => s.updateSchedule)
  const archiveSchedule = useSettingsStore((s) => s.archiveSchedule)

  const [scopeTab, setScopeTab] = useState('all')
  const [levelTab, setLevelTab] = useState<ScheduleLevel>('department')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<ReviewCycleSchedule | null>(null)
  const [archiving, setArchiving] = useState<ReviewCycleSchedule | null>(null)

  const filtered = useMemo(
    () =>
      schedules.filter((s) => {
        if (s.archived || s.level !== levelTab) return false
        if (scopeTab === 'all') return true
        if (scopeTab === 'okr') return s.scope === 'okr' || s.scope === 'okr_competency'
        return s.scope === 'competency' || s.scope === 'okr_competency'
      }),
    [schedules, scopeTab, levelTab]
  )

  async function handleSubmit(values: ScheduleFormValues & { level: ScheduleLevel }) {
    const { customDays, ...rest } = values
    const payload = {
      ...rest,
      customDays: values.frequency === 'custom' ? customDays : undefined,
    }
    if (editing) {
      await updateSchedule(editing.id, payload)
      toast({ title: 'Schedule updated', description: `"${values.name}" has been saved.`, variant: 'success' })
    } else {
      await addSchedule(payload)
      toast({ title: 'Schedule added', description: `"${values.name}" is now on the calendar.`, variant: 'success' })
    }
  }

  const columns: DataTableColumn<ReviewCycleSchedule>[] = [
    {
      key: 'name',
      header: 'Cycle Name',
      render: (row) => {
        const status = STATUS_BADGE[getScheduleStatus(row)]
        return (
          <span className="flex min-w-0 items-center gap-[var(--space-2)] pr-[var(--space-3)]">
            <span className="truncate text-[var(--font-size-xs)] font-medium text-[var(--color-text-primary)]">
              {row.name}
            </span>
            <Badge variant={status.variant} size="sm">{status.label}</Badge>
          </span>
        )
      },
    },
    {
      key: 'scope',
      header: 'Assessment Scope',
      widthClassName: 'w-[200px]',
      render: (row) => (
        <span className="text-[var(--font-size-xs)] font-medium text-[var(--color-text-secondary)]">
          {ASSESSMENT_SCOPE_LABELS[row.scope]}
        </span>
      ),
    },
    {
      key: 'frequency',
      header: 'Check-in Frequency',
      widthClassName: 'w-[200px]',
      render: (row) => (
        <span className="text-[var(--font-size-xs)] font-medium text-[var(--color-text-secondary)]">
          {FREQUENCY_LABELS[row.frequency]}
          {row.frequency === 'custom' && row.customDays && row.customDays.length > 0 && (
            <span className="text-[var(--color-text-tertiary)]"> ({row.customDays.map((d) => DAY_SHORT[d]).join(', ')})</span>
          )}
        </span>
      ),
    },
    {
      key: 'start',
      header: 'Start Date',
      widthClassName: 'w-[140px]',
      render: (row) => (
        <span className="text-[var(--font-size-xs)] font-medium text-[var(--color-text-secondary)]">
          {formatDisplayDate(row.startDate)}
        </span>
      ),
    },
    {
      key: 'end',
      header: 'End Date',
      widthClassName: 'w-[140px]',
      render: (row) => (
        <span className="text-[var(--font-size-xs)] font-medium text-[var(--color-text-secondary)]">
          {formatDisplayDate(row.endDate)}
        </span>
      ),
    },
    {
      key: 'actions',
      header: <span className="sr-only">Actions</span>,
      widthClassName: 'w-[44px]',
      align: 'right',
      render: (row) => (
        <KebabMenu
          aria-label={`Actions for ${row.name}`}
          items={[
            {
              label: 'Edit',
              icon: <IconEdit size={14} />,
              onSelect: () => {
                setEditing(row)
                setModalOpen(true)
              },
            },
            {
              label: 'Archive',
              icon: <IconArchive size={14} />,
              destructive: true,
              onSelect: () => setArchiving(row),
            },
          ]}
        />
      ),
    },
  ]

  return (
    <>
      <ChipTabs
        aria-label="Schedule level"
        items={LEVEL_TABS}
        value={levelTab}
        onValueChange={(v) => setLevelTab(v as ScheduleLevel)}
      />

      <section
        aria-label="Schedule & Reminders"
        className="flex w-full flex-col gap-[var(--space-6)] rounded-[var(--radius-2xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-[var(--space-6)]"
      >
        <div className="flex min-h-[38px] items-center justify-between gap-[var(--space-4)]">
          <div className="flex max-w-[415px] flex-col gap-[var(--space-1)]">
            <h2 className="text-[18px] font-bold leading-[20px] text-[var(--color-text-primary)]">
              Schedule & Reminders
            </h2>
            <p className="text-[var(--font-size-xs)] font-medium leading-[18px] tracking-[var(--letter-spacing-label)] text-[var(--color-text-secondary)]">
              Manage check-in frequencies and performance review timelines.
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-[var(--space-3)]">
            <ChipTabs
              aria-label="Assessment scope"
              variant="filter"
              items={SCOPE_TABS}
              value={scopeTab}
              onValueChange={setScopeTab}
            />
            <button
              type="button"
              onClick={() => {
                setEditing(null)
                setModalOpen(true)
              }}
              className="flex h-[35px] w-[145px] shrink-0 items-center justify-center gap-[var(--space-2)] rounded-[7px] bg-[var(--color-primary-600)] px-[var(--space-4)] py-[6px] text-[var(--font-size-sm)] font-normal text-[var(--color-text-inverse)] transition-all hover:bg-[var(--color-primary-700)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)] focus-visible:ring-offset-2"
            >
              <IconPlus size={12} />
              Add Schedule
            </button>
          </div>
        </div>

        <DataTable
          aria-label="Review schedules"
          variant="plain"
          columns={columns}
          rows={filtered}
          rowKey={(row) => row.id}
          className="min-h-[346px] rounded-[10px] border border-[var(--color-neutral-200)]"
          emptyState={
            <div className="flex flex-col items-center gap-[var(--space-2)] text-center">
              <p className="text-[var(--font-size-sm)] font-semibold text-[var(--color-text-secondary)]">
                No {scopeTab === 'all' ? '' : scopeTab === 'okr' ? 'OKR ' : 'Competency '}schedules for this level yet
              </p>
              <p className="text-[var(--font-size-xs)] font-medium text-[var(--color-text-tertiary)]">
                Use “Add Schedule” to create the first review cycle.
              </p>
            </div>
          }
        />
      </section>

      <ScheduleModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        level={levelTab}
        initial={editing ?? undefined}
      />

      <ConfirmModal
        open={archiving !== null}
        onClose={() => setArchiving(null)}
        onConfirm={async () => {
          if (!archiving) return
          await archiveSchedule(archiving.id)
          toast({ title: 'Schedule archived', description: `"${archiving.name}" was archived.`, variant: 'success' })
        }}
        title="Archive schedule?"
        description={
          archiving
            ? `"${archiving.name}" will be hidden from the schedule list. Reminders for it will stop.`
            : ''
        }
        confirmLabel="Archive"
        destructive
      />
    </>
  )
}
