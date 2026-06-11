'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { flattenObjectiveTree } from '@/lib/okr-utils'
import type { Objective } from '@/types/okr'
import { OKRCascadeRow } from '@/components/molecules/okr-cascade-row/OKRCascadeRow'

export interface OKRCascadeListViewProps {
  objectives: Objective[]
  onObjectiveClick?: (objective: Objective) => void
  onEdit?: (objective: Objective) => void
  onAlign?: (objective: Objective) => void
  onAddChild?: (objective: Objective) => void
  className?: string
}

function collectExpandableIds(objectives: Objective[]): Set<string> {
  const ids = new Set<string>()
  function walk(nodes: Objective[]) {
    for (const node of nodes) {
      if (node.children?.length) {
        ids.add(node.id)
        walk(node.children)
      }
    }
  }
  walk(objectives)
  return ids
}

export function OKRCascadeListView({
  objectives,
  onObjectiveClick,
  onEdit,
  onAlign,
  onAddChild,
  className,
}: OKRCascadeListViewProps) {
  const [expanded, setExpanded] = React.useState<Set<string>>(() => collectExpandableIds(objectives))

  React.useEffect(() => {
    setExpanded(collectExpandableIds(objectives))
  }, [objectives])

  function toggleExpanded(id: string) {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function filterVisible(objectives: Objective[], depth = 0, parentChain: boolean[] = []): React.ReactNode[] {
    const nodes: React.ReactNode[] = []

    objectives.forEach((objective, index) => {
      const isLast = index === objectives.length - 1
      const hasChildren = Boolean(objective.children?.length)
      const isExpanded = expanded.has(objective.id)

      nodes.push(
        <OKRCascadeRow
          key={objective.id}
          objective={objective}
          depth={depth}
          hasChildren={hasChildren}
          isExpanded={isExpanded}
          isLast={isLast}
          onToggle={() => toggleExpanded(objective.id)}
          onClick={onObjectiveClick}
          onEdit={onEdit}
          onAlign={onAlign}
          onAddChild={onAddChild}
        />
      )

      if (hasChildren && isExpanded && objective.children) {
        nodes.push(...filterVisible(objective.children, depth + 1, [...parentChain, !isLast]))
      }
    })

    return nodes
  }

  const flatCount = flattenObjectiveTree(objectives).length

  if (flatCount === 0) {
    return (
      <div className={cn('flex flex-col items-center justify-center py-16 text-neutral-500', className)}>
        <p className="text-sm font-medium">No objectives match your filters.</p>
      </div>
    )
  }

  return (
    <div className={cn('flex flex-col', className)}>
      {filterVisible(objectives)}
    </div>
  )
}
