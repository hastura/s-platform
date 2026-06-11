'use client'

import * as React from 'react'
import { useState } from 'react'
import { ChipTabs } from '@/components/molecules/chip-tabs/ChipTabs'
import { LeaderboardRow } from '@/components/molecules/leaderboard-row/LeaderboardRow'
import { DASHBOARD_SCOPE_TABS } from '@/lib/mock/dashboard'
import type { DashboardLeaderboardEntry, DashboardScopeFilter } from '@/types/dashboard'
import { cn } from '@/lib/utils'

export interface LeaderboardPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  entriesByScope: Record<DashboardScopeFilter, DashboardLeaderboardEntry[]>
}

const LeaderboardPanel = React.forwardRef<HTMLDivElement, LeaderboardPanelProps>(
  ({ className, entriesByScope, ...props }, ref) => {
    const [scope, setScope] = useState<DashboardScopeFilter>('dept')
    const entries = entriesByScope[scope]

    return (
      <div
        ref={ref}
        className={cn(
          'w-full max-w-[528px] rounded-[var(--radius-2xl)] bg-white p-[var(--space-6)] shadow-[var(--shadow-elevation-03)]',
          className
        )}
        {...props}
      >
        <div className="mb-[var(--space-5)] flex items-center justify-between gap-[var(--space-3)]">
          <h3 className="text-[var(--font-size-base)] font-bold text-[var(--color-neutral-800)]">
            Leaderboard Performance
          </h3>
          <ChipTabs
            items={[...DASHBOARD_SCOPE_TABS]}
            value={scope}
            onValueChange={(value) => setScope(value as DashboardScopeFilter)}
            variant="filter"
            aria-label="Leaderboard scope filter"
          />
        </div>

        <div>
          {entries.map((entry) => (
            <LeaderboardRow
              key={`${scope}-${entry.rank}-${entry.name}`}
              rank={entry.rank}
              name={entry.name}
              okrProgress={entry.okrProgress}
              score={entry.score}
              scoreMax={entry.scoreMax}
            />
          ))}
        </div>
      </div>
    )
  }
)
LeaderboardPanel.displayName = 'LeaderboardPanel'

export { LeaderboardPanel }
