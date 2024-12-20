import type { ReactElement } from 'react'
import React, { useEffect } from 'react'
import { Stack } from '@mui/material'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import type { SubmitHandler } from 'react-hook-form'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { useParams } from 'next/navigation'
import toast from 'react-hot-toast'

import type { RestorePasswordFormValues } from '~entities/auth'
import { authStore, authSelectors, RestorePasswordFormFields } from '~entities/auth'
import { AuthRoutesEnum } from '~shared/types/routesEnums'
import type { BaseResponseWrapper } from '~shared/api/base'
import useAppDispatch from '~shared/hooks/useAppDispatch'
import { PasswordInputWithController } from '~shared/ui/PasswordInputWithController'
import { UploadingStatus } from '~shared/types/loadingStatus'

import { useStyles } from './index.styled'
import { RestorePasswordValidationSchema } from '../validation'

interface RestorePasswordFormProps {
  onSuccess?: () => void
}

const RestorePasswordForm = ({ onSuccess }: RestorePasswordFormProps): ReactElement => {
  const params = useParams<{ token: string }>()
  const router = useRouter()

  const { t } = useTranslation('common')

  const { classes } = useStyles()

  const dispatch = useAppDispatch()
  const uploadingStatus = authSelectors.useUploadingStatus()

  const methods = useForm<RestorePasswordFormValues>({
    // @ts-expect-error typical yup error
    resolver: yupResolver<RestorePasswordFormValues>(RestorePasswordValidationSchema),
    defaultValues: {
      [RestorePasswordFormFields.resetPasswordToken]: params?.token || '',
      [RestorePasswordFormFields.password]: '',
      [RestorePasswordFormFields.passwordConfirm]: '',
    },
  })
  const { control, handleSubmit } = methods

  // Effects
  useEffect(() => {
    if (!params?.token) {
      toast.error(t('auth:error.invalidRestorePasswordLink'))

      void router.push(AuthRoutesEnum.RESTORE)
    }
  }, [params, router, t])

  // Handlers
  const onSubmit: SubmitHandler<RestorePasswordFormValues> = (values) => {
    void dispatch(authStore.resetPasswordAction(values)).then((payload) => {
      if ((payload.payload as BaseResponseWrapper)?.success) {
        onSuccess?.()
      }
    })
  }

  // Renders
  return (
    <FormProvider {...methods}>
      <Stack component="form" gap={3} onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={1} alignSelf="stretch">
          <PasswordInputWithController
            fullWidth
            autoComplete="off"
            hookFormProps={{ control }}
            name={RestorePasswordFormFields.password}
            label={t('input.password.label')}
          />

          <PasswordInputWithController
            fullWidth
            autoComplete="off"
            hookFormProps={{ control }}
            name={RestorePasswordFormFields.passwordConfirm}
            label={t('input.confirmPassword.label')}
          />
        </Stack>

        <Stack direction="row">
          <ul className={classes.descriptionPoints}>
            <li>{t('input.password.description.passwordMinLength')}</li>
            <li>{t('input.password.description.oneUppercaseLetter')}</li>
            <li>{t('input.password.description.oneDigit')}</li>
          </ul>
        </Stack>

        <LoadingButton
          type="submit"
          variant="contained"
          loading={uploadingStatus === UploadingStatus.UPLOADING}
        >
          {t('button.changePassword')}
        </LoadingButton>
      </Stack>
    </FormProvider>
  )
}

export { RestorePasswordForm }
