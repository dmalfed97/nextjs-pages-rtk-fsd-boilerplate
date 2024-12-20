import { Skeleton, Stack, Typography } from '@mui/material'
import React from 'react'
import type { FC } from 'react'

import { CurrentUserHelper, currentUserSelectors } from '~entities/currentUser'
import { useMuiMediaQuery } from '~shared/hooks/useMediaQuery'

const UserNameBlock: FC = () => {
  const { isSM } = useMuiMediaQuery()

  const currentUser = currentUserSelectors.useCurrentUser()

  // Renders
  if (!currentUser) {
    return <Loader />
  }
  return (
    <Stack gap={2} alignItems={isSM ? 'flex-start' : 'stretch'}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent={isSM ? 'flex-start' : 'center'}
        gap={2}
      >
        <Typography variant="h2">{CurrentUserHelper.getCurrentUserName(currentUser)}</Typography>
      </Stack>
    </Stack>
  )
}

const Loader: FC = () => {
  const { isSM } = useMuiMediaQuery()

  // Renders
  return (
    <Stack gap={2} alignItems={isSM ? 'flex-start' : 'stretch'}>
      <Skeleton variant="rounded" width={300} height={40} />
    </Stack>
  )
}

export { UserNameBlock }
