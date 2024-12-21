import { Button, Stack, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import React, { type FC } from 'react'

import { UpdatePassword } from '~features/currentUser/ChangePassword'
import { currentUserSelectors } from '~entities/currentUser'

const EmailOrPasswordTab: FC = () => {
  const { t } = useTranslation('common')

  const currentUser = currentUserSelectors.useCurrentUser()

  // Renders
  return (
    <Stack gap={4}>
      <Stack gap={1.5} alignItems="flex-start">
        <Typography variant="h4">{t('input.email.label')}</Typography>

        <Typography variant="body1">{currentUser?.email}</Typography>
      </Stack>

      <Stack gap={1.5} alignItems="flex-start">
        <Typography variant="h4">{t('input.password.label')}</Typography>

        <UpdatePassword
          renderTrigger={(onClick) => (
            <Button variant="outlined" onClick={onClick}>
              {t('button.changePassword')}
            </Button>
          )}
        />
      </Stack>
    </Stack>
  )
}

export { EmailOrPasswordTab }
