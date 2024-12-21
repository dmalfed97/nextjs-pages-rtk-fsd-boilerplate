import { Stack, Typography, Button, Divider } from '@mui/material'
import dynamic from 'next/dynamic'
import NavLink from 'next/link'
import { useTranslation } from 'next-i18next'
import React, { type FC } from 'react'

import { AuthLayout } from '~layouts/AuthLayout'
import { LoginForm } from '~widgets/LoginForm'
import { AuthRoutesEnum } from '~shared/types/routesEnums'
import { useMuiMediaQuery } from '~shared/hooks/useMediaQuery'

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

const LoginPageContent: FC = () => {
  const { t } = useTranslation(['common', 'auth'])

  const { isSM } = useMuiMediaQuery()

  // Renders
  return (
    <AuthLayout>
      <Stack gap={isSM ? 4 : 2.5}>
        <Typography variant="h3" textAlign="center">
          {t('auth:screens.login.title')}
        </Typography>

        <Stack gap={isSM ? 4 : 2.5} direction={isSM ? 'column' : 'column-reverse'}>
          <LoginForm />

          <Stack gap={1} direction={isSM ? 'column' : 'column-reverse'}>
            <Typography variant="body2" textAlign="center">
              {t('auth:word.orContinueWith')}
            </Typography>

            <Stack direction="row" justifyContent="center" gap={1.5}>
              <GoogleSignInButton />

              <FacebookSignInButton />
            </Stack>
          </Stack>
        </Stack>

        <Stack gap={1.5}>
          <Divider>
            <Typography variant="subtitle2" whiteSpace="nowrap">
              {t('auth:word.dontHaveAnAccount')}
            </Typography>
          </Divider>

          <Button
            LinkComponent={NavLink}
            href={AuthRoutesEnum.SIGN_IN}
            variant="outlined"
            fullWidth
          >
            {t('button.createNewAccount')}
          </Button>
        </Stack>
      </Stack>
    </AuthLayout>
  )
}

export { LoginPageContent }
