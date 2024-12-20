import type { ReactElement } from 'react'
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { CircularProgress, Stack } from '@mui/material'

import { useAuthContext } from '~app/providers/Auth'

interface AuthorizedRouteProps {
  children: ReactElement
}

const AuthorizedRoute = ({ children }: AuthorizedRouteProps): ReactElement => {
  const router = useRouter()

  const { isAuthorized, isInitialized } = useAuthContext()

  useEffect(() => {
    if (!isAuthorized && isInitialized && typeof window !== 'undefined') {
      void router.push('/')
    }
  }, [isAuthorized, router, isInitialized])

  if (!isAuthorized) {
    return (
      <Stack alignItems="center" justifyContent="center">
        <CircularProgress />
      </Stack>
    )
  }
  return children
}

export { AuthorizedRoute }
