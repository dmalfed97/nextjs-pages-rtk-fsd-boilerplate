import type { ReactElement } from 'react'
import React, { useCallback } from 'react'
import { IconButton } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import Image from 'next/image'
import type { IResolveParams, objectType } from 'reactjs-social-login'
import { LoginSocialApple } from 'reactjs-social-login'

import { AuthRoutesEnum } from '~shared/types/routesEnums'
// import useAppDispatch from '~shared/hooks/useAppDispatch'
// import {
//   AuthorizationService,
//   AuthorizationServiceScenarioEnum,
// } from '~shared/types/externalServices'
// import { authStore } from '~entities/auth'
import AppleIcon from '~public/icons/apple.svg'

interface GoogleSignInButtonProps {
  renderTrigger?: ReactElement
  onError?: (data?: string) => void
  onSuccess?: () => void
}

const AppleSignInButton = ({
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
          <Image src={AppleIcon} alt="google-login" />
        </IconButton>
      )
    )
  }, [renderTrigger, classes.icon])

  return (
    <LoginSocialApple
      client_id={process.env.NEXT_PUBLIC_APPLE_CLIENT_ID as string}
      scope="name email"
      redirect_uri={`${window.origin}${AuthRoutesEnum.LOGIN}`}
      onResolve={handleSuccessResponse}
      onReject={handleErrorResponse}
    >
      {triggerButton}
    </LoginSocialApple>
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

export { AppleSignInButton }
