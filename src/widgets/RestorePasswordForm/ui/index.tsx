import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { Stack } from '@mui/material'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import React, { useEffect, type FC } from 'react'
import { FormProvider, useForm, type SubmitHandler, type SubmitErrorHandler } from 'react-hook-form'
import toast from 'react-hot-toast'

import { authStore, authSelectors, RestorePasswordFormFields } from '~entities/auth'
import type { BaseResponseWrapper } from '~shared/api/base'
import useAppDispatch from '~shared/hooks/useAppDispatch'
import { UploadingStatus } from '~shared/types/loadingStatus'
import { AuthRoutesEnum } from '~shared/types/routesEnums'
import { RHFPasswordField } from '~shared/ui/RHFPasswordField'

import { useStyles } from './index.styled'
import {
  RestorePasswordValidationSchema,
  type RestorePasswordValidationSchemaType,
} from '../validation'

interface RestorePasswordFormProps {
  onSuccess?: () => void
}

const RestorePasswordForm: FC<RestorePasswordFormProps> = ({ onSuccess }) => {
  const params = useParams<{ token: string }>()
  const router = useRouter()

  const { t } = useTranslation(['common', 'auth'])

  const { classes } = useStyles()

  const dispatch = useAppDispatch()
  const uploadingStatus = authSelectors.useUploadingStatus()

  const formMethods = useForm<RestorePasswordValidationSchemaType>({
    resolver: yupResolver(RestorePasswordValidationSchema),
    defaultValues: {
      [RestorePasswordFormFields.resetPasswordToken]: params?.token || '',
      [RestorePasswordFormFields.password]: '',
      [RestorePasswordFormFields.passwordConfirm]: '',
    },
  })
  const { control, handleSubmit } = formMethods

  // Effects
  useEffect(() => {
    if (!params?.token) {
      toast.error(t('auth:error.invalidRestorePasswordLink'))

      void router.push(AuthRoutesEnum.RESTORE)
    }
  }, [params, router, t])

  // Handlers
  const onSubmit: SubmitHandler<RestorePasswordValidationSchemaType> = (values) => {
    void dispatch(authStore.resetPasswordAction(values)).then((payload) => {
      if ((payload.payload as BaseResponseWrapper)?.success) {
        onSuccess?.()
      }
    })
  }

  const onInvalid: SubmitErrorHandler<RestorePasswordValidationSchemaType> = () => {
    toast.error(t('errors.generic'))
  }

  // Renders
  return (
    <FormProvider {...formMethods}>
      <Stack component="form" gap={3} onSubmit={handleSubmit(onSubmit, onInvalid)}>
        <Stack gap={1} alignSelf="stretch">
          <RHFPasswordField
            fullWidth
            autoComplete="off"
            hookFormProps={{ control }}
            name={RestorePasswordFormFields.password}
            label={t('input.password.label')}
          />

          <RHFPasswordField
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
