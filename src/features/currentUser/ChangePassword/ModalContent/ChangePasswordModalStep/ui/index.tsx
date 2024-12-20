import type { ReactElement, MouseEvent } from 'react'
import React from 'react'
import { useTranslation } from 'next-i18next'
import { Button, Stack } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import type { SubmitHandler } from 'react-hook-form'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'

import { UploadingStatus } from '~shared/types/loadingStatus'
import { PasswordInputWithController } from '~shared/ui/PasswordInputWithController'
import useAppDispatch from '~shared/hooks/useAppDispatch'
import type { BaseResponseWrapper } from '~shared/api/base'
import type { UpdatePasswordFormValues } from '~entities/currentUser'
import {
  currentUserStore,
  currentUserSelectors,
  UpdatePasswordFormFields,
} from '~entities/currentUser'

import { ChangePasswordModalSteps } from '../../../step'
import { UpdatePasswordValidationSchema } from '../validation'

interface ChangePasswordModalContentProps {
  handleCloseModal: (e?: MouseEvent) => void
  setStep: (step: ChangePasswordModalSteps) => void
}

const ChangePasswordModalContent = ({
  handleCloseModal,
  setStep,
}: ChangePasswordModalContentProps): ReactElement => {
  const { t } = useTranslation('common')

  const dispatch = useAppDispatch()
  const uploadingStatus = currentUserSelectors.useUploadingStatus()

  const methods = useForm<UpdatePasswordFormValues>({
    resolver: yupResolver<UpdatePasswordFormValues>(UpdatePasswordValidationSchema),
    defaultValues: {
      [UpdatePasswordFormFields.oldPassword]: '',
      [UpdatePasswordFormFields.newPassword]: '',
    },
  })
  const { handleSubmit, control } = methods

  // Handlers
  const showErrorMessage = (): void => {
    toast.error('errors.generic')
  }

  const handleRestorePasswordClick = (e: MouseEvent): void => {
    e.stopPropagation()

    setStep(ChangePasswordModalSteps.RESTORE_ACCESS_MODAL_STEP)
  }

  const onSubmit: SubmitHandler<UpdatePasswordFormValues> = (values) => {
    void dispatch(currentUserStore.updatePasswordAction(values)).then((payload) => {
      if ((payload.payload as BaseResponseWrapper)?.success) {
        handleCloseModal()
      } else {
        showErrorMessage()
      }
    })
  }

  // Renders
  return (
    <FormProvider {...methods}>
      <Stack component="form" gap={3} onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={1} alignSelf="stretch" alignItems="flex-start">
          <PasswordInputWithController
            fullWidth
            autoComplete="off"
            hookFormProps={{ control }}
            name={UpdatePasswordFormFields.oldPassword}
            label={t('input.currentPassword.label')}
          />

          <Button onClick={handleRestorePasswordClick} variant="text">
            {t('button.iForgotPassword')}
          </Button>

          <PasswordInputWithController
            fullWidth
            autoComplete="off"
            hookFormProps={{ control }}
            name={UpdatePasswordFormFields.newPassword}
            label={t('input.newPassword.label')}
          />
        </Stack>

        <Stack direction="row" justifyContent="end" gap={1.5}>
          <Button variant="outlined" onClick={handleCloseModal}>
            {t('button.cancel')}
          </Button>

          <LoadingButton
            type="submit"
            variant="contained"
            loading={uploadingStatus === UploadingStatus.UPLOADING}
          >
            {t('button.save')}
          </LoadingButton>
        </Stack>
      </Stack>
    </FormProvider>
  )
}

export { ChangePasswordModalContent }
