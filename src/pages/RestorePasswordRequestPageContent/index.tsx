import { Stack, Typography, Button, Divider } from '@mui/material'
import NavLink from 'next/link'
import { useTranslation } from 'next-i18next'
import React, { type FC } from 'react'

import { RestorePasswordRequestForm } from '~widgets/RestorePasswordRequestForm'
import { useMuiMediaQuery } from '~shared/hooks/useMediaQuery'
import { AuthRoutesEnum } from '~shared/types/routesEnums'
import { AuthLayout } from '~layouts/AuthLayout'

const RestorePasswordRequestPageContent: FC = () => {
  const { t } = useTranslation(['common', 'auth'])

  const { isSM } = useMuiMediaQuery()

  // Renders
  return (
    <AuthLayout>
      <Stack gap={4}>
        <Typography variant="h3" textAlign="center">
          {t('auth:screens.restore.title')}
        </Typography>

        <Typography variant="body2" textAlign="center">
          {t('auth:screens.restore.description')}
        </Typography>

        <RestorePasswordRequestForm />

        {!isSM && <Divider />}

        <Stack gap={1.5} direction={isSM ? 'row' : 'column-reverse'} justifyContent="stretch">
          <Button LinkComponent={NavLink} variant="outlined" href={AuthRoutesEnum.LOGIN} fullWidth>
            {t('button.logIn')}
          </Button>

          <Button
            LinkComponent={NavLink}
            variant="outlined"
            href={AuthRoutesEnum.SIGN_IN}
            fullWidth
          >
            {t('button.createNewAccount')}
          </Button>
        </Stack>
      </Stack>
    </AuthLayout>
  )
}

export { RestorePasswordRequestPageContent }
