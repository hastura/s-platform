'use client'

import { useState } from 'react'
import { OKRDetailSidebar } from '@/components/okr/OKRDetailSidebar'
import { cn } from '@/lib/utils'

type ViewMode = 'list' | 'tree'
type OKRLevel = 'Company' | 'Department' | 'Team'

interface OKRItem {
  id: string
  level: OKRLevel
  owner: string
  ownerIcon: React.ReactNode
  title: string
  progress: number
  tags?: { label: string; icon?: React.ReactNode }[]
  indent?: boolean
}

const MOCK_OBJECTIVE = {
  title: 'Achieve Market Leadership in SEA',
  level: 'Company',
  progress: 45,
  keyResults: [
    { id: 'kr-1', title: 'Revenue Growth 40% YoY', progress: 40, target: 100, current: 40, weight: 1.5 },
    { id: 'kr-2', title: '1M Active User Base', progress: 52, target: 100, current: 52, weight: 1 },
    { id: 'kr-3', title: 'NPS Score of 70+', progress: 85, target: 100, current: 85, weight: 0.5 },
  ],
}

const OKR_LIST: OKRItem[] = [
  {
    id: '1',
    level: 'Company',
    owner: 'Management',
    ownerIcon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    title: 'Achieve Market Leadership in SEA',
    progress: 45,
    tags: [],
  },
  {
    id: '2',
    level: 'Department',
    owner: 'Dept Head',
    ownerIcon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="6" height="14" rx="1" /><rect x="9" y="2" width="6" height="19" rx="1" /><rect x="16" y="10" width="6" height="11" rx="1" />
      </svg>
    ),
    title: 'Optimize Product Conversion Rate',
    progress: 30,
    indent: true,
  },
  {
    id: '3',
    level: 'Team',
    owner: 'Manager',
    ownerIcon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 7h-9" /><path d="M14 17H5" /><circle cx="17" cy="17" r="3" /><circle cx="7" cy="7" r="3" />
      </svg>
    ),
    title: 'Content & Messaging Team',
    progress: 50,
    indent: true,
  },
  {
    id: '4',
    level: 'Team',
    owner: 'Lead',
    ownerIcon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m15 18-6-6 6-6" /><path d="M9 18l-6-6 6-6" />
      </svg>
    ),
    title: 'Streamline UX Checkout (Jira Integration)',
    progress: 75,
    tags: [{ label: 'JIRA' }],
    indent: true,
  },
]

const levelIcon = (level: OKRLevel) => {
  if (level === 'Company') return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  )
  if (level === 'Department') return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
      <path d="m6.08 9.5-3.5 1.6a1 1 0 0 0 0 1.81l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9a1 1 0 0 0 0-1.83l-3.5-1.59" />
      <path d="m6.08 14.5-3.5 1.6a1 1 0 0 0 0 1.81l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9a1 1 0 0 0 0-1.83l-3.5-1.59" />
    </svg>
  )
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

const levelIconBg = (level: OKRLevel) => {
  if (level === 'Company') return 'bg-[#fffbeb]'
  if (level === 'Department') return 'bg-[#f5f3ff]'
  return 'bg-[#eff6ff]'
}

const progressColor = (progress: number) => {
  if (progress >= 70) return 'bg-[#10b981]'
  if (progress >= 40) return 'bg-[#f59e0b]'
  return 'bg-[#ef4444]'
}

// ── Tree View Node Card ────────────────────────────────────────────────────────
interface TreeCardProps {
  title: string
  progress: number
  progressColor: string
  iconBg: string
  icon: React.ReactNode
  ownerInitial: string
  ownerLabel: string
  hasLink?: boolean
  onClick: () => void
}

