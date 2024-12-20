import React, { useCallback, useState, useMemo } from 'react'
import type { MouseEvent, ReactElement, ChangeEvent } from 'react'
import { Button } from '@mui/material'
import { useTranslation } from 'next-i18next'
import dynamic from 'next/dynamic'
import toast from 'react-hot-toast'
import imageCompression from 'browser-image-compression'

import { CustomModal } from '~shared/ui/CustomModal'
import { useMuiMediaQuery } from '~shared/hooks/useMediaQuery'
import { UploadImage } from '~shared/ui/UploadImage'

import { UpdateCurrentUserAvatarSteps } from './steps'

const CropAvatarStep = dynamic(() => import('./CropAvatarStep').then((mod) => mod.CropAvatarStep), {
  ssr: false,
})

interface UpdateCurrentUserAvatarProps {
  renderTrigger?: (onClick: (event: MouseEvent) => void) => ReactElement
}

const UpdateCurrentUserAvatar = ({ renderTrigger }: UpdateCurrentUserAvatarProps): ReactElement => {
  const { t } = useTranslation(['common', 'profile'])

  const { isSM } = useMuiMediaQuery()

  const [step, setStep] = useState<UpdateCurrentUserAvatarSteps>(
    UpdateCurrentUserAvatarSteps.SELECT_NEW_AVATAR_STEP
  )
  const [image, setImage] = useState<string | ArrayBuffer | null>(null)
  const [modalIsOpened, setModalIsOpened] = useState<boolean>(false)
  const [isPreparingImage, setIsPreparingImage] = useState<boolean>(false)

  // Handlers
  const handleOpenModal = (e: MouseEvent): void => {
    e.stopPropagation()

    setModalIsOpened(true)
  }

  const handleCloseModal = (e?: MouseEvent): void => {
    e?.stopPropagation()

    setModalIsOpened(false)
    setStep(UpdateCurrentUserAvatarSteps.SELECT_NEW_AVATAR_STEP)
  }

  const selectImage = useCallback(
    async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
      try {
        if (e.target) {
          const MAX_IMAGE_SIZE = 1024 * 1024

          const files = e.target.files

          if (files) {
            let preparedImage = files[0]

            if (preparedImage.size >= MAX_IMAGE_SIZE) {
              setIsPreparingImage(true)
              const blob = await imageCompression(preparedImage, {
                maxSizeMB: 1,
                maxWidthOrHeight: 1024,
              })
              preparedImage = new File([blob], preparedImage.name, {
                type: preparedImage.type,
              })
              setIsPreparingImage(false)
            }

            const reader = new FileReader()

            reader.onload = () => {
              if (typeof reader.result === 'string') {
                setImage(reader.result.toString())

                setStep(UpdateCurrentUserAvatarSteps.CROP_AVATAR_STEP)
              }
            }

            reader.readAsDataURL(files[0])
          }
        }
      } catch (error) {
        console.error(error)
        toast.error(t('errors.fileUploadingError'))
      }
    },
    [t]
  )

  // Render helpers
  const getModalTitle = useMemo((): string => {
    if (step === UpdateCurrentUserAvatarSteps.SELECT_NEW_AVATAR_STEP) {
      return t('profile:modal.selectPhoto.title')
    }

    return t('profile:modal.cropPhoto.title')
  }, [step, t])

  const getModalContent = useMemo((): ReactElement => {
    if (step === UpdateCurrentUserAvatarSteps.SELECT_NEW_AVATAR_STEP) {
      return (
        <UploadImage
          onSelectPhoto={selectImage}
          title={t('profile:modal.selectPhoto.text')}
          loading={isPreparingImage}
        />
      )
    }

    return <CropAvatarStep handleCloseModal={handleCloseModal} image={image} />
  }, [image, isPreparingImage, selectImage, step, t])

  // Renders
  return (
    <>
      {renderTrigger ? (
        renderTrigger(handleOpenModal)
      ) : (
        <Button fullWidth={!isSM} size="small" variant="contained" onClick={handleOpenModal}>
          {t('button.changeImage')}
        </Button>
      )}

      <CustomModal open={modalIsOpened} onClose={handleCloseModal} title={getModalTitle}>
        {getModalContent}
      </CustomModal>
    </>
  )
}

export { UpdateCurrentUserAvatar }
