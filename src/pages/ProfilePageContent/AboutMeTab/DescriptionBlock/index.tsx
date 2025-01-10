import { Skeleton, Stack, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import React, { type FC } from 'react'

import { currentUserSelectors } from '~entities/currentUser'

const DescriptionBlock: FC = () => {
  const { t } = useTranslation(['common', 'profile'])

  const currentUser = currentUserSelectors.useCurrentUser()

  // Renders
  if (!currentUser) {
    return <Loader />
  }

  const { description } = currentUser

  return (
    <Stack alignItems="flex-start" gap={2}>
      <Stack alignItems="flex-start" gap={2}>
        <Typography variant="h4">{t('profile:block.description.title')}</Typography>

        {!description && (
          <Typography color="textSecondary" variant="body1">
            {t('profile:block.description.message')}
          </Typography>
        )}
      </Stack>
    </Stack>
  )
}

const Loader: FC = () => (
  <Stack gap={1}>
    <Skeleton variant="rounded" width={200} height={20} />

    <Skeleton variant="rounded" height={16} />

    <Skeleton variant="rounded" height={16} />

    <Skeleton variant="rounded" height={16} />

    <Skeleton variant="rounded" width={110} height={16} />
  </Stack>
)

export { DescriptionBlock }
