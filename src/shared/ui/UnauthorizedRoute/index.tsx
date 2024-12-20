import type { ReactElement } from 'react'
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { CircularProgress, Stack } from '@mui/material'

import { useAuthContext } from '~app/providers/Auth'

interface AuthorizedRouteProps {
  children: ReactElement
}

const UnauthorizedRoute = ({ children }: AuthorizedRouteProps): ReactElement => {
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
