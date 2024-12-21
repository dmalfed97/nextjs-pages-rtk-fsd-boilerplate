import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { Stack, Typography, Checkbox, Link /*, MenuItem */ } from '@mui/material'
import NavLink from 'next/link'
import { useTranslation } from 'next-i18next'
import React, { useState, type FC, type ChangeEvent } from 'react'
import { FormProvider, useForm, type SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'

import {
  authStore,
  authSelectors,
  RegistrationFormFields,
  type RegistrationFormValues,
} from '~entities/auth'
// import { RHFSelectField } from '~shared/ui/RHFSelectField'
import type { BaseResponseWrapper } from '~shared/api/base'
// import { Sex } from '~shared/types/sex'
import useAppDispatch from '~shared/hooks/useAppDispatch'
import { UploadingStatus } from '~shared/types/loadingStatus'
import { RHFPasswordField } from '~shared/ui/RHFPasswordField'
import { RHFTextField } from '~shared/ui/RHFTextField'

import { RegistrationValidationSchema } from '../validation'

interface RegistrationFormProps {
  onSuccess?: () => void
}

const RegistrationForm: FC<RegistrationFormProps> = ({ onSuccess }) => {
  const { t } = useTranslation(['common', 'auth'])

  const dispatch = useAppDispatch()
  const uploadingStatus = authSelectors.useUploadingStatus()

  const [rulesApplied, setRulesApplied] = useState<boolean>(false)

  const formMethods = useForm<RegistrationFormValues>({
    // @ts-expect-error typical yup error
    resolver: yupResolver<RegistrationFormValues>(RegistrationValidationSchema),
    defaultValues: {
      [RegistrationFormFields.email]: '',
      [RegistrationFormFields.password]: '',
      [RegistrationFormFields.passwordConfirm]: '',
      // [RegistrationFormFields.firstName]: '',
      // [RegistrationFormFields.lastName]: '',
      // [RegistrationFormFields.sex]: Sex.MALE,
      // [RegistrationFormFields.dateOfBirth]: null,
      // [RegistrationFormFields.location]: '',
    },
  })
  const { control, handleSubmit } = formMethods

  // Handlers
  const handleChangeCheckboxValue = (e: ChangeEvent<HTMLInputElement>): void => {
    setRulesApplied(e.target.checked)
  }

  const onSubmit: SubmitHandler<RegistrationFormValues> = (values) => {
    if (rulesApplied) {
      void dispatch(
        authStore.registerAction({
          email: values.email.trim(),
          password: values.password.trim(),
          passwordConfirm: values.passwordConfirm.trim(),
          // firstName: values.firstName?.trim() || null,
          // lastName: values.lastName?.trim() || null,
          // dateOfBirth: values.dateOfBirth,
          // location: values.location?.trim() || null,
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
            {`${t('auth:screens.registration.rules.iAgree')} `}

            <Link component={NavLink} href={{ pathname: '' }} color="#1FAE4C">
              {t('auth:screens.registration.rules.termsOfService')}
            </Link>

            {t('auth:screens.registration.rules.including')}

            <Link component={NavLink} href={{ pathname: '' }} color="#1FAE4C">
              {t('auth:screens.registration.rules.userAgreement')}
            </Link>

            {t('auth:screens.registration.rules.and')}

            <Link component={NavLink} href={{ pathname: '' }} color="#1FAE4C">
              {t('auth:screens.registration.rules.privacyPolicy')}
            </Link>
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
