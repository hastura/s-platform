'use client'

import { Modal } from '@/components/molecules/modal/Modal'
import { ModalFooterButton } from '@/components/molecules/modal/ModalFooterButton'
import { IconCheckCircle } from '@/components/icons'

export interface SuccessModalProps {
  open: boolean
  onClose: () => void
  /** Defaults to Figma 641:11528 copy. */
  title?: string
  description?: string
  actionLabel?: string
}

/** Success confirmation dialog — Figma node 641:11528 / 641:11087. */
export function SuccessModal({
  open,
  onClose,
  title = 'Successfully!',
  description = 'The performance weight configuration has been saved successfully!',
  actionLabel = 'Done',
}: SuccessModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      hideHeader
      widthClassName="max-w-[490px]"
      footer={
        <ModalFooterButton variant="primary" onClick={onClose} className="h-[42px] w-[133px] flex-none">
          {actionLabel}
        </ModalFooterButton>
      }
    >
      <div className="mx-auto flex w-full max-w-[440px] flex-col items-center gap-[20px] py-[20px] text-center">
        <span className="flex h-[41.228px] w-[41.228px] items-center justify-center text-[var(--color-primary-800)]">
          <IconCheckCircle size={41} />
        </span>
        <div className="flex w-full flex-col gap-[8px]">
          <h2 className="text-[16px] font-bold leading-[24px] text-[var(--color-text-primary)]">
            {title}
          </h2>
          {description && (
            <p className="h-[40px] text-[13px] font-normal leading-[20px] text-[var(--color-text-tertiary)]">
              {description}
            </p>
          )}
        </div>
      </div>
    </Modal>
  )
}
