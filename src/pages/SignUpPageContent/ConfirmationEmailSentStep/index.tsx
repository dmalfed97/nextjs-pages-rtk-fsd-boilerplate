import { Button, Stack, Typography } from '@mui/material'
import NavLink from 'next/link'
import { useParams } from 'next/navigation'
import { useTranslation } from 'next-i18next'
import React, { type FC } from 'react'

const ConfirmationEmailSentStep: FC = () => {
  const params = useParams<{ email: string }>()

  const { t } = useTranslation(['common', 'auth'])

  // Renders
  return (
    <Stack gap={4.5} alignItems="center">
      <Typography variant="h3">{t('auth:screens.confirmRegistration.title')}</Typography>

      <Typography variant="body1" textAlign="center">
        {t('auth:screens.confirmRegistration.message', { email: params?.email })}
      </Typography>

      <Button LinkComponent={NavLink} href="/" variant="contained">
        {t('button.backToHomePage')}
      </Button>
    </Stack>
  )
}

export { ConfirmationEmailSentStep }
