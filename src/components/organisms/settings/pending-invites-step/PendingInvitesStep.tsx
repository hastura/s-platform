'use client'

import { useState } from 'react'
import { Badge } from '@/components/atoms'
import { ConfirmModal, formatDisplayDate } from '@/components/molecules'
import { DataTable, type DataTableColumn } from '@/components/organisms/data-table/DataTable'
import { IconRefresh, IconClose } from '@/components/icons'
import { useSettingsStore, toast } from '@/lib/stores'
import { MEMBER_ROLE_LABELS, type InviteStatus, type PendingInvite } from '@/types/settings'

const INVITE_BADGE: Record<InviteStatus, { label: string; variant: 'warning' | 'invited' | 'neutral' }> = {
  pending: { label: 'Pending', variant: 'warning' },
  expired: { label: 'Expired', variant: 'warning' },
  revoked: { label: 'Revoked', variant: 'neutral' },
}

/** Pending Invites table — PRD tab for invite lifecycle management. */
export function PendingInvitesStep() {
  const invites = useSettingsStore((s) => s.invites)
  const resendInvite = useSettingsStore((s) => s.resendInvite)
  const revokeInvite = useSettingsStore((s) => s.revokeInvite)

  const [revoking, setRevoking] = useState<PendingInvite | null>(null)

  const columns: DataTableColumn<PendingInvite>[] = [
    {
      key: 'email',
      header: 'EMAIL',
      render: (inv) => (
        <span className="flex min-w-0 flex-col pr-[var(--space-3)]">
          <span className="truncate text-[var(--font-size-sm)] font-semibold text-[var(--color-text-primary)]">{inv.email}</span>
          <span className="truncate text-[var(--font-size-xs)] font-medium capitalize text-[var(--color-text-tertiary)]">{inv.name}</span>
        </span>
      ),
    },
    {
      key: 'role',
      header: 'ROLE',
      widthClassName: 'w-[140px]',
      render: (inv) => <span className="text-[var(--font-size-sm)] text-[var(--color-text-secondary)]">{MEMBER_ROLE_LABELS[inv.role]}</span>,
    },
    {
      key: 'department',
      header: 'DEPARTMENT',
      widthClassName: 'w-[160px]',
      render: (inv) => <span className="truncate pr-[var(--space-2)] text-[var(--font-size-sm)] text-[var(--color-text-secondary)]">{inv.department}</span>,
    },
    {
      key: 'invitedAt',
      header: 'INVITED',
      widthClassName: 'w-[120px]',
      render: (inv) => <span className="text-[var(--font-size-sm)] text-[var(--color-text-secondary)]">{formatDisplayDate(inv.invitedAt)}</span>,
    },
    {
      key: 'expiresAt',
      header: 'EXPIRES',
      widthClassName: 'w-[120px]',
      render: (inv) => <span className="text-[var(--font-size-sm)] text-[var(--color-text-secondary)]">{formatDisplayDate(inv.expiresAt)}</span>,
    },
    {
      key: 'status',
      header: 'STATUS',
      widthClassName: 'w-[110px]',
      render: (inv) => {
        const badge = INVITE_BADGE[inv.status]
        return (
          <Badge variant={badge.variant} size="status">
            {badge.label}
          </Badge>
        )
      },
    },
    {
      key: 'action',
      header: 'ACTION',
      widthClassName: 'w-[110px]',
      render: (inv) => (
        <span className="flex items-center gap-[var(--space-2)]">
          {inv.status !== 'revoked' && (
            <button
              type="button"
              onClick={async () => {
                await resendInvite(inv.id)
                toast({ title: 'Invite resent', description: `A new invite email was sent to ${inv.email}.`, variant: 'success' })
              }}
              aria-label={`Resend invite to ${inv.email}`}
              className="flex h-[28px] w-[28px] items-center justify-center rounded-[var(--radius-md)] text-[var(--color-neutral-500)] transition-colors hover:bg-[var(--color-primary-50)] hover:text-[var(--color-primary-600)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)]"
            >
              <IconRefresh size={15} />
            </button>
          )}
          {inv.status === 'pending' && (
            <button
              type="button"
              onClick={() => setRevoking(inv)}
              aria-label={`Revoke invite for ${inv.email}`}
              className="flex h-[28px] w-[28px] items-center justify-center rounded-[var(--radius-md)] text-[var(--color-neutral-500)] transition-colors hover:bg-[var(--color-danger-50)] hover:text-[var(--color-danger-600)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)]"
            >
              <IconClose size={15} />
            </button>
          )}
        </span>
      ),
    },
  ]

  return (
    <>
      <DataTable
        aria-label="Pending invites"
        columns={columns}
        rows={invites}
        rowKey={(inv) => inv.id}
        emptyState={
          <div className="flex flex-col items-center gap-[var(--space-2)] text-center">
            <p className="text-[var(--font-size-sm)] font-semibold text-[var(--color-text-secondary)]">No pending invites</p>
            <p className="text-[var(--font-size-xs)] font-medium text-[var(--color-text-tertiary)]">
              Invites you send will appear here until they are accepted.
            </p>
          </div>
        }
      />

      <ConfirmModal
        open={revoking !== null}
        onClose={() => setRevoking(null)}
        onConfirm={async () => {
          if (!revoking) return
          await revokeInvite(revoking.id)
          toast({ title: 'Invite revoked', description: `The invite for ${revoking.email} is no longer valid.`, variant: 'success' })
        }}
        title="Revoke invite?"
        description={revoking ? `${revoking.email} will no longer be able to join with this invite link.` : ''}
        confirmLabel="Revoke"
        destructive
      />
    </>
  )
}

export function usePendingInviteCount() {
  const invites = useSettingsStore((s) => s.invites)
  return invites.filter((i) => i.status === 'pending').length
}
