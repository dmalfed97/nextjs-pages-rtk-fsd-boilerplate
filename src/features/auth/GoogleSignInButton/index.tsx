import type { ReactElement } from 'react'
import React, { useCallback } from 'react'
import { makeStyles } from 'tss-react/mui'
import { IconButton } from '@mui/material'
import Image from 'next/image'
import type { IResolveParams, objectType } from 'reactjs-social-login'
import { LoginSocialGoogle } from 'reactjs-social-login'

// import useAppDispatch from '~shared/hooks/useAppDispatch'
// import {
//   AuthorizationService,
//   AuthorizationServiceScenarioEnum,
// } from '~shared/types/externalServices'
// import { authStore } from '~entities/auth'
import GoogleIcon from '~public/icons/google.svg'

interface GoogleSignInButtonProps {
  renderTrigger?: ReactElement
  onError?: (data?: string) => void
  onSuccess?: () => void
}

const GoogleSignInButton = ({
  onError,
  onSuccess,
  renderTrigger,
}: GoogleSignInButtonProps): ReactElement => {
  const { classes } = useStyles()

  // const dispatch = useAppDispatch()

  // Handlers
  const handleSuccessResponse = useCallback(
    (response: IResolveParams): void => {
      // FIXME
      if (response.data?.access_token) {
        onSuccess?.()
      }
    },
    [onSuccess]
  )

  const handleErrorResponse = useCallback(
    (error: string | objectType): void => {
      onError?.(error as string)
    },
    [onError]
  )

  // Renders
  const triggerButton = React.useMemo(() => {
    return (
      renderTrigger || (
        <IconButton className={classes.icon}>
          <Image src={GoogleIcon} alt="google-login" />
        </IconButton>
      )
    )
  }, [renderTrigger, classes.icon])

  return (
    <LoginSocialGoogle
      client_id={process.env.NEXT_PUBLIC_GOOGLE_OAUTH_ID as string}
      onResolve={handleSuccessResponse}
      onReject={handleErrorResponse}
    >
      {triggerButton}
    </LoginSocialGoogle>
  )
}

const useStyles = makeStyles()(() => ({
  icon: {
    flexShrink: 0,
    padding: 0,
    height: 32,
    width: 32,
  },
}))

export { GoogleSignInButton }
