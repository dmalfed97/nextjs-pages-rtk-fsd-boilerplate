import { IconButton } from '@mui/material'
import Image from 'next/image'
import React, { useCallback, type ReactElement, type FC } from 'react'
import { LoginSocialApple, type IResolveParams, type objectType } from 'reactjs-social-login'
import { makeStyles } from 'tss-react/mui'

// import useAppDispatch from '~shared/hooks/useAppDispatch'
// import {
//   AuthorizationService,
//   AuthorizationServiceScenarioEnum,
// } from '~shared/types/externalServices'
// import { authStore } from '~entities/auth'
import AppleIcon from '~public/icons/apple.svg'
import { AuthRoutesEnum } from '~shared/types/routesEnums'

interface GoogleSignInButtonProps {
  renderTrigger?: ReactElement
  onError?: (data?: string) => void
  onSuccess?: () => void
}

const AppleSignInButton: FC<GoogleSignInButtonProps> = ({ onError, onSuccess, renderTrigger }) => {
  const { classes } = useStyles()

  // const dispatch = useAppDispatch()

  // Handlers
  const handleSuccessResponse = useCallback(
    (response: IResolveParams): void => {
      // TODO
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
