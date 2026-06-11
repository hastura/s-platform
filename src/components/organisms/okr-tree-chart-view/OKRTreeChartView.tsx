'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import type { Objective } from '@/types/okr'
import { OKRTreeCard } from '@/components/molecules/okr-tree-card/OKRTreeCard'

const CARD_W = 288
const CARD_H = 245
const CONNECTOR = 40
const GAP = 64

export interface OKRTreeChartViewProps {
  objectives: Objective[]
  onCardClick?: (objective: Objective) => void
  onEdit?: (objective: Objective) => void
  onAlign?: (objective: Objective) => void
  onAddChild?: (objective: Objective) => void
  className?: string
}

interface TreeLayoutNode {
  objective: Objective
  x: number
  y: number
  children: TreeLayoutNode[]
}

function layoutTree(objectives: Objective[], x: number, y: number): { nodes: TreeLayoutNode[]; width: number; height: number } {
  if (objectives.length === 0) return { nodes: [], width: 0, height: 0 }

  const nodes: TreeLayoutNode[] = []
  let currentX = x
  let maxY = y

  objectives.forEach((objective) => {
    const childCount = objective.children?.length ?? 0
    let childNodes: TreeLayoutNode[] = []
    let subtreeWidth = CARD_W

    if (childCount > 0 && objective.children) {
      const childLayout = layoutTree(objective.children, currentX, y + CARD_H + CONNECTOR * 2)
      childNodes = childLayout.nodes
      subtreeWidth = Math.max(CARD_W, childLayout.width)
      maxY = Math.max(maxY, childLayout.height)
    }

    const nodeX = childCount > 0
      ? currentX + subtreeWidth / 2 - CARD_W / 2
      : currentX

    nodes.push({ objective, x: nodeX, y, children: childNodes })
    currentX += subtreeWidth + (objectives.length > 1 ? GAP : 0)
  })

  const totalWidth = currentX - x - (objectives.length > 1 ? GAP : 0)
  return { nodes, width: Math.max(totalWidth, CARD_W), height: maxY || y + CARD_H }
}

function renderConnectors(node: TreeLayoutNode): React.ReactNode[] {
  const elements: React.ReactNode[] = []
  const parentCenterX = node.x + CARD_W / 2
  const parentBottom = node.y + CARD_H

  node.children.forEach((child) => {
    const childCenterX = child.x + CARD_W / 2
    const childTop = child.y
    const midY = parentBottom + CONNECTOR

    elements.push(
      <div
        key={`v-${node.objective.id}-${child.objective.id}`}
        className="absolute w-0.5 bg-neutral-300"
        style={{ left: parentCenterX - 1, top: parentBottom, height: CONNECTOR }}
        aria-hidden="true"
      />
    )

    if (node.children.length > 1) {
      const minX = Math.min(...node.children.map((c) => c.x + CARD_W / 2))
      const maxX = Math.max(...node.children.map((c) => c.x + CARD_W / 2))
      elements.push(
        <div
          key={`h-${node.objective.id}`}
          className="absolute h-0.5 bg-neutral-300"
          style={{ left: minX, top: midY + CONNECTOR - 1, width: maxX - minX }}
          aria-hidden="true"
        />
      )
    }

    elements.push(
      <div
        key={`vc-${node.objective.id}-${child.objective.id}`}
        className="absolute w-0.5 bg-neutral-300"
        style={{ left: childCenterX - 1, top: midY + CONNECTOR, height: childTop - (midY + CONNECTOR) }}
        aria-hidden="true"
      />
    )

    elements.push(...renderConnectors(child))
  })

  return elements
}

function renderNodes(
  node: TreeLayoutNode,
  handlers: Pick<OKRTreeChartViewProps, 'onCardClick' | 'onEdit' | 'onAlign' | 'onAddChild'>
): React.ReactNode[] {
  const elements: React.ReactNode[] = [
    <div key={node.objective.id} className="absolute" style={{ left: node.x, top: node.y }}>
      <OKRTreeCard
        objective={node.objective}
        onClick={handlers.onCardClick}
        onEdit={handlers.onEdit}
        onAlign={handlers.onAlign}
        onAddChild={handlers.onAddChild}
      />
    </div>,
  ]

  node.children.forEach((child) => {
    elements.push(...renderNodes(child, handlers))
  })

  return elements
}

export function OKRTreeChartView({
  objectives,
  onCardClick,
  onEdit,
  onAlign,
  onAddChild,
  className,
}: OKRTreeChartViewProps) {
  const layout = React.useMemo(() => layoutTree(objectives, 0, 0), [objectives])
  const handlers = { onCardClick, onEdit, onAlign, onAddChild }

  if (layout.nodes.length === 0) {
    return (
      <div className={cn('flex items-center justify-center py-16 text-neutral-500', className)}>
        <p className="text-sm font-medium">No objectives to display in tree view.</p>
      </div>
    )
  }

  const padding = 50
  const treeWidth = layout.width + padding * 2
  const treeHeight = (layout.height || CARD_H) + padding * 2

  return (
    <div
      className={cn(
        'overflow-auto rounded-[48px] border-2 border-neutral-200 bg-white shadow-inner',
        className
      )}
    >
      <div
        className="relative mx-auto"
        style={{ width: treeWidth, height: treeHeight, padding }}
      >
        {layout.nodes.flatMap((node) => renderConnectors(node))}
        {layout.nodes.flatMap((node) => renderNodes(node, handlers))}
      </div>
    </div>
  )
}
