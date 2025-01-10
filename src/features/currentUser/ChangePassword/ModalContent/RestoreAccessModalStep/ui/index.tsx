import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { Button, Stack, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import React, { type FC, type MouseEvent } from 'react'
import { FormProvider, useForm, type SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'

import {
  RestorePasswordRequestFormFields,
  authStore,
  authSelectors,
  type RestorePasswordRequestFormValues,
} from '~entities/auth'
import { currentUserSelectors } from '~entities/currentUser'
import type { BaseResponseWrapper } from '~shared/api/base'
import useAppDispatch from '~shared/hooks/useAppDispatch'
import { UploadingStatus } from '~shared/types/loadingStatus'
import { RHFTextField } from '~shared/ui/RHFTextField'

import { RestorePasswordRequestValidationSchema } from '../validation'

interface RestoreAccessModalStepProps {
  handleCloseModal: (e?: MouseEvent) => void
}

const RestoreAccessModalStep: FC<RestoreAccessModalStepProps> = ({ handleCloseModal }) => {
  const { t } = useTranslation(['common', 'profile'])

  const dispatch = useAppDispatch()
  const uploadingStatus = authSelectors.useUploadingStatus()
  const currentUser = currentUserSelectors.useCurrentUser()

  const formMethods = useForm<RestorePasswordRequestFormValues>({
    // @ts-expect-error typical yup error
    resolver: yupResolver<RestorePasswordRequestFormValues>(RestorePasswordRequestValidationSchema),
    defaultValues: {
      [RestorePasswordRequestFormFields.email]: currentUser?.email || '',
    },
  })
  const { handleSubmit, control } = formMethods

  // Handlers
  const showErrorMessage = (): void => {
    toast.error(t('errors.generic'))
  }

  const onSubmit: SubmitHandler<RestorePasswordRequestFormValues> = (values) => {
    void dispatch(authStore.sendResetPasswordEmailAction(values)).then((payload) => {
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
        <Stack gap={1} alignSelf="stretch">
          <Typography variant="body1">{t('profile:modal.passwordReset.message')}</Typography>

          <RHFTextField
            disabled
            name={RestorePasswordRequestFormFields.email}
            hookFormProps={{ control }}
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
            {t('button.reset')}
          </LoadingButton>
        </Stack>
      </Stack>
    </FormProvider>
  )
}

export { RestoreAccessModalStep }
