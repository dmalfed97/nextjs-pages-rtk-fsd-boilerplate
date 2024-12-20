import type { ReactElement } from 'react'
import React, { useCallback } from 'react'
import { makeStyles } from 'tss-react/mui'
import { IconButton } from '@mui/material'
import Image from 'next/image'
import type { IResolveParams, objectType } from 'reactjs-social-login'
import { LoginSocialFacebook } from 'reactjs-social-login'

import { AuthRoutesEnum } from '~shared/types/routesEnums'
// import useAppDispatch from '~shared/hooks/useAppDispatch'
// import {
//   AuthorizationService,
//   AuthorizationServiceScenarioEnum,
// } from '~shared/types/externalServices'
// import { authStore } from '~entities/auth'
import FacebookIcon from '~public/icons/facebook.svg'

interface FacebookSignInButtonProps {
  renderTrigger?: ReactElement
  onError?: (data?: string) => void
  onSuccess?: () => void
}

const FacebookSignInButton = ({
  onError,
  onSuccess,
  renderTrigger,
}: FacebookSignInButtonProps): ReactElement => {
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
          <Image src={FacebookIcon} alt="google-login" />
        </IconButton>
      )
    )
  }, [renderTrigger, classes.icon])

  return (
    <LoginSocialFacebook
      appId={process.env.NEXT_PUBLIC_FACEBOOK_APP_ID as string}
      redirect_uri={`${window.origin}${AuthRoutesEnum.LOGIN}`}
      onResolve={handleSuccessResponse}
      onReject={handleErrorResponse}
    >
      {triggerButton}
    </LoginSocialFacebook>
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

export { FacebookSignInButton }
