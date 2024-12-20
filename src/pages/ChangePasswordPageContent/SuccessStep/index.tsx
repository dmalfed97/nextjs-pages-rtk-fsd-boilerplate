import React, { type FC } from 'react'
import { Button, Stack, Typography } from '@mui/material'
import NavLink from 'next/link'
import { useTranslation } from 'next-i18next'

const SuccessStep: FC = () => {
  const { t } = useTranslation(['common', 'auth'])

  // Renders
  return (
    <Stack gap={4.5} alignItems="center">
      <Typography variant="h3">{t('auth:confirmRegistration.title')}</Typography>

      <Button LinkComponent={NavLink} href="/" variant="contained">
        {t('button.backToHomePage')}
      </Button>
    </Stack>
  )
}

export { SuccessStep }
