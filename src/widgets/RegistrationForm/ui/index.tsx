import type { ChangeEvent, ReactElement } from 'react'
import React, { useState } from 'react'
import { Stack, Typography, Checkbox, Link /*, MenuItem */ } from '@mui/material'
import { useTranslation } from 'next-i18next'
import type { SubmitHandler } from 'react-hook-form'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import NavLink from 'next/link'
import toast from 'react-hot-toast'

import type { RegistrationFormValues } from '~entities/auth'
import { authStore, authSelectors, RegistrationFormFields } from '~entities/auth'
// import { SelectFieldWithController } from '~shared/ui/SelectFieldWithController'
import { PasswordInputWithController } from '~shared/ui/PasswordInputWithController'
import { UploadingStatus } from '~shared/types/loadingStatus'
import type { BaseResponseWrapper } from '~shared/api/base'
// import { Sex } from '~shared/types/sex'
import useAppDispatch from '~shared/hooks/useAppDispatch'
import { TextFieldWithController } from '~shared/ui/TextFieldWithController'

import { RegistrationValidationSchema } from '../validation'

interface RegistrationFormProps {
  onSuccess?: () => void
}

const RegistrationForm = ({ onSuccess }: RegistrationFormProps): ReactElement => {
  const { t } = useTranslation(['common', 'auth'])

  const dispatch = useAppDispatch()
  const uploadingStatus = authSelectors.useUploadingStatus()

  const [rulesApplied, setRulesApplied] = useState<boolean>(false)

  const methods = useForm<RegistrationFormValues>({
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
  const { control, handleSubmit } = methods

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
    <FormProvider {...methods}>
      <Stack component="form" gap={3} onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={2.5} alignSelf="stretch">
          {/*<Stack gap="row" gap={2.5}>*/}
          {/*  <TextFieldWithController*/}
          {/*    autoComplete="on"*/}
          {/*    name={RegistrationFormFields.firstName}*/}
          {/*    trimWhiteSpaces*/}
          {/*    hookFormProps={{ control }}*/}
          {/*    label={t('input.firstName.label')}*/}
          {/*  />*/}

          {/*  <TextFieldWithController*/}
          {/*    autoComplete="on"*/}
          {/*    name={RegistrationFormFields.lastName}*/}
          {/*    trimWhiteSpaces*/}
          {/*    hookFormProps={{ control }}*/}
          {/*    label={t('input.lastName.label')}*/}
          {/*  />*/}
          {/*</Stack>*/}

          <TextFieldWithController
            fullWidth
            autoComplete="on"
            name={RegistrationFormFields.email}
            trimWhiteSpaces
            hookFormProps={{ control }}
            label={t('input.email.label')}
          />

          {/*<SelectFieldWithController*/}
          {/*  fullWidth*/}
          {/*  name={RegistrationFormFields.sex}*/}
          {/*  hookFormProps={{ control }}*/}
          {/*  label={t('input.sex.label')}*/}
          {/*>*/}
          {/*  <MenuItem value={Sex.MALE}>{t('input.sex.value.MALE')}</MenuItem>*/}

          {/*  <MenuItem value={Sex.FEMALE}>{t('input.sex.value.FEMALE')}</MenuItem>*/}
          {/*</SelectFieldWithController>*/}

          <PasswordInputWithController
            fullWidth
            autoComplete="off"
            hookFormProps={{ control }}
            name={RegistrationFormFields.password}
            label={t('input.password.label')}
          />

          <PasswordInputWithController
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

            <Link component={NavLink} href="" color="#1FAE4C">
              {t('auth:screens.registration.rules.termsOfService')}
            </Link>

            {t('auth:screens.registration.rules.including')}

            <Link component={NavLink} href="" color="#1FAE4C">
              {t('auth:screens.registration.rules.userAgreement')}
            </Link>

            {t('auth:screens.registration.rules.and')}

            <Link component={NavLink} href="" color="#1FAE4C">
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
