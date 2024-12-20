import type { MouseEvent, ReactElement } from 'react'
import React from 'react'

import { ChangePasswordModalSteps } from '../step'
import { RestoreAccessModalStep } from './RestoreAccessModalStep'
import { ChangePasswordModalContent } from './ChangePasswordModalStep'

interface ModalContentProps {
  step: ChangePasswordModalSteps
  setStep: (step: ChangePasswordModalSteps) => void
  handleCloseModal: (e?: MouseEvent) => void
}

const ModalContent = ({ handleCloseModal, step, setStep }: ModalContentProps): ReactElement => {
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
