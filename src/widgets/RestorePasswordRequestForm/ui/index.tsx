import type { ReactElement } from 'react'
import React from 'react'
import { Stack } from '@mui/material'
import { useTranslation } from 'next-i18next'
import type { SubmitHandler } from 'react-hook-form'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'

import type { RestorePasswordRequestFormValues } from '~entities/auth'
import { authStore, authSelectors, RestorePasswordRequestFormFields } from '~entities/auth'
import useAppDispatch from '~shared/hooks/useAppDispatch'
import { UploadingStatus } from '~shared/types/loadingStatus'
import { TextFieldWithController } from '~shared/ui/TextFieldWithController'

import { RestorePasswordRequestValidationSchema } from '../validation'

interface RestorePasswordRequestProps {
  onSuccess?: () => void
}

const RestorePasswordRequestForm = ({ onSuccess }: RestorePasswordRequestProps): ReactElement => {
  const { t } = useTranslation('common')

  const dispatch = useAppDispatch()
  const uploadingStatus = authSelectors.useUploadingStatus()

  const methods = useForm<RestorePasswordRequestFormValues>({
    // @ts-expect-error typical yup error
    resolver: yupResolver<RestorePasswordRequestFormValues>(RestorePasswordRequestValidationSchema),
    defaultValues: {
      [RestorePasswordRequestFormFields.email]: '',
    },
  })
  const { control, handleSubmit } = methods

  // Handlers
  const onSubmit: SubmitHandler<RestorePasswordRequestFormValues> = (values) => {
    void dispatch(authStore.sendResetPasswordEmailAction(values)).then(() => {
      onSuccess?.()
    })
  }

  // Renders
  return (
    <FormProvider {...methods}>
      <Stack component="form" gap={3} onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={2.5} alignSelf="stretch">
          <TextFieldWithController
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
