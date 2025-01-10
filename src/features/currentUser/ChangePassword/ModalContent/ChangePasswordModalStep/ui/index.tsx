import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { Button, Stack } from '@mui/material'
import { useTranslation } from 'next-i18next'
import React, { type FC, type MouseEvent } from 'react'
import { FormProvider, useForm, type SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'

import {
  currentUserStore,
  currentUserSelectors,
  UpdatePasswordFormFields,
  type UpdatePasswordFormValues,
} from '~entities/currentUser'
import type { BaseResponseWrapper } from '~shared/api/base'
import useAppDispatch from '~shared/hooks/useAppDispatch'
import { UploadingStatus } from '~shared/types/loadingStatus'
import { RHFPasswordField } from '~shared/ui/RHFPasswordField'

import { ChangePasswordModalSteps } from '../../../step'
import { UpdatePasswordValidationSchema } from '../validation'

interface ChangePasswordModalContentProps {
  handleCloseModal: (e?: MouseEvent) => void
  setStep: (step: ChangePasswordModalSteps) => void
}

const ChangePasswordModalContent: FC<ChangePasswordModalContentProps> = ({
  handleCloseModal,
  setStep,
}) => {
  const { t } = useTranslation('common')

  const dispatch = useAppDispatch()
  const uploadingStatus = currentUserSelectors.useUploadingStatus()

  const formMethods = useForm<UpdatePasswordFormValues>({
    resolver: yupResolver<UpdatePasswordFormValues>(UpdatePasswordValidationSchema),
    defaultValues: {
      [UpdatePasswordFormFields.oldPassword]: '',
      [UpdatePasswordFormFields.newPassword]: '',
    },
  })
  const { handleSubmit, control } = formMethods

  // Handlers
  const showErrorMessage = (): void => {
    toast.error(t('errors.generic'))
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
    <FormProvider {...formMethods}>
      <Stack component="form" gap={3} onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={1} alignSelf="stretch" alignItems="flex-start">
          <RHFPasswordField
            fullWidth
            autoComplete="off"
            hookFormProps={{ control }}
            name={UpdatePasswordFormFields.oldPassword}
            label={t('input.currentPassword.label')}
          />

          <Button onClick={handleRestorePasswordClick} variant="text">
            {t('button.iForgotPassword')}
          </Button>

          <RHFPasswordField
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
