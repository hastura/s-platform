'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

interface CompetencyLevel {
  id: string
  label: string
  title: string
  indicator: string
  rating: number
}

interface Competency {
  id: string
  title: string
  description: string
  score: number
  levels: CompetencyLevel[]
  iconColor: string
  iconBg: string
  icon: React.ReactNode
}

const COMPETENCIES: Competency[] = [
  {
    id: '1',
    title: 'Strategic Thinking',
    description: 'Ability to analyze market patterns and design long-term organizational plans.',
    score: 0.0,
    iconBg: 'bg-[#eff6ff]',
    iconColor: '#2563eb',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
      </svg>
    ),
    levels: [
      { id: 'l1', label: 'L1', title: 'Associate', indicator: 'Understands team vision and daily tasks.', rating: 0 },
      { id: 'l2', label: 'L2', title: 'Senior', indicator: 'Anticipates project risks before they occur.', rating: 0 },
    ],
  },
  {
    id: '2',
    title: 'UI/UX Design Mastery',
    description: 'Expertise in creating intuitive user experiences and aesthetic visuals.',
    score: 0.0,
    iconBg: 'bg-[#fdf4ff]',
    iconColor: '#7c3aed',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 13.5V20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6.5" />
        <path d="M9 22V12h6v10" />
        <path d="M2 13.5a9.93 9.93 0 0 1 6.65-2.5c2.25 0 4.25.65 6 1.77" />
        <path d="M22 13.5a9.93 9.93 0 0 0-6.65-2.5c-2.25 0-4.25.65-6 1.77" />
      </svg>
    ),
    levels: [
      { id: 'l1', label: 'L1', title: 'Junior Designer', indicator: 'Creates wireframes and simple prototypes.', rating: 0 },
      { id: 'l2', label: 'L2', title: 'Product Designer', indicator: 'Integrates user feedback into design iterations.', rating: 0 },
      { id: 'l3', label: 'L3', title: 'Design Lead', indicator: 'Sets company design system standards.', rating: 0 },
    ],
  },
  {
    id: '3',
    title: 'Creative Direction',
    description: 'Providing creative direction for impactful visual storytelling and brand identity.',
    score: 0.0,
    iconBg: 'bg-[#fff7ed]',
    iconColor: '#ea580c',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="13.5" cy="6.5" r=".5" /><circle cx="17.5" cy="10.5" r=".5" /><circle cx="8.5" cy="7.5" r=".5" />
        <circle cx="6.5" cy="12.5" r=".5" />
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
      </svg>
    ),
    levels: [
      { id: 'l1', label: 'L1', title: 'Visual Artist', indicator: 'Executes visual assets according to brief.', rating: 0 },
      { id: 'l2', label: 'L2', title: 'Art Director', indicator: 'Curates visual style for entire projects.', rating: 0 },
    ],
  },
]

export default function CompetencyPage() {
  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Header */}
      <div className="bg-white border border-[#e2e8f0] rounded-[16px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.06)]" style={{ height: '98px' }}>
        <div className="flex items-center justify-between px-[25px] h-full">
          {/* Left: Icon + Title */}
          <div className="flex items-center gap-[16px]">
            <div className="bg-[#2563eb] w-[48px] h-[48px] rounded-[12px] flex items-center justify-center shadow-[0px_4px_6px_0px_rgba(59,130,246,0.3)]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="7" height="7" x="3" y="3" rx="1" /><rect width="7" height="7" x="14" y="3" rx="1" />
                <rect width="7" height="7" x="14" y="14" rx="1" /><rect width="7" height="7" x="3" y="14" rx="1" />
              </svg>
            </div>
            <div className="flex flex-col gap-[4px]">
              <h1 className="text-[#0f172a] font-black text-[24px] leading-[24px] tracking-tight">
                CompetencyHub
              </h1>
              <p className="text-[#64748b] font-medium text-[13px] leading-[15px]">Assessment Management System</p>
            </div>
          </div>

          {/* Right: Action buttons */}
          <div className="flex items-center gap-[12px]">
            {/* Template + Import group */}
            <div className="flex bg-[#f1f5f9] p-[4px] rounded-[12px] gap-[2px]">
              <button className="flex items-center gap-[6px] h-[32px] px-[12px] rounded-[10px] bg-white shadow-sm text-[#334155] text-[13px] font-semibold hover:bg-slate-50 transition-all">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Template
              </button>
              <button className="flex items-center gap-[6px] h-[32px] px-[12px] rounded-[10px] text-[#334155] text-[13px] font-semibold hover:bg-white/60 transition-all">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                Import
              </button>
            </div>

            {/* Separator */}
            <div className="w-px h-[32px] bg-[#e2e8f0]" />

            {/* Edit Structure */}
            <button className="flex items-center gap-[8px] h-[32px] px-[16px] rounded-[10px] text-[#334155] text-[13px] font-semibold bg-[#f1f5f9] hover:bg-[#e2e8f0] transition-all">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              EDIT STRUCTURE
            </button>

            {/* Add Competency */}
            <button className="flex items-center gap-[8px] h-[32px] px-[16px] rounded-[10px] text-white text-[13px] font-semibold bg-[#2563eb] hover:bg-blue-700 shadow-[0px_4px_6px_0px_rgba(59,130,246,0.25)] transition-all">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 3.33V12.67M3.33 8H12.67" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              ADD COMPETENCY
            </button>

            {/* Configuration */}
            <button className="flex items-center gap-[8px] h-[32px] px-[16px] rounded-[10px] text-[#334155] text-[13px] font-semibold bg-[#f1f5f9] hover:bg-[#e2e8f0] transition-all">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              CONFIGURATION
            </button>
          </div>
        </div>
      </div>

      {/* Competencies List */}
      <div className="flex flex-col gap-5">
        {COMPETENCIES.map((comp) => (
          <CompetencySection key={comp.id} competency={comp} />
        ))}
      </div>
    </div>
  )
}