function TreeCard({ title, progress, progressColor: barColor, iconBg, icon, ownerInitial, ownerLabel, hasLink, onClick }: TreeCardProps) {
  const barWidth = `${progress}%`
  return (
    <div
      onClick={onClick}
      className="w-[288px] h-[245px] bg-white border-2 border-[#e2e8f0] rounded-[32px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] cursor-pointer hover:shadow-[0px_4px_12px_0px_rgba(0,0,0,0.08)] transition-shadow relative"
    >
      {/* Top row: icon + progress pill */}
      <div className="absolute left-[24px] top-[24px] right-[24px] flex items-center justify-between" style={{ height: '44px' }}>
        <div className={cn('w-[44px] h-[44px] rounded-[12px] flex items-center justify-center shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]', iconBg)}>
          {icon}
        </div>
        <div className="flex items-center gap-[6px]">
          {hasLink && (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
          )}
          <div className="h-[28px] px-[12px] bg-[#f1f5f9] rounded-full flex items-center">
            <span className="text-[#0f172a] font-black text-[14px] leading-none">{progress}%</span>
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="absolute left-[24px] top-[84px] right-[24px] overflow-hidden" style={{ height: '40px' }}>
        <p className="text-[#0f172a] font-bold text-[14px] leading-[17.5px] line-clamp-2">{title}</p>
      </div>

      {/* Progress bar */}
      <div className="absolute left-[24px] top-[140px] right-[24px] h-[8px] bg-[#f8fafc] rounded-full overflow-hidden shadow-[inset_0px_2px_4px_0px_rgba(0,0,0,0.05)]">
        <div className={cn('h-full rounded-full', barColor)} style={{ width: barWidth }} />
      </div>

      {/* Footer */}
      <div className="absolute left-[24px] top-[168px] right-[24px] border-t border-[#cbd5e1] flex items-center" style={{ height: '49px' }}>
        <div className="flex items-center gap-[10px] mt-[1px]">
          <div className="w-[32px] h-[32px] bg-[#2563eb] rounded-[12px] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)] flex items-center justify-center shrink-0">
            <span className="text-white font-black text-[14px] leading-none">{ownerInitial}</span>
          </div>
          <span className="text-[#334155] font-bold text-[12px] tracking-[-0.6px] uppercase whitespace-nowrap">{ownerLabel}</span>
        </div>
      </div>
    </div>
  )
}

// ── OKR Tree View ──────────────────────────────────────────────────────────────
interface TreeViewProps {
  onCardClick: (title: string, progress: number) => void
}

function OKRTreeView({ onCardClick }: TreeViewProps) {
  const CARD_W = 288
  const CARD_H = 245
  const CONNECTOR = 40
  const GAP = 64
  const TREE_W = CARD_W * 2 + GAP // 640
  const CENTER_X = TREE_W / 2 // 320

  // Vertical positions
  const rootTop = 0
  const midTop = rootTop + CARD_H + CONNECTOR
  const leafTop = midTop + CARD_H + CONNECTOR + CONNECTOR
  const leftX = 0
  const rightX = CARD_W + GAP // 352
  const leftCenterX = leftX + CARD_W / 2 // 144
  const rightCenterX = rightX + CARD_W / 2 // 496
  const branchY = midTop + CARD_H + CONNECTOR // y of horizontal bar

  const treeH = leafTop + CARD_H

  return (
    <div
      className="border-2 border-[#e2e8f0] rounded-[48px] bg-white overflow-hidden shadow-[inset_0px_2px_4px_0px_rgba(0,0,0,0.05)]"
      style={{ paddingTop: '50px', paddingLeft: '26px', paddingRight: '26px', paddingBottom: '50px' }}
    >
      <div className="flex justify-center">
        <div className="relative" style={{ width: `${TREE_W}px`, height: `${treeH}px` }}>

          {/* ── Root card ── */}
          <div className="absolute" style={{ left: `${CENTER_X - CARD_W / 2}px`, top: `${rootTop}px` }}>
            <TreeCard
              title="Achieve Market Leadership in SEA"
              progress={45}
              progressColor="bg-[#4f46e5]"
              iconBg="bg-[rgba(79,70,229,0.1)]"
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                  <path d="M4 22h16" />
                  <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                  <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                  <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                </svg>
              }
              ownerInitial="C"
              ownerLabel="CEO Office"
              onClick={() => onCardClick('Achieve Market Leadership in SEA', 45)}
            />
          </div>

          {/* Connector: root → mid */}
          <div className="absolute bg-[#cbd5e1]" style={{ left: `${CENTER_X - 1}px`, top: `${CARD_H}px`, width: '2px', height: `${CONNECTOR}px` }} />

          {/* ── Middle card ── */}
          <div className="absolute" style={{ left: `${CENTER_X - CARD_W / 2}px`, top: `${midTop}px` }}>
            <TreeCard
              title="Optimize Product Conversion Rate"
              progress={30}
              progressColor="bg-[#3b82f6]"
              iconBg="bg-[rgba(59,130,246,0.1)]"
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
                  <path d="m6.08 9.5-3.5 1.6a1 1 0 0 0 0 1.81l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9a1 1 0 0 0 0-1.83l-3.5-1.59" />
                  <path d="m6.08 14.5-3.5 1.6a1 1 0 0 0 0 1.81l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9a1 1 0 0 0 0-1.83l-3.5-1.59" />
                </svg>
              }
              ownerInitial="P"
              ownerLabel="Product Department"
              onClick={() => onCardClick('Optimize Product Conversion Rate', 30)}
            />
          </div>

          {/* Connector: mid → branch */}
          <div className="absolute bg-[#cbd5e1]" style={{ left: `${CENTER_X - 1}px`, top: `${midTop + CARD_H}px`, width: '2px', height: `${CONNECTOR}px` }} />

          {/* Horizontal bar */}
          <div className="absolute bg-[#cbd5e1]" style={{ left: `${leftCenterX}px`, top: `${branchY - 1}px`, width: `${rightCenterX - leftCenterX}px`, height: '2px' }} />

          {/* Vertical down to left leaf */}
          <div className="absolute bg-[#cbd5e1]" style={{ left: `${leftCenterX - 1}px`, top: `${branchY}px`, width: '2px', height: `${CONNECTOR}px` }} />

          {/* Vertical down to right leaf */}
          <div className="absolute bg-[#cbd5e1]" style={{ left: `${rightCenterX - 1}px`, top: `${branchY}px`, width: '2px', height: `${CONNECTOR}px` }} />

          {/* ── Left leaf card ── */}
          <div className="absolute" style={{ left: `${leftX}px`, top: `${leafTop}px` }}>
            <TreeCard
              title="Streamline UX Checkout (Jira Integration)"
              progress={75}
              progressColor="bg-[#10b981]"
              iconBg="bg-[rgba(16,185,129,0.1)]"
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              }
              ownerInitial="U"
              ownerLabel="UX Team Alpha"
              hasLink
              onClick={() => onCardClick('Streamline UX Checkout (Jira Integration)', 75)}
            />
          </div>

          {/* ── Right leaf card ── */}
          <div className="absolute" style={{ left: `${rightX}px`, top: `${leafTop}px` }}>
            <TreeCard
              title="Content &amp; Messaging Team"
              progress={50}
              progressColor="bg-[#10b981]"
              iconBg="bg-[rgba(16,185,129,0.1)]"
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              }
              ownerInitial="C"
              ownerLabel="Content Strategy"
              onClick={() => onCardClick('Content & Messaging Team', 50)}
            />
          </div>

        </div>
      </div>
    </div>
  )
}

