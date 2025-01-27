import { Button } from '@mui/material'
import dynamic from 'next/dynamic'
import { useTranslation } from 'next-i18next'
import type { MouseEvent, ReactElement, FC } from 'react'
import React, { useState, useCallback, useMemo, useEffect } from 'react'

import { QModal } from '~shared/ui/QModal'

import { ChangePasswordModalSteps } from './step'

// Dynamic imports
const ModalContent = dynamic(() => import('./ModalContent').then((m) => m.ModalContent))

interface UpdatePasswordProps {
  renderTrigger?: (onClick: (e: MouseEvent) => void) => ReactElement
  onClose?: () => void
}

const UpdatePassword: FC<UpdatePasswordProps> = ({ renderTrigger, onClose }) => {
  const { t } = useTranslation(['common', 'profile'])

  const [modalIsOpened, setModalIsOpened] = useState<boolean>(false)
  const [step, setStep] = useState<ChangePasswordModalSteps>(
    ChangePasswordModalSteps.CHANGE_PASSWORD_MODAL_STEP
  )

  useEffect(() => {
    return () => {
      setStep(ChangePasswordModalSteps.CHANGE_PASSWORD_MODAL_STEP)
    }
  }, [])

  // Handlers
  const handleOpenModal = (e: MouseEvent): void => {
    e.stopPropagation()

    setModalIsOpened(true)
  }

  const handleCloseModal = useCallback(
    (e?: MouseEvent): void => {
      e?.stopPropagation()

      setModalIsOpened(false)

      onClose?.()
    },
    [onClose]
  )

  const clickInterceptor = useCallback((e: MouseEvent): void => {
    e.stopPropagation()
  }, [])

  const getModalTitle = useMemo((): string => {
    if (step === ChangePasswordModalSteps.CHANGE_PASSWORD_MODAL_STEP) {
      return t('profile:modal.changePassword.title')
    }
    return t('profile:modal.passwordReset.title')
  }, [step, t])

  // Renders
  return (
    <>
      {renderTrigger ? (
        renderTrigger(handleOpenModal)
      ) : (
        <Button variant="text" onClick={handleOpenModal}>
          {t('button.changePassword')}
        </Button>
      )}

      <QModal
        onClose={handleCloseModal}
        open={modalIsOpened}
        title={getModalTitle}
        onClick={clickInterceptor}
      >
        <>
          {modalIsOpened && (
            <ModalContent step={step} setStep={setStep} handleCloseModal={handleCloseModal} />
          )}
        </>
      </QModal>
    </>
  )
}

export { UpdatePassword }
