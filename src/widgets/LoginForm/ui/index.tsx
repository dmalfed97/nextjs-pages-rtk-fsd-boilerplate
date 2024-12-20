import type { ReactElement } from 'react'
import React from 'react'
import { Stack, Button } from '@mui/material'
import { useTranslation } from 'next-i18next'
import type { SubmitHandler } from 'react-hook-form'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import NavLink from 'next/link'

import type { LoginFormValues } from '~entities/auth'
import { authStore, authSelectors, LoginFormFields } from '~entities/auth'
import { PasswordInputWithController } from '~shared/ui/PasswordInputWithController'
import { UploadingStatus } from '~shared/types/loadingStatus'
import type { BaseResponseWrapper } from '~shared/api/base'
import { AuthRoutesEnum } from '~shared/types/routesEnums'
import { useMuiMediaQuery } from '~shared/hooks/useMediaQuery'
import useAppDispatch from '~shared/hooks/useAppDispatch'
import { TextFieldWithController } from '~shared/ui/TextFieldWithController'

import { LoginValidationSchema } from '../validation'

interface LoginFormProps {
  onSuccess?: () => void
}

const LoginForm = ({ onSuccess }: LoginFormProps): ReactElement => {
  const { t } = useTranslation('common')

  const { isSM } = useMuiMediaQuery()

  const dispatch = useAppDispatch()
  const uploadingStatus = authSelectors.useUploadingStatus()

  const methods = useForm<LoginFormValues>({
    resolver: yupResolver<LoginFormValues>(LoginValidationSchema),
    defaultValues: {
      [LoginFormFields.email]: '',
      [LoginFormFields.password]: '',
    },
  })
  const { control, handleSubmit } = methods

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
    <FormProvider {...methods}>
      <Stack component="form" gap={4} onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={2.5} alignSelf="stretch">
          <TextFieldWithController
            fullWidth
            autoComplete="on"
            name={LoginFormFields.email}
            type="email"
            trimWhiteSpaces
            hookFormProps={{ control }}
            label={t('input.login.label')}
          />

          <PasswordInputWithController
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
