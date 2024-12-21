import { Button, Divider, Stack, Typography } from '@mui/material'
import dynamic from 'next/dynamic'
import NavLink from 'next/link'
import { useTranslation } from 'next-i18next'
import React, { type FC } from 'react'

import { RegistrationForm } from '~widgets/RegistrationForm'
import { AuthRoutesEnum } from '~shared/types/routesEnums'

const GoogleSignInButton = dynamic(
  () => import('~features/auth/GoogleSignInButton').then((mod) => mod.GoogleSignInButton),
  {
    ssr: false,
  }
)
const FacebookSignInButton = dynamic(
  () => import('~features/auth/FacebookSignInButton').then((mod) => mod.FacebookSignInButton),
  {
    ssr: false,
  }
)

interface SignUpFormStepProps {
  onSubmitCallback: () => void
}

const SignUpFormStep: FC<SignUpFormStepProps> = ({ onSubmitCallback }) => {
  const { t } = useTranslation(['common', 'auth'])

  // Renders
  return (
    <Stack gap={4}>
      <Typography variant="h3" textAlign="center">
        {t('auth:screens.registration.title')}
      </Typography>

      <Stack gap={1}>
        <Stack direction="row" justifyContent="center" gap={1.5}>
          <GoogleSignInButton />

          <FacebookSignInButton />
        </Stack>

        <Typography variant="body2" textAlign="center">
          {t('auth:word.orContinueWith')}
        </Typography>
      </Stack>

      <RegistrationForm onSuccess={onSubmitCallback} />

      <Stack gap={1.5}>
        <Divider>
          <Typography variant="subtitle2" whiteSpace="nowrap">
            {t('auth:word.alreadyHaveAnAccount')}
          </Typography>
        </Divider>

        <Button LinkComponent={NavLink} href={AuthRoutesEnum.LOGIN} variant="outlined" fullWidth>
          {t('button.logIn')}
        </Button>
      </Stack>
    </Stack>
  )
}

export { SignUpFormStep }
