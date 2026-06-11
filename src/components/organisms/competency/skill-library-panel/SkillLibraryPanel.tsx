'use client'

import { useState } from 'react'
import { BehaviorRow } from '@/components/molecules/behavior-row/BehaviorRow'
import { SkillListItem } from '@/components/molecules/skill-list-item/SkillListItem'
import { SkillSectionHeader } from '@/components/molecules/skill-section-header/SkillSectionHeader'
import { IconPlus, IconUpload } from '@/components/icons'
import type { Section } from '@/types/competency'

export interface SkillLibraryPanelProps {
  sections: Section[]
  onAddSection?: () => void
  onAddCompetency?: (sectionId: string) => void
  onRemoveBehavior?: (behaviorId: string) => void
  onBulkImport?: () => void
}

export function SkillLibraryPanel({
  sections,
  onAddSection,
  onAddCompetency,
  onRemoveBehavior,
  onBulkImport,
}: SkillLibraryPanelProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(sections.map((s) => [s.id, true]))
  )

  function toggleSection(id: string) {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <aside className="flex w-[256px] shrink-0 flex-col overflow-hidden rounded-lg border border-[#E2E8EF] bg-white shadow-[0px_2px_8px_0px_rgba(0,0,0,0.06)]">
      <div className="flex h-14 shrink-0 items-center justify-between px-4">
        <span className="text-[length:var(--font-size-xs)] font-medium tracking-[var(--letter-spacing-label)] text-[var(--color-text-primary)]">
          SKILL LIBRARY
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onBulkImport}
            aria-label="Import competencies"
            className="flex size-6 items-center justify-center rounded-[3.6px] bg-white text-[var(--color-icon-default)] hover:bg-neutral-50"
          >
            <IconUpload size={16} />
          </button>
          <button
            type="button"
            onClick={onAddSection}
            aria-label="Add section"
            className="flex size-6 items-center justify-center rounded-[3.6px] bg-primary-600 text-primary-50 hover:bg-primary-700"
          >
            <IconPlus size={12} />
          </button>
        </div>
      </div>
      <div className="h-px shrink-0 bg-[#F3F4F6]" aria-hidden />
      <div className="custom-scrollbar flex-1 overflow-y-auto">
        {sections.map((section) => (
          <div key={section.id}>
            <SkillSectionHeader
              title={section.title}
              description={section.description}
              expanded={expanded[section.id] ?? true}
              onToggle={() => toggleSection(section.id)}
              onAdd={() => onAddCompetency?.(section.id)}
              onMenu={() => {}}
            />
            {expanded[section.id] &&
              section.competencies.map((comp, compIdx) => (
                <div key={comp.id}>
                  <SkillListItem
                    name={comp.name}
                    description={comp.description}
                    onMenu={() => {}}
                  />
                  {comp.behaviors.map((behavior) => (
                    <BehaviorRow
                      key={behavior.id}
                      text={behavior.text}
                      description={behavior.description}
                      onRemove={() => onRemoveBehavior?.(behavior.id)}
                    />
                  ))}
                  {compIdx < section.competencies.length - 1 ? (
                    <div className="h-px bg-[#F3F4F6]" aria-hidden />
                  ) : null}
                </div>
              ))}
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={onAddSection}
        className="flex h-16 shrink-0 items-center justify-center gap-2 border-t border-[#F3F4F6] px-4 py-5 text-[length:var(--font-size-xs)] font-medium tracking-[var(--letter-spacing-label)] text-[var(--color-text-primary)] hover:bg-neutral-50"
      >
        <span className="flex size-6 items-center justify-center rounded-[3.6px] bg-primary-600 text-primary-50">
          <IconPlus size={12} />
        </span>
        Add New Section
      </button>
    </aside>
  )
}
