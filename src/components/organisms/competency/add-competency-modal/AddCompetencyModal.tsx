'use client'

import { useEffect, useState } from 'react'
import { Modal } from '@/components/molecules/modal/Modal'
import { ModalFooterButton } from '@/components/molecules/modal/ModalFooterButton'
import { Input } from '@/components/atoms/input/Input'
import { IconDrag, IconMinus } from '@/components/icons'
import { cn } from '@/lib/utils'

export interface BehaviorInput {
  name: string
  description?: string
}

export interface AddCompetencyFormData {
  name: string
  description?: string
  behaviors: BehaviorInput[]
}

export interface AddCompetencyModalProps {
  open: boolean
  onClose: () => void
  sectionTitle: string
  onSubmit: (data: AddCompetencyFormData) => Promise<void>
}

interface SavedBehavior extends BehaviorInput {
  id: string
}

const fieldLabelClass =
  'font-[var(--font-family-jakarta)] text-[14px] font-normal leading-[21px] text-[var(--color-neutral-950)]'

const textareaClassName = cn(
  'flex w-full resize-y rounded-[var(--radius-md)] border border-[var(--color-neutral-300)] bg-[var(--color-surface)] p-3 text-[var(--font-size-sm)] leading-[21px] text-[var(--color-text-primary)]',
  'placeholder:text-[var(--color-text-tertiary)]',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)] focus-visible:border-[var(--color-primary-300)]',
  'disabled:cursor-not-allowed disabled:opacity-50 transition-all'
)

function nextBehaviorId() {
  return `draft-${Math.random().toString(36).slice(2, 9)}`
}

