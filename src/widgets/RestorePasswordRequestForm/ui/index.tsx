import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { Stack } from '@mui/material'
import { useTranslation } from 'next-i18next'
import React, { type FC } from 'react'
import { FormProvider, useForm, type SubmitHandler } from 'react-hook-form'

import { authStore, authSelectors, RestorePasswordRequestFormFields } from '~entities/auth'
import useAppDispatch from '~shared/hooks/useAppDispatch'
import { UploadingStatus } from '~shared/types/loadingStatus'
import { RHFTextField } from '~shared/ui/RHFTextField'

import {
  RestorePasswordRequestValidationSchema,
  type RestorePasswordRequestValidationSchemaType,
} from '../validation'

interface RestorePasswordRequestProps {
  onSuccess?: () => void
}

const RestorePasswordRequestForm: FC<RestorePasswordRequestProps> = ({ onSuccess }) => {
  const { t } = useTranslation('common')

  const dispatch = useAppDispatch()
  const uploadingStatus = authSelectors.useUploadingStatus()

  const formMethods = useForm<RestorePasswordRequestValidationSchemaType>({
    resolver: yupResolver(RestorePasswordRequestValidationSchema),
    defaultValues: {
      [RestorePasswordRequestFormFields.email]: '',
    },
  })
  const { control, handleSubmit } = formMethods

  // Handlers
  const onSubmit: SubmitHandler<RestorePasswordRequestValidationSchemaType> = (values) => {
    void dispatch(authStore.sendResetPasswordEmailAction(values)).then(() => {
      onSuccess?.()
    })
  }

  // Renders
  return (
    <FormProvider {...formMethods}>
      <Stack component="form" gap={3} onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={2.5} alignSelf="stretch">
          <RHFTextField
            fullWidth
            autoComplete="off"
            hookFormProps={{ control }}
            name={RestorePasswordRequestFormFields.email}
            label={t('input.email.label')}
          />
        </Stack>

        <LoadingButton
          type="submit"
          variant="contained"
          loading={uploadingStatus === UploadingStatus.UPLOADING}
        >
          {t('button.sendRecoveryLink')}
        </LoadingButton>
      </Stack>
    </FormProvider>
  )
}

export { RestorePasswordRequestForm }
