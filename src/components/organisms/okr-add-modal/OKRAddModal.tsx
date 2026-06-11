'use client'

import * as React from 'react'
import { Modal } from '@/components/molecules/modal/Modal'
import { FormField } from '@/components/atoms/form-field/FormField'
import { Input } from '@/components/atoms/input/Input'
import { Select } from '@/components/molecules/select/Select'
import { Button } from '@/components/ui/Button'
import { OKR_LEVEL_LABEL } from '@/lib/okr-utils'
import type { OkrLevel } from '@/types/okr'
import { mockOkrOwners } from '@/lib/mock/okrs'
import { mockSchedules } from '@/lib/mock/schedules'

export interface OKRAddModalProps {
  open: boolean
  onClose: () => void
  onSubmit?: (data: {
    title: string
    level: OkrLevel
    ownerId: string
    periodId: string
    dueDate: string
  }) => void
  parentTitle?: string
}

const LEVEL_OPTIONS = (Object.keys(OKR_LEVEL_LABEL) as OkrLevel[]).map((level) => ({
  value: level,
  label: OKR_LEVEL_LABEL[level],
}))

export function OKRAddModal({ open, onClose, onSubmit, parentTitle }: OKRAddModalProps) {
  const [title, setTitle] = React.useState('')
  const [level, setLevel] = React.useState<OkrLevel>('team')
  const [ownerId, setOwnerId] = React.useState(mockOkrOwners[0]?.id ?? '')
  const [periodId, setPeriodId] = React.useState(
    mockSchedules.find((s) => s.scope !== 'competency')?.id ?? ''
  )
  const [dueDate, setDueDate] = React.useState('2026-06-30')

  React.useEffect(() => {
    if (!open) return
    setTitle('')
    setLevel('team')
  }, [open])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return
    onSubmit?.({ title: title.trim(), level, ownerId, periodId, dueDate })
    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add Objective"
      subtitle={parentTitle ? `Child of: ${parentTitle}` : 'Create a new objective for the selected period'}
      widthClassName="max-w-[650px]"
      footer={
        <>
          <Button type="button" variant="outline" className="flex-1 rounded-lg" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" form="okr-add-form" className="flex-1 rounded-lg">
            Save
          </Button>
        </>
      }
    >
      <form id="okr-add-form" onSubmit={handleSubmit} className="flex flex-col gap-5">
        <FormField label="Objective Title" required>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Increase customer retention by 20%"
            required
          />
        </FormField>

        <div className="grid grid-cols-2 gap-4">
          <FormField label="Level" required>
            <Select
              aria-label="Objective level"
              value={level}
              onValueChange={(v) => setLevel(v as OkrLevel)}
              options={LEVEL_OPTIONS}
            />
          </FormField>
          <FormField label="Owner" required>
            <Select
              aria-label="Objective owner"
              value={ownerId}
              onValueChange={setOwnerId}
              options={mockOkrOwners.map((o) => ({ value: o.id, label: o.name }))}
            />
          </FormField>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField label="Period" required>
            <Select
              aria-label="Performance period"
              value={periodId}
              onValueChange={setPeriodId}
              options={mockSchedules
                .filter((s) => s.scope !== 'competency')
                .map((s) => ({ value: s.id, label: s.name }))}
            />
          </FormField>
          <FormField label="Due Date" required>
            <Input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </FormField>
        </div>
      </form>
    </Modal>
  )
}
