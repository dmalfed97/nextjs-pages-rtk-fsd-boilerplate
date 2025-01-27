import { Stack, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import React, { type FC } from 'react'

import { RestorePasswordForm } from '~widgets/RestorePasswordForm'

interface ChangePasswordFormStepProps {
  submitFormCallback: () => void
}

const ChangePasswordFormStep: FC<ChangePasswordFormStepProps> = ({ submitFormCallback }) => {
  const { t } = useTranslation(['common', 'auth'])

  // Renders
  return (
    <Stack gap={4}>
      <Typography variant="h3" textAlign="center">
        {t('auth:screens.changePassword.title')}
      </Typography>

      <RestorePasswordForm onSuccess={submitFormCallback} />
    </Stack>
  )
}

export { ChangePasswordFormStep }
