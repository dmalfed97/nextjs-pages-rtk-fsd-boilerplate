import React, { type MouseEvent, type FC } from 'react'

import { ChangePasswordModalSteps } from '../step'
import { ChangePasswordModalContent } from './ChangePasswordModalStep'
import { RestoreAccessModalStep } from './RestoreAccessModalStep'

interface ModalContentProps {
  step: ChangePasswordModalSteps
  setStep: (step: ChangePasswordModalSteps) => void
  handleCloseModal: (e?: MouseEvent) => void
}

const ModalContent: FC<ModalContentProps> = ({ handleCloseModal, step, setStep }) => {
  return (
    <>
      {step === ChangePasswordModalSteps.CHANGE_PASSWORD_MODAL_STEP && (
        <ChangePasswordModalContent handleCloseModal={handleCloseModal} setStep={setStep} />
      )}

      {step === ChangePasswordModalSteps.RESTORE_ACCESS_MODAL_STEP && (
        <RestoreAccessModalStep handleCloseModal={handleCloseModal} />
      )}
    </>
  )
}

export { ModalContent }
