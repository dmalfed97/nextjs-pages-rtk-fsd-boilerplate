import type { ReactElement, MouseEvent } from 'react'
import React, { createRef } from 'react'
import type { ReactCropperElement } from 'react-cropper'
import { Cropper } from 'react-cropper'
import { Button, Stack } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { useTranslation } from 'next-i18next'

import { UploadingStatus } from '~shared/types/loadingStatus'
import useAppDispatch from '~shared/hooks/useAppDispatch'
import { useMuiMediaQuery } from '~shared/hooks/useMediaQuery'
import { currentUserStore, currentUserSelectors } from '~entities/currentUser'

import 'cropperjs/dist/cropper.css'

interface CropAvatarStepProps {
  handleCloseModal: (e?: MouseEvent) => void
  image: string | ArrayBuffer | null
}

const CropAvatarStep = ({ handleCloseModal, image }: CropAvatarStepProps): ReactElement => {
  const { t } = useTranslation('common')

  const { isSM } = useMuiMediaQuery()

  const dispatch = useAppDispatch()
  const uploadingStatus = currentUserSelectors.useUploadingStatus()

  const cropperRef = createRef<ReactCropperElement>()

  // Handlers
  const handleSaveUserImage = (e: MouseEvent): void => {
    e.stopPropagation()

    if (typeof cropperRef.current?.cropper !== 'undefined') {
      const croppedImage = cropperRef.current.cropper.getCroppedCanvas().toDataURL()

      const formData = new FormData()

      // Преобразование Base64 строки в массив байтов
      const byteString = atob(croppedImage.split(',')[1])
      const mimeString = croppedImage.split(',')[0].split(':')[1].split(';')[0]

      const arrayBuffer = new ArrayBuffer(byteString.length)
      const intArray = new Uint8Array(arrayBuffer)

      for (let i = 0; i < byteString.length; i++) {
        intArray[i] = byteString.charCodeAt(i)
      }

      const blob = new Blob([intArray], { type: mimeString })

      formData.append('avatar', blob, 'avatar.png')

      void dispatch(currentUserStore.updateCurrentUserAvatarAction(formData)).then(() => {
        handleCloseModal()
      })
    }
  }

  // Renders
  return (
    <Stack gap={2.5}>
      <Cropper
        ref={cropperRef}
        src={(image || undefined) as string | undefined}
        viewMode={1}
        initialAspectRatio={1}
        responsive={false}
        autoCropArea={1}
        guides
        checkOrientation={false}
        height={isSM ? 460 : '100%'}
      />

      <Stack direction="row" gap={1.5} justifyContent="flex-end">
        <Button variant="outlined" onClick={handleCloseModal}>
          {t('button.cancel')}
        </Button>

        <LoadingButton
          loading={uploadingStatus === UploadingStatus.UPLOADING}
          onClick={handleSaveUserImage}
        >
          {t('button.save')}
        </LoadingButton>
      </Stack>
    </Stack>
  )
}

export { CropAvatarStep }
