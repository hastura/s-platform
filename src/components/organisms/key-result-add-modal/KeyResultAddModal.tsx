'use client'

import * as React from 'react'
import { Modal } from '@/components/molecules/modal/Modal'
import { FormField } from '@/components/atoms/form-field/FormField'
import { Input } from '@/components/atoms/input/Input'
import { Button } from '@/components/ui/Button'

export interface KeyResultAddModalProps {
  open: boolean
  onClose: () => void
  objectiveTitle?: string
  onSubmit?: (data: {
    title: string
    weight: number
    target: number
    dueDate: string
  }) => void
}

export function KeyResultAddModal({ open, onClose, objectiveTitle, onSubmit }: KeyResultAddModalProps) {
  const [title, setTitle] = React.useState('')
  const [weight, setWeight] = React.useState('1')
  const [target, setTarget] = React.useState('100')
  const [dueDate, setDueDate] = React.useState('2026-06-30')

  React.useEffect(() => {
    if (!open) return
    setTitle('')
    setWeight('1')
    setTarget('100')
  }, [open])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return
    onSubmit?.({
      title: title.trim(),
      weight: parseFloat(weight) || 1,
      target: parseFloat(target) || 100,
      dueDate,
    })
    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add Key Result"
      subtitle={objectiveTitle ? `For: ${objectiveTitle}` : undefined}
      widthClassName="max-w-[650px]"
      footer={
        <>
          <Button type="button" variant="outline" className="flex-1 rounded-lg" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" form="kr-add-form" className="flex-1 rounded-lg">
            Save
          </Button>
        </>
      }
    >
      <form id="kr-add-form" onSubmit={handleSubmit} className="flex flex-col gap-5">
        <FormField label="Key Result Title" required>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Achieve 95% customer satisfaction score"
            required
          />
        </FormField>

        <div className="grid grid-cols-2 gap-4">
          <FormField label="Weight" required helpText="Relative importance (e.g. 1.0, 1.5)">
            <Input
              type="number"
              min="0.1"
              step="0.1"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              required
            />
          </FormField>
          <FormField label="Target Value" required>
            <Input
              type="number"
              min="1"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              required
            />
          </FormField>
        </div>

        <FormField label="Due Date" required>
          <Input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </FormField>
      </form>
    </Modal>
  )
}
