import { Button, CircularProgress, Stack, Typography } from '@mui/material'
import NavLink from 'next/link'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import React, { useEffect, type FC } from 'react'
import toast from 'react-hot-toast'

import { authStore, authSelectors } from '~entities/auth'
import { AuthLayout } from '~layouts/AuthLayout'
import useAppDispatch from '~shared/hooks/useAppDispatch'
import { UploadingStatus } from '~shared/types/loadingStatus'
import { AuthRoutesEnum } from '~shared/types/routesEnums'

const SignUpConfirmPageContent: FC = () => {
  const params = useParams<{ token: string }>()
  const router = useRouter()

  const { t } = useTranslation(['common', 'auth'])

  const dispatch = useAppDispatch()
  const confirmationStatus = authSelectors.useConfirmationStatus()

  // Effects
  useEffect(() => {
    if (params?.token) {
      dispatch(authStore.confirmRegistrationAction({ emailConfirmToken: params.token })).catch(
        () => {
          toast.error(t('auth:error.invalidConfirmationLink'))
        }
      )
    } else {
      toast.error(t('auth:error.invalidConfirmationLink'))

      void router.push(AuthRoutesEnum.SIGN_UP)
    }
  }, [dispatch, params, router, t])

  // Renders
  if (confirmationStatus !== UploadingStatus.SUCCESS) {
    return (
      <AuthLayout>
        <Stack width="100%" height={500} justifyContent="center" alignItems="center">
          <CircularProgress size={60} />
        </Stack>
      </AuthLayout>
    )
  }
  return (
    <AuthLayout>
      <Stack gap={4.5} alignItems="center">
        <Typography variant="h3">{t('auth:screens.registrationComplete.title')}</Typography>

        <Typography variant="body1" textAlign="center">
          {t('auth:screens.registrationComplete.message')}
        </Typography>

        <Button LinkComponent={NavLink} href="/" variant="contained">
          {t('button.backToHomePage')}
        </Button>
      </Stack>
    </AuthLayout>
  )
}

export { SignUpConfirmPageContent }
