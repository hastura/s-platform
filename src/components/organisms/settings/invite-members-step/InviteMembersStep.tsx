'use client'

import { useMemo, useState } from 'react'
import { ChipTabs, ConfirmModal } from '@/components/molecules'
import { IconPlus } from '@/components/icons'
import { useSettingsStore, toast } from '@/lib/stores'
import type { Member } from '@/types/settings'
import { EmployeeManagementStep } from '@/components/organisms/settings/employee-management-step/EmployeeManagementStep'
import { PendingInvitesStep, usePendingInviteCount } from '@/components/organisms/settings/pending-invites-step/PendingInvitesStep'
import { InviteEmployeeModal, type InviteFormValues } from '@/components/organisms/settings/modals/InviteEmployeeModal'
import { BulkInviteModal } from '@/components/organisms/settings/modals/BulkInviteModal'

/** Invite Members shell — tabs, header actions, and modals. Figma node 614:3789. */
export function InviteMembersStep() {
  const members = useSettingsStore((s) => s.members)
  const invites = useSettingsStore((s) => s.invites)
  const inviteMember = useSettingsStore((s) => s.inviteMember)
  const bulkInvite = useSettingsStore((s) => s.bulkInvite)
  const removeMember = useSettingsStore((s) => s.removeMember)

  const pendingCount = usePendingInviteCount()

  const [tab, setTab] = useState('members')
  const [inviteOpen, setInviteOpen] = useState(false)
  const [bulkOpen, setBulkOpen] = useState(false)
  const [removing, setRemoving] = useState<Member | null>(null)

  const existingEmails = useMemo(
    () => [
      ...members.map((m) => m.email),
      ...invites.filter((i) => i.status === 'pending').map((i) => i.email),
    ],
    [members, invites]
  )

  const memberCount = members.length

  async function handleInvite(values: InviteFormValues) {
    await inviteMember(values)
    toast({ title: 'Invite sent', description: `${values.name} (${values.email}) has been invited.`, variant: 'success' })
    setTab('invites')
  }

  return (
    <>
      <ChipTabs
        aria-label="Member views"
        items={[
          { value: 'members', label: 'Members' },
          { value: 'invites', label: `Pending Invites (${pendingCount})` },
        ]}
        value={tab}
        onValueChange={setTab}
      />

      <section
        aria-label="Employee Management"
        className="flex w-full flex-col gap-[var(--space-4)] rounded-[var(--radius-2xl)] border border-[var(--color-neutral-200)] bg-[var(--color-surface)] p-[var(--space-6)]"
      >
        <div className="flex h-[33px] items-center justify-between gap-[var(--space-4)]">
          <div className="flex items-center gap-3">
            <h2 className="text-[20px] font-bold leading-7 text-[var(--color-neutral-900)]">
              {tab === 'members' ? 'Employee Management' : 'Pending Invites'}
            </h2>
            <span className="inline-flex h-[21px] items-center rounded-[20px] bg-[var(--color-primary-50)] px-[10px] py-[3px] text-[12px] font-semibold leading-[15px] text-[var(--color-primary-600)]">
              {tab === 'members'
                ? `${memberCount} employee${memberCount === 1 ? '' : 's'}`
                : `${pendingCount} pending`}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setBulkOpen(true)}
              className="flex h-[33px] items-center rounded-lg border-[1.5px] border-[var(--color-neutral-200)] bg-[var(--color-surface)] px-4 py-2 text-[14px] font-semibold leading-[17px] text-[var(--color-neutral-700)] transition-colors hover:bg-[var(--color-neutral-50)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)]"
            >
              Bulk Import
            </button>
            <button
              type="button"
              onClick={() => setInviteOpen(true)}
              className="flex h-[33px] items-center gap-[6px] rounded-lg bg-[var(--color-primary-600)] px-4 py-2 text-[14px] font-semibold leading-[17px] text-white shadow-[0px_4px_6px_rgba(59,130,246,0.3)] transition-colors hover:bg-[var(--color-primary-700)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)] focus-visible:ring-offset-2"
            >
              <IconPlus size={11} />
              Invite Employee
            </button>
          </div>
        </div>

        {tab === 'members' && <EmployeeManagementStep onRemoveRequest={setRemoving} />}
        {tab === 'invites' && <PendingInvitesStep />}
      </section>

      <InviteEmployeeModal
        open={inviteOpen}
        onClose={() => setInviteOpen(false)}
        onSubmit={handleInvite}
        existingEmails={existingEmails}
      />

      <BulkInviteModal
        open={bulkOpen}
        onClose={() => setBulkOpen(false)}
        onSubmit={async (inputs) => {
          await bulkInvite(inputs)
          setTab('invites')
        }}
        existingEmails={existingEmails}
      />

      <ConfirmModal
        open={removing !== null}
        onClose={() => setRemoving(null)}
        onConfirm={async () => {
          if (!removing) return
          await removeMember(removing.id)
          toast({ title: 'Member removed', description: `${removing.name} was removed from the roster.`, variant: 'success' })
        }}
        title="Remove member?"
        description={removing ? `${removing.name} (${removing.employeeId}) will lose access to Strativy. This cannot be undone.` : ''}
        confirmLabel="Remove"
        destructive
      />
    </>
  )
}
