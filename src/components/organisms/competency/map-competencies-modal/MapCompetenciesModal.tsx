'use client'

import { useEffect, useState } from 'react'
import { Modal } from '@/components/molecules/modal/Modal'
import { ModalFooterButton } from '@/components/molecules/modal/ModalFooterButton'
import { cn } from '@/lib/utils'
import type { Assignment, Competency, Section } from '@/types/competency'

export interface MapCompetenciesModalProps {
  open: boolean
  onClose: () => void
  gradeTitle: string
  sections: Section[]
  existingAssignments: Assignment[]
  onSubmit: (assignment: Assignment) => Promise<void>
}

export function MapCompetenciesModal({
  open,
  onClose,
  gradeTitle,
  sections,
  existingAssignments,
  onSubmit,
}: MapCompetenciesModalProps) {
  const [selectedCompId, setSelectedCompId] = useState<string | null>(null)
  const [selectedBehaviorIds, setSelectedBehaviorIds] = useState<string[]>([])
  const [submitting, setSubmitting] = useState(false)

  const allCompetencies = sections.flatMap((s) => s.competencies)
  const selectedComp: Competency | undefined = allCompetencies.find((c) => c.id === selectedCompId)

  useEffect(() => {
    if (!open) {
      setSelectedCompId(null)
      setSelectedBehaviorIds([])
    }
  }, [open])

  function toggleBehavior(id: string) {
    setSelectedBehaviorIds((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    )
  }

  async function handleSubmit() {
    if (!selectedCompId || selectedBehaviorIds.length === 0) return
    setSubmitting(true)
    try {
      await onSubmit({ compId: selectedCompId, behaviorIds: selectedBehaviorIds })
      onClose()
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Map Competencies"
      subtitle={`Assign skills to ${gradeTitle}`}
      widthClassName="max-w-[600px]"
      footer={
        <>
          <ModalFooterButton variant="secondary" onClick={onClose} className="flex-none px-8">
            Cancel
          </ModalFooterButton>
          <ModalFooterButton
            onClick={handleSubmit}
            disabled={submitting || !selectedCompId || selectedBehaviorIds.length === 0}
            className="bg-accent-600 hover:bg-accent-700"
          >
            {submitting ? 'Saving…' : 'Assign Skills'}
          </ModalFooterButton>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <div>
          <p className="mb-2 text-[var(--font-size-sm)] font-semibold text-neutral-700">
            Select Competency
          </p>
          <div className="flex flex-wrap gap-2">
            {allCompetencies.map((comp) => {
              const assigned = existingAssignments.some((a) => a.compId === comp.id)
              return (
                <button
                  key={comp.id}
                  type="button"
                  onClick={() => {
                    setSelectedCompId(comp.id)
                    const existing = existingAssignments.find((a) => a.compId === comp.id)
                    setSelectedBehaviorIds(existing?.behaviorIds ?? [])
                  }}
                  className={cn(
                    'rounded-full px-3 py-1.5 text-[var(--font-size-xs)] font-semibold transition-colors',
                    selectedCompId === comp.id
                      ? 'bg-accent-600 text-white'
                      : assigned
                        ? 'bg-accent-100 text-accent-700'
                        : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  )}
                >
                  {comp.name}
                </button>
              )
            })}
          </div>
        </div>
        {selectedComp && (
          <div>
            <p className="mb-2 text-[var(--font-size-sm)] font-semibold text-neutral-700">
              Select Behaviors
            </p>
            <div className="flex flex-col gap-2">
              {selectedComp.behaviors.map((behavior) => (
                <label
                  key={behavior.id}
                  className="flex cursor-pointer items-center gap-3 rounded-lg border border-neutral-200 px-3 py-2 hover:bg-neutral-50"
                >
                  <input
                    type="checkbox"
                    checked={selectedBehaviorIds.includes(behavior.id)}
                    onChange={() => toggleBehavior(behavior.id)}
                    className="h-4 w-4 rounded border-neutral-300 text-accent-600 focus:ring-accent-500"
                  />
                  <span className="text-[var(--font-size-sm)] text-neutral-700">{behavior.text}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  )
}
