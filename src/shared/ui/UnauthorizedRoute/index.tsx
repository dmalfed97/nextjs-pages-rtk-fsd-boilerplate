import { CircularProgress, Stack } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useEffect, type FC, type PropsWithChildren } from 'react'

import { useAuthContext } from '~app/providers/Auth'

const UnauthorizedRoute: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter()

  const { isAuthorized } = useAuthContext()

  useEffect(() => {
    if (isAuthorized) {
      void router.push('/')
    }
  }, [isAuthorized, router])

  if (isAuthorized) {
    return (
      <Stack alignItems="center" justifyContent="center">
        <CircularProgress />
      </Stack>
    )
  }
  return children
}

export { UnauthorizedRoute }