// ── Main Page ──────────────────────────────────────────────────────────────────
export default function OKRPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('tree')
  const [selectedOkr, setSelectedOkr] = useState<typeof MOCK_OBJECTIVE | null>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const handleOpen = (title: string, progress: number) => {
    setSelectedOkr({ ...MOCK_OBJECTIVE, title, progress })
    setIsSidebarOpen(true)
  }

  return (
    <div className="flex flex-col gap-[48px] w-full">
      {/* ── Header ── */}
      <div className="flex items-center justify-between" style={{ height: '62px' }}>
        {/* Title block */}
        <div className="flex items-center gap-[14px]">
          <div className="flex items-center justify-center" style={{ width: '58.85px', height: '58.85px' }}>
            <div style={{ transform: 'rotate(3deg)' }}>
              <div
                className="w-[56px] h-[56px] bg-[#2563eb] rounded-[16px] flex items-center justify-center"
                style={{ boxShadow: '0px 20px 25px 0px rgba(59,130,246,0.3), 0px 8px 10px 0px rgba(59,130,246,0.3)' }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
                </svg>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[4px]">
            <h1 className="text-[#0f172a] font-black italic text-[30px] leading-[30px] tracking-[-1.5px] uppercase">
              OKR Cascading
            </h1>
            <div className="flex items-center gap-[8px]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
              </svg>
              <p className="text-[#64748b] font-black text-[12px] leading-[16px] tracking-[1.2px] uppercase">
                Objective Alignment Engine
              </p>
            </div>
          </div>
        </div>

        {/* View toggle pill */}
        <div
          className="bg-white border-2 border-[#e2e8f0] rounded-[16px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex items-start"
          style={{ height: '62px', width: '334px', paddingTop: '10px', paddingLeft: '10px', paddingRight: '2px', paddingBottom: '2px', gap: '12px' }}
        >
          {/* List View button */}
          <button
            onClick={() => setViewMode('list')}
            className={cn(
              'h-[42px] rounded-[12px] flex items-center justify-center gap-[8px] transition-all relative',
              viewMode === 'list'
                ? 'bg-[#2563eb] shadow-[0px_20px_25px_0px_rgba(0,0,0,0.1),0px_8px_10px_0px_rgba(0,0,0,0.1)]'
                : ''
            )}
            style={{ width: '148.95px' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={viewMode === 'list' ? 'white' : '#64748b'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" />
              <line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
            </svg>
            <span className={cn('font-black text-[12px] tracking-[1.2px] uppercase', viewMode === 'list' ? 'text-white' : 'text-[#64748b]')}>
              List View
            </span>
          </button>

          {/* Tree View button */}
          <button
            onClick={() => setViewMode('tree')}
            className={cn(
              'h-[42px] rounded-[12px] flex items-center justify-center gap-[8px] transition-all',
              viewMode === 'tree'
                ? 'bg-[#2563eb] shadow-[0px_20px_25px_0px_rgba(0,0,0,0.1),0px_8px_10px_0px_rgba(0,0,0,0.1)]'
                : ''
            )}
            style={{ width: '153.5px' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={viewMode === 'tree' ? 'white' : '#64748b'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 3h6" /><path d="M6 15h2" /><path d="M6 9h14" />
              <path d="M3 3v18" /><path d="M8 3v6" /><path d="M8 15v6" />
            </svg>
            <span className={cn('font-black text-[12px] tracking-[1.2px] uppercase', viewMode === 'tree' ? 'text-white' : 'text-[#64748b]')}>
              Tree View
            </span>
          </button>
        </div>
      </div>

      {/* ── Content ── */}
      {viewMode === 'tree' ? (
        <OKRTreeView onCardClick={handleOpen} />
      ) : (
        <div className="flex flex-col bg-white border border-[#e2e8f0] rounded-[16px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.06)] overflow-hidden">
          {/* Table Header */}
          <div className="flex items-center px-[24px] py-[12px] border-b border-[#f1f5f9] bg-[#f8fafc]">
            <div className="w-[21px] shrink-0" />
            <div className="w-[57px] shrink-0" />
            <div className="flex-1 ml-[24px] text-[11px] font-bold text-[#64748b] uppercase tracking-[0.6px]">Objective</div>
            <div className="w-[175px] shrink-0 text-[11px] font-bold text-[#64748b] uppercase tracking-[0.6px] text-right pr-[40px]">Progress</div>
          </div>

          {/* OKR Items */}
          {OKR_LIST.map((okr) => (
            <div
              key={okr.id}
              onClick={() => handleOpen(okr.title, okr.progress)}
              className={cn(
                'flex items-center border-b border-[#f1f5f9] last:border-0 hover:bg-[#f8fafc] transition-colors cursor-pointer group',
                okr.indent ? 'pl-[32px]' : ''
              )}
              style={{ height: '111px' }}
            >
              {okr.indent && (
                <div className="w-[32px] h-[2px] bg-[#e2e8f0] shrink-0 relative" style={{ marginLeft: '-32px', marginRight: '0' }}>
                  <div className="absolute left-0 bottom-0 w-[32px] h-[2px] bg-[#e2e8f0]" />
                </div>
              )}
              <div className="w-[21px] shrink-0 flex items-center justify-center ml-[21px]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
              <div className={cn('w-[46px] h-[46px] rounded-[12px] flex items-center justify-center shrink-0 ml-[36px]', levelIconBg(okr.level))}>
                {levelIcon(okr.level)}
              </div>
              <div className="flex-1 ml-[24px] flex flex-col gap-[8px] min-w-0">
                <div className="flex items-center gap-[12px]">
                  <span className="text-[#64748b] font-semibold text-[12px] leading-[15px]">{okr.level}</span>
                  <div className="flex items-center gap-[4px] text-[#64748b]">
                    {okr.ownerIcon}
                    <span className="text-[#64748b] font-semibold text-[12px] leading-[15px] group-hover:text-[#2563eb] transition-colors">{okr.owner}</span>
                  </div>
                  {okr.tags?.map((tag) => (
                    <span key={tag.label} className="flex items-center gap-[4px] bg-[#eff6ff] text-[#2563eb] text-[11px] font-bold px-[8px] py-[2px] rounded-full">
                      {tag.label}
                    </span>
                  ))}
                </div>
                <h3 className="text-[#0f172a] font-bold text-[20px] leading-[24px] group-hover:text-[#2563eb] transition-colors truncate">
                  {okr.title}
                </h3>
                <div className="h-[8px] bg-[#f1f5f9] rounded-full overflow-hidden w-full">
                  <div className={cn('h-full rounded-full', progressColor(okr.progress))} style={{ width: `${okr.progress}%` }} />
                </div>
              </div>
              <div className="w-[175px] shrink-0 flex items-center justify-end gap-[12px] pr-[24px]">
                <div className="flex flex-col items-end gap-[4px]">
                  <span className="text-[#64748b] font-semibold text-[10px] leading-[10px] uppercase tracking-[0.4px]">Progress</span>
                  <span className="text-[#0f172a] font-black text-[18px] leading-[18px]">{okr.progress}%</span>
                </div>
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="w-[40px] h-[40px] bg-[#f1f5f9] hover:bg-[#e2e8f0] rounded-[12px] flex items-center justify-center transition-colors"
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M9 3.75V14.25M3.75 9H14.25" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* OKR Detail Sidebar */}
      <OKRDetailSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        objective={selectedOkr || undefined}
      />
    </div>
  )
}
