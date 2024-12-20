import type { ReactElement, MouseEvent } from 'react'
import React from 'react'
import { useTranslation } from 'next-i18next'
import { Button, Stack, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import type { SubmitHandler } from 'react-hook-form'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'

import { UploadingStatus } from '~shared/types/loadingStatus'
import { currentUserSelectors } from '~entities/currentUser'
import useAppDispatch from '~shared/hooks/useAppDispatch'
import type { BaseResponseWrapper } from '~shared/api/base'
import { TextFieldWithController } from '~shared/ui/TextFieldWithController'
import type { RestorePasswordRequestFormValues } from '~entities/auth'
import { RestorePasswordRequestFormFields, authStore, authSelectors } from '~entities/auth'

import { RestorePasswordRequestValidationSchema } from '../validation'

interface RestoreAccessModalStepProps {
  handleCloseModal: (e?: MouseEvent) => void
}

const RestoreAccessModalStep = ({
  handleCloseModal,
}: RestoreAccessModalStepProps): ReactElement => {
  const { t } = useTranslation(['common', 'profile'])

  const dispatch = useAppDispatch()
  const uploadingStatus = authSelectors.useUploadingStatus()
  const currentUser = currentUserSelectors.useCurrentUser()

  const methods = useForm<RestorePasswordRequestFormValues>({
    // @ts-expect-error typical yup error
    resolver: yupResolver<RestorePasswordRequestFormValues>(RestorePasswordRequestValidationSchema),
    defaultValues: {
      [RestorePasswordRequestFormFields.email]: currentUser?.email || '',
    },
  })
  const { handleSubmit, control } = methods

  // Handlers
  const showErrorMessage = (): void => {
    toast.error('errors.generic')
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
    <FormProvider {...methods}>
      <Stack component="form" gap={3} onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={1} alignSelf="stretch">
          <Typography variant="body1">{t('profile:modal.passwordReset.message')}</Typography>

          <TextFieldWithController
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
