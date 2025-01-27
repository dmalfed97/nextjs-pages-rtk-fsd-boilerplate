import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { Stack, Button } from '@mui/material'
import NavLink from 'next/link'
import { useTranslation } from 'next-i18next'
import React, { type FC } from 'react'
import { FormProvider, useForm, type SubmitHandler } from 'react-hook-form'

import { authStore, authSelectors, LoginFormFields, type LoginFormValues } from '~entities/auth'
import type { BaseResponseWrapper } from '~shared/api/base'
import useAppDispatch from '~shared/hooks/useAppDispatch'
import { useMuiMediaQuery } from '~shared/hooks/useMediaQuery'
import { UploadingStatus } from '~shared/types/loadingStatus'
import { AuthRoutesEnum } from '~shared/types/routesEnums'
import { RHFPasswordField } from '~shared/ui/RHFPasswordField'
import { RHFTextField } from '~shared/ui/RHFTextField'

import { LoginValidationSchema } from '../validation'

interface LoginFormProps {
  onSuccess?: () => void
}

const LoginForm: FC<LoginFormProps> = ({ onSuccess }) => {
  const { t } = useTranslation('common')

  const { isSM } = useMuiMediaQuery()

  const dispatch = useAppDispatch()
  const uploadingStatus = authSelectors.useUploadingStatus()

  const formMethods = useForm<LoginFormValues>({
    resolver: yupResolver<LoginFormValues>(LoginValidationSchema),
    defaultValues: {
      [LoginFormFields.email]: '',
      [LoginFormFields.password]: '',
    },
  })
  const { control, handleSubmit } = formMethods

  // Handlers
  const onSubmit: SubmitHandler<LoginFormValues> = (values) => {
    void dispatch(
      authStore.loginAction({
        email: values.email.trim(),
        password: values.password.trim(),
      })
    ).then((payload) => {
      if ((payload.payload as BaseResponseWrapper)?.success) {
        onSuccess?.()
      }
    })
  }

  // Renders
  return (
    <FormProvider {...formMethods}>
      <Stack component="form" gap={4} onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={2.5} alignSelf="stretch">
          <RHFTextField
            fullWidth
            autoComplete="on"
            name={LoginFormFields.email}
            type="email"
            trimWhiteSpaces
            hookFormProps={{ control }}
            label={t('input.login.label')}
          />

          <RHFPasswordField
            fullWidth
            autoComplete="on"
            hookFormProps={{ control }}
            name={LoginFormFields.password}
            label={t('input.password.label')}
          />
        </Stack>

        <Stack direction={isSM ? 'row' : 'column-reverse'} justifyContent="stretch" gap={1.5}>
          <Button
            LinkComponent={NavLink}
            href={AuthRoutesEnum.RESTORE}
            variant="outlined"
            fullWidth
          >
            {t('button.iForgotPassword')}
          </Button>

          <LoadingButton
            type="submit"
            variant="contained"
            fullWidth
            loading={uploadingStatus === UploadingStatus.UPLOADING}
          >
            {t('button.logMeIn')}
          </LoadingButton>
        </Stack>
      </Stack>
    </FormProvider>
  )
}

export { LoginForm }
