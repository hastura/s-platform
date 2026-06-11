'use client'

import { useState } from 'react'
import { Modal } from '@/components/molecules/modal/Modal'
import { ModalFooterButton } from '@/components/molecules/modal/ModalFooterButton'
import { Spinner } from '@/components/atoms'
import { IconAlertTriangle } from '@/components/icons'
import { cn } from '@/lib/utils'

export interface ConfirmModalProps {
  open: boolean
  onClose: () => void
  onConfirm: () => Promise<void> | void
  title: string
  description: string
  confirmLabel?: string
  cancelLabel?: string
  destructive?: boolean
}

export function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  destructive = false,
}: ConfirmModalProps) {
  const [busy, setBusy] = useState(false)

  async function handleConfirm() {
    setBusy(true)
    try {
      await onConfirm()
      onClose()
    } finally {
      setBusy(false)
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      hideHeader
      widthClassName="max-w-[440px]"
      footer={
        <>
          <ModalFooterButton variant="secondary" onClick={onClose} disabled={busy}>
            {cancelLabel}
          </ModalFooterButton>
          <ModalFooterButton
            variant="primary"
            onClick={handleConfirm}
            disabled={busy}
            className={cn(destructive && !busy && 'bg-[var(--color-danger-600)] hover:bg-[var(--color-danger-700)]')}
          >
            {busy ? <Spinner size={16} /> : confirmLabel}
          </ModalFooterButton>
        </>
      }
    >
      <div className="mx-auto flex w-full max-w-[400px] flex-col items-center gap-[var(--space-4)] py-[var(--space-2)] text-center">
        <span
          className={cn(
            'flex h-[56px] w-[56px] items-center justify-center rounded-[var(--radius-full)]',
            destructive
              ? 'bg-[var(--color-danger-50)] text-[var(--color-danger-600)]'
              : 'bg-[var(--color-warning-50)] text-[var(--color-warning-600)]'
          )}
        >
          <IconAlertTriangle size={28} />
        </span>
        <div className="flex flex-col gap-[var(--space-2)]">
          <h2 className="text-[var(--font-size-base)] font-bold text-[var(--color-text-primary)]">{title}</h2>
          <p className="text-[var(--font-size-sm)] font-normal text-[var(--color-text-secondary)]">{description}</p>
        </div>
      </div>
    </Modal>
  )
}
