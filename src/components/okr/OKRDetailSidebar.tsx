'use client'

import { Button } from '@/components/ui'
import { cn } from '@/lib/utils'

interface KeyResult {
  id: string
  title: string
  progress: number
  target: number
  current: number
  weight: number
}

interface OKRDetailSidebarProps {
  isOpen: boolean
  onClose: () => void
  objective?: {
    title: string
    level: string
    progress: number
    keyResults: KeyResult[]
  }
}

export function OKRDetailSidebar({ isOpen, onClose, objective }: OKRDetailSidebarProps) {
  if (!objective) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/20 backdrop-blur-sm z-[400] transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed top-0 right-0 h-full w-[560px] bg-white shadow-[-25px_0_50px_-12px_rgba(0,0,0,0.25)] z-[401] transition-transform duration-500 ease-out rounded-l-[48px] overflow-hidden flex flex-col border-l border-neutral-100",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="p-8 pb-6 flex items-start justify-between">
          <div className="flex gap-4">
            <div className="w-[60px] h-[60px] bg-primary-50 rounded-2xl flex items-center justify-center shadow-sm">
              <span className="text-primary-600 text-2xl">🏆</span>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-[#0f172a] font-black text-xl leading-tight uppercase tracking-tight">
                {objective.title}
              </h2>
              <div className="inline-block border-b border-neutral-200 pb-0.5 w-fit">
                <span className="text-neutral-500 font-black text-[10px] tracking-wider uppercase">
                  Level: {objective.level}
                </span>
              </div>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-neutral-100 flex items-center justify-center transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-8 py-4">
          <div className="flex flex-col gap-6">
            <div>
              <h3 className="text-neutral-500 font-black text-[13px] tracking-[1.3px] uppercase mb-4">
                Key Results
              </h3>
              
              <div className="flex flex-col gap-4">
                {objective.keyResults.map((kr) => (
                  <div 
                    key={kr.id}
                    className="bg-[#f8fafc] border border-neutral-100 rounded-2xl p-5 hover:border-primary-100 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <h4 className="text-[#0f172a] font-bold text-base leading-snug max-w-[320px]">
                        {kr.title}
                      </h4>
                      <div className="bg-primary-50 px-2 py-1 rounded-lg">
                        <span className="text-primary-600 font-black text-[11px] whitespace-nowrap">
                          Weight: {kr.weight}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 mb-3">
                      <div className="flex-1 h-2 bg-white rounded-full overflow-hidden border border-neutral-100">
                        <div 
                          className="h-full bg-primary-600 rounded-full transition-all duration-1000"
                          style={{ width: `${kr.progress}%` }}
                        />
                      </div>
                      <span className="text-[#0f172a] font-black text-sm w-10 text-right">
                        {kr.progress}%
                      </span>
                    </div>
                    
                    <div className="text-neutral-500 font-medium text-xs">
                      {kr.current} / {kr.target}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Insights placeholder */}
            <div className="mt-4 p-6 bg-gradient-to-br from-primary-600 to-indigo-700 rounded-3xl text-white relative overflow-hidden shadow-lg">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">✨</span>
                  <span className="font-bold text-sm tracking-wide uppercase">AI Insight</span>
                </div>
                <p className="text-primary-50 text-[13px] leading-relaxed mb-4 opacity-90">
                  Based on current velocity, this Objective is trending 12% ahead of schedule. We recommend shifting focus to &quot;1M Active User Base&quot; which is slightly lagging behind the target trajectory.
                </p>
                <Button variant="secondary" size="sm" className="bg-white/20 border-white/20 text-white hover:bg-white/30 backdrop-blur-sm h-9">
                  Analyze Gaps
                </Button>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl" />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-8 border-t border-neutral-100 bg-neutral-50/50 flex gap-3">
          <Button className="flex-1 rounded-xl h-12 bg-primary-600 text-white hover:bg-primary-700 font-bold shadow-lg shadow-primary-600/20">
            Edit Objective
          </Button>
          <Button variant="outline" className="flex-1 rounded-xl h-12 font-bold border-neutral-200 bg-white">
            Add Key Result
          </Button>
        </div>
      </aside>
    </>
  )
}
