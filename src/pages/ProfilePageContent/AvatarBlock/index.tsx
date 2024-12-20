import { Skeleton, Stack } from '@mui/material'
import React, { type FC } from 'react'

import { UpdateCurrentUserAvatar } from '~features/currentUser/UpdateCurrentUserAvatar'
import { CurrentUserAvatar, currentUserSelectors } from '~entities/currentUser'
import { useMuiMediaQuery } from '~shared/hooks/useMediaQuery'

const AvatarBlock: FC = () => {
  const { isSM } = useMuiMediaQuery()

  const currentUser = currentUserSelectors.useCurrentUser()

  // Renders
  if (!currentUser) {
    return <Loader />
  }
  return (
    <Stack gap={2.5} width="100%" alignItems={isSM ? 'flex-start' : 'center'}>
      <CurrentUserAvatar />

      <UpdateCurrentUserAvatar />
    </Stack>
  )
}

const Loader: FC = () => {
  const { isSM } = useMuiMediaQuery()

  // Renders
  return (
    <Stack gap={2.5} width="100%" alignItems={isSM ? 'flex-start' : 'center'}>
      <Skeleton variant="circular" width={138} height={138} />
    </Stack>
  )
}

export { AvatarBlock }