function CompetencySection({ competency }: { competency: Competency }) {
  return (
    <div className="bg-white border border-[#e2e8f0] rounded-[16px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.06)] overflow-hidden">
      {/* Section Header */}
      <div className="flex items-center justify-between px-[24px] py-[30px] border-b border-[#e2e8f0] bg-[#fafafa]" style={{ height: '113px' }}>
        <div className="flex items-center gap-[16px]">
          <div className={cn('w-[46px] h-[46px] rounded-[12px] flex items-center justify-center border border-[#e2e8f0] bg-white shadow-sm shrink-0')}>
            {competency.icon}
          </div>
          <div className="flex flex-col gap-[6px]">
            <h2 className="text-[#0f172a] font-bold text-[20px] leading-[28px]">{competency.title}</h2>
            <p className="text-[#64748b] text-[14px] font-normal leading-[20px]">{competency.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-[16px]">
          <div className="text-right">
            <p className="text-[#64748b] text-[10px] font-black uppercase tracking-[1px] leading-none mb-[4px]">Score</p>
            <p className="text-[#2563eb] font-black text-[24px] leading-none">{competency.score.toFixed(1)}</p>
          </div>
          <div className="bg-[#2563eb] w-[64px] h-[64px] rounded-[16px] flex items-center justify-center shadow-[0px_8px_16px_0px_rgba(59,130,246,0.3)]">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
            </svg>
          </div>
        </div>
      </div>

      {/* Levels */}
      <div className="p-[24px] flex flex-col gap-[16px]">
        {competency.levels.map((level) => (
          <LevelRow key={level.id} level={level} />
        ))}
      </div>
    </div>
  )
}

function LevelRow({ level }: { level: { id: string; label: string; title: string; indicator: string; rating: number } }) {
  const [rating, setRating] = useState(level.rating)
  const [indicatorRating, setIndicatorRating] = useState(level.rating)

  return (
    <div className="border border-[#e2e8f0] rounded-[12px] overflow-hidden" style={{ height: '153px' }}>
      {/* Level header row */}
      <div className="flex items-center justify-between px-[16px] bg-[#f8fafc] border-b border-[#e2e8f0]" style={{ height: '73px' }}>
        <div className="flex items-center gap-[12px]">
          <div className="w-[40px] h-[40px] bg-[#eff6ff] rounded-[10px] flex items-center justify-center">
            <span className="text-[#2563eb] font-black text-[14px]">{level.label}</span>
          </div>
          <h3 className="text-[#0f172a] font-bold text-[16px] leading-[24px]">{level.title}</h3>
        </div>
        <div className="flex items-center gap-[8px]">
          <span className="text-[#64748b] text-[13px] font-semibold">Rating:</span>
          <StarRating rating={rating} onChange={setRating} size="lg" />
        </div>
      </div>

      {/* Indicator row */}
      <div className="flex items-center justify-between px-[16px] bg-white" style={{ height: '46px' }}>
        <p className="text-[#334155] text-[14px] font-normal leading-[20px] flex-1 mr-[24px]">{level.indicator}</p>
        <StarRating rating={indicatorRating} onChange={setIndicatorRating} size="sm" />
      </div>
    </div>
  )
}

function StarRating({ rating, onChange, size = 'sm' }: { rating: number; onChange: (r: number) => void; size?: 'sm' | 'lg' }) {
  const starSize = size === 'lg' ? 20 : 16
  const gap = size === 'lg' ? 4 : 4

  return (
    <div className="flex" style={{ gap: `${gap}px` }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => onChange(star === rating ? 0 : star)}
          className="transition-colors hover:scale-110 active:scale-95"
        >
          <svg
            width={starSize}
            height={starSize}
            viewBox="0 0 24 24"
            fill={star <= rating ? '#f59e0b' : 'none'}
            stroke={star <= rating ? '#f59e0b' : '#cbd5e1'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </button>
      ))}
    </div>
  )
}
