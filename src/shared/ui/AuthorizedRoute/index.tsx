import { CircularProgress, Stack } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useEffect, type FC, type PropsWithChildren } from 'react'

import { useAuthContext } from '~app/providers/Auth'

const AuthorizedRoute: FC<PropsWithChildren> = ({ children }) => {
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
