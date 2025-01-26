import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { Stack, Typography, Checkbox, Link, useTheme /*, MenuItem */ } from '@mui/material'
import NavLink from 'next/link'
import { Trans, useTranslation } from 'next-i18next'
import React, { useState, type FC, type ChangeEvent } from 'react'
import { FormProvider, useForm, type SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'

import { authStore, authSelectors, RegistrationFormFields } from '~entities/auth'
// import { RHFSelectField } from '~shared/ui/RHFSelectField'
// import { Sex } from '~shared/types/sex'
import useAppDispatch from '~shared/hooks/useAppDispatch'
import { UploadingStatus } from '~shared/types/loadingStatus'
import { RHFPasswordField } from '~shared/ui/RHFPasswordField'
import { RHFTextField } from '~shared/ui/RHFTextField'
import type { BaseResponseWrapper } from '~shared/api/base'

import { RegistrationValidationSchema, type RegistrationValidationSchemaType } from '../validation'

interface RegistrationFormProps {
  onSuccess?: () => void
}

const RegistrationForm: FC<RegistrationFormProps> = ({ onSuccess }) => {
  const { t } = useTranslation(['common', 'auth'])

  const { palette } = useTheme()

  const dispatch = useAppDispatch()
  const uploadingStatus = authSelectors.useUploadingStatus()

  const [rulesApplied, setRulesApplied] = useState<boolean>(false)

  const formMethods = useForm<RegistrationValidationSchemaType>({
    resolver: yupResolver(RegistrationValidationSchema),
    defaultValues: {
      [RegistrationFormFields.email]: '',
      [RegistrationFormFields.password]: '',
      [RegistrationFormFields.passwordConfirm]: '',
      // [RegistrationFormFields.firstName]: '',
      // [RegistrationFormFields.lastName]: '',
      // [RegistrationFormFields.sex]: Sex.MALE,
    },
  })
  const { control, handleSubmit } = formMethods

  // Handlers
  const handleChangeCheckboxValue = (e: ChangeEvent<HTMLInputElement>): void => {
    setRulesApplied(e.target.checked)
  }

  const onSubmit: SubmitHandler<RegistrationValidationSchemaType> = (values) => {
    if (rulesApplied) {
      void dispatch(
        authStore.registerAction({
          email: values.email.trim(),
          password: values.password.trim(),
          passwordConfirm: values.passwordConfirm.trim(),
          // firstName: values.firstName?.trim() || null,
          // lastName: values.lastName?.trim() || null,
          // sex: values.sex,
        })
      ).then((payload) => {
        if ((payload.payload as BaseResponseWrapper)?.success) {
          onSuccess?.()
        }
      })
    } else {
      toast.error(t('auth:screens.registration.toast.acceptTheRules'))
    }
  }

  // Renders
  return (
    <FormProvider {...formMethods}>
      <Stack component="form" gap={3} onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={2.5} alignSelf="stretch">
          {/*<Stack gap="row" gap={2.5}>*/}
          {/*  <RHFTextField*/}
          {/*    autoComplete="on"*/}
          {/*    name={RegistrationFormFields.firstName}*/}
          {/*    trimWhiteSpaces*/}
          {/*    hookFormProps={{ control }}*/}
          {/*    label={t('input.firstName.label')}*/}
          {/*  />*/}

          {/*  <RHFTextField*/}
          {/*    autoComplete="on"*/}
          {/*    name={RegistrationFormFields.lastName}*/}
          {/*    trimWhiteSpaces*/}
          {/*    hookFormProps={{ control }}*/}
          {/*    label={t('input.lastName.label')}*/}
          {/*  />*/}
          {/*</Stack>*/}

          <RHFTextField
            fullWidth
            autoComplete="on"
            name={RegistrationFormFields.email}
            trimWhiteSpaces
            hookFormProps={{ control }}
            label={t('input.email.label')}
          />

          {/*<RHFSelectField*/}
          {/*  fullWidth*/}
          {/*  name={RegistrationFormFields.sex}*/}
          {/*  hookFormProps={{ control }}*/}
          {/*  label={t('input.sex.label')}*/}
          {/*>*/}
          {/*  <MenuItem value={Sex.MALE}>{t('input.sex.value.MALE')}</MenuItem>*/}

          {/*  <MenuItem value={Sex.FEMALE}>{t('input.sex.value.FEMALE')}</MenuItem>*/}
          {/*</RHFSelectField>*/}

          <RHFPasswordField
            fullWidth
            autoComplete="off"
            hookFormProps={{ control }}
            name={RegistrationFormFields.password}
            label={t('input.password.label')}
          />

          <RHFPasswordField
            fullWidth
            autoComplete="off"
            hookFormProps={{ control }}
            name={RegistrationFormFields.passwordConfirm}
            label={t('input.confirmPassword.label')}
          />
        </Stack>

        <Stack direction="row" alignItems="center">
          <Checkbox
            checked={rulesApplied}
            onChange={handleChangeCheckboxValue}
            inputProps={{ 'aria-label': 'controlled' }}
          />

          <Typography variant="subtitle2">
            <Trans
              i18nKey="auth:screens.registration.rules"
              components={{
                link1: (
                  <Link
                    component={NavLink}
                    href={{ pathname: t('links.termsOfService') }}
                    color={palette.primary.main}
                  />
                ),
                link2: (
                  <Link
                    component={NavLink}
                    href={{ pathname: t('links.userAgreement') }}
                    color={palette.primary.main}
                  />
                ),
                link3: (
                  <Link
                    component={NavLink}
                    href={{ pathname: t('links.privacyPolicy') }}
                    color={palette.primary.main}
                  />
                ),
              }}
            />
          </Typography>
        </Stack>

        <LoadingButton
          type="submit"
          variant="contained"
          loading={uploadingStatus === UploadingStatus.UPLOADING}
        >
          {t('button.createAccount')}
        </LoadingButton>
      </Stack>
    </FormProvider>
  )
}

export { RegistrationForm }