export function AddCompetencyModal({
  open,
  onClose,
  sectionTitle: _sectionTitle,
  onSubmit,
}: AddCompetencyModalProps) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [draftName, setDraftName] = useState('')
  const [draftDescription, setDraftDescription] = useState('')
  const [savedBehaviors, setSavedBehaviors] = useState<SavedBehavior[]>([])
  const [dragIndex, setDragIndex] = useState<number | null>(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!open) {
      setName('')
      setDescription('')
      setDraftName('')
      setDraftDescription('')
      setSavedBehaviors([])
      setDragIndex(null)
    }
  }, [open])

  const canAddBehavior = draftName.trim().length > 0
  const canSubmit = name.trim().length > 0 && savedBehaviors.length > 0

  function handleAddBehavior() {
    if (!canAddBehavior) return
    setSavedBehaviors((prev) => [
      ...prev,
      {
        id: nextBehaviorId(),
        name: draftName.trim(),
        description: draftDescription.trim() || undefined,
      },
    ])
    setDraftName('')
    setDraftDescription('')
  }

  function handleRemoveBehavior(id: string) {
    setSavedBehaviors((prev) => prev.filter((b) => b.id !== id))
  }

  function handleDragStart(index: number) {
    setDragIndex(index)
  }

  function handleDragOver(e: React.DragEvent, index: number) {
    e.preventDefault()
    if (dragIndex === null || dragIndex === index) return
    setSavedBehaviors((prev) => {
      const next = [...prev]
      const [moved] = next.splice(dragIndex, 1)
      next.splice(index, 0, moved)
      return next
    })
    setDragIndex(index)
  }

  function handleDragEnd() {
    setDragIndex(null)
  }

  async function handleSubmit() {
    if (!canSubmit) return
    setSubmitting(true)
    try {
      await onSubmit({
        name: name.trim(),
        description: description.trim() || undefined,
        behaviors: savedBehaviors.map(({ name: behaviorName, description: behaviorDescription }) => ({
          name: behaviorName,
          description: behaviorDescription,
        })),
      })
      onClose()
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="New Competency"
      widthClassName="max-w-[650px]"
      footer={
        <>
          <ModalFooterButton variant="secondary" onClick={onClose} disabled={submitting}>
            Cancel
          </ModalFooterButton>
          <ModalFooterButton
            variant="primary"
            onClick={handleSubmit}
            disabled={submitting || !canSubmit}
          >
            {submitting ? 'Saving…' : 'Save'}
          </ModalFooterButton>
        </>
      }
    >
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <label htmlFor="comp-name" className={fieldLabelClass}>
            Competency Name
          </label>
          <Input
            id="comp-name"
            variant="field"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Product Strategy"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="comp-description" className={fieldLabelClass}>
            Competency Description
          </label>
          <textarea
            id="comp-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Understand product goals and how metrics support business outcomes"
            rows={4}
            className={cn(textareaClassName, 'min-h-[111px]')}
          />
        </div>

        <div className="h-px w-full bg-[var(--color-border)]" />

        <div className="flex items-center justify-between">
          <span className={fieldLabelClass}>Behaviors</span>
          <span
            className="flex h-6 min-w-6 items-center justify-center rounded-full bg-[var(--color-primary-400)] px-3 text-xs leading-[18px] text-[var(--color-text-inverse)]"
            aria-label={`${savedBehaviors.length} behaviors`}
          >
            {savedBehaviors.length}
          </span>
        </div>

        <Input
          variant="field"
          value={draftName}
          onChange={(e) => setDraftName(e.target.value)}
          placeholder="New Behavior..."
          aria-label="New behavior name"
        />

        <div className="flex flex-col gap-1">
          <label htmlFor="behavior-draft-description" className={fieldLabelClass}>
            Description
          </label>
          <textarea
            id="behavior-draft-description"
            value={draftDescription}
            onChange={(e) => setDraftDescription(e.target.value)}
            placeholder="e.g. Competency in market segmentation refers to the ability to identify, analyze, and group audiences into actionable categories."
            rows={3}
            className={cn(textareaClassName, 'min-h-[87px]')}
          />
        </div>

        <button
          type="button"
          onClick={handleAddBehavior}
          disabled={!canAddBehavior}
          className="flex h-[35px] w-full items-center justify-center rounded-[7px] bg-[var(--color-primary-600)] text-[var(--font-size-sm)] leading-[21px] text-[var(--color-text-inverse)] transition-colors hover:bg-[var(--color-primary-700)] disabled:cursor-not-allowed disabled:opacity-40"
        >
          Add Behavior
        </button>

        {savedBehaviors.length > 0 && (
          <div className="flex flex-col gap-2 rounded-[var(--radius-lg)] bg-[var(--color-neutral-50)] p-3">
            {savedBehaviors.map((behavior, index) => (
              <div
                key={behavior.id}
                onDragOver={(e) => handleDragOver(e, index)}
                className={cn(
                  'flex flex-col gap-3 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] bg-[var(--color-surface)] px-2.5 py-2',
                  dragIndex === index && 'opacity-70'
                )}
              >
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragEnd={handleDragEnd}
                    aria-label={`Reorder ${behavior.name}`}
                    className="flex size-6 shrink-0 cursor-grab items-center justify-center rounded text-[var(--color-neutral-400)] active:cursor-grabbing"
                  >
                    <IconDrag size={14} />
                  </button>
                  <p className="min-w-0 flex-1 text-[var(--font-size-sm)] leading-[21px] text-[var(--color-neutral-700)]">
                    {behavior.name}
                  </p>
                  <button
                    type="button"
                    onClick={() => handleRemoveBehavior(behavior.id)}
                    aria-label={`Remove ${behavior.name}`}
                    className="flex size-6 shrink-0 items-center justify-center rounded text-[var(--color-danger-500)] transition-colors hover:bg-[var(--color-danger-50)]"
                  >
                    <IconMinus size={14} />
                  </button>
                </div>
                {behavior.description && (
                  <div className="border-t border-[var(--color-border-subtle)] p-2">
                    <p className="text-[var(--font-size-sm)] leading-[21px] text-[var(--color-neutral-700)]">
                      {behavior.description}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </Modal>
  )
}
