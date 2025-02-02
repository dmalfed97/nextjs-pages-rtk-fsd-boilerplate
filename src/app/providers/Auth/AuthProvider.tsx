import type { PropsWithChildren, ReactElement } from 'react'
import React, { memo, useEffect, useState, useInsertionEffect } from 'react'
import { useTranslation } from 'next-i18next'

import { authStore, authSelectors } from '~entities/auth'
import { currentUserStore } from '~entities/currentUser'
import { HttpApi } from '~shared/api/base'
import useAppDispatch from '~shared/hooks/useAppDispatch'
import { UploadingStatus } from '~shared/types/loadingStatus'
import { ONE_MINUTE, ONE_SECOND } from '~shared/utils/intervals'
import { type LanguageEnum } from '~shared/types/language'

import { AuthContext } from './AuthContext'
import { appConfig } from '../../config'

const AuthProviderInner = ({ children }: PropsWithChildren): ReactElement => {
  const { t, i18n } = useTranslation('common')

  const dispatch = useAppDispatch()
  const accessToken = authSelectors.useAccessToken()
  const expiresAt = authSelectors.useAccessTokenExpiresAt()
  const uploadingStatus = authSelectors.useUploadingStatus()

  const [isInitialized, setIsInitialized] = useState<boolean>(false)

  // Effects
  // Fired on initialization. Everytime we receive a new JWT pair
  useEffect(() => {
    if (uploadingStatus === UploadingStatus.IDLE) {
      if (localStorage[appConfig.refreshTokenStorageKey]) {
        dispatch(authStore.refreshTokensAction())
          .catch(() => {})
          .finally(() => {
            setIsInitialized(true)
          })
      } else {
        dispatch(authStore.setUploadingStatus(UploadingStatus.FAIL))

        setIsInitialized(true)
      }
    }
  }, [dispatch, t, uploadingStatus])

  useEffect(() => {
    // The token has already completely expired - delete the current accessToken
    const interval = setInterval(() => {
      if (expiresAt && expiresAt * ONE_SECOND <= new Date().getTime()) {
        dispatch(authStore.clearState())
      }
    }, appConfig.refreshTokenRefreshRate)

    // The access token has expired - we are trying to get a new pair of tokens
    const timeout = setTimeout(
      () => {
        if (Number(expiresAt) * ONE_SECOND > new Date().getTime()) {
          void dispatch(authStore.refreshTokensAction())
        }
      },
      Math.max(
        0,
        Number(expiresAt) * ONE_SECOND - new Date().getTime() - ONE_MINUTE,
        appConfig.refreshTokenRefreshThreshold * ONE_MINUTE
      )
    )

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [dispatch, expiresAt])

  // Here, during initialization, we send a function to the local API service to update the token when getting 401
  useEffect(() => {
    HttpApi.updateToken = () =>
      dispatch(authStore.refreshTokensAction())
        .then(({ payload }) => {
          return (payload as { success: boolean }).success
        })
        .catch(() => {
          return false
        })
  }, [dispatch])

  useEffect(() => {
    HttpApi.setAccessToken(accessToken)

    if (accessToken) {
      void dispatch(currentUserStore.getCurrentUserAction())
    }
  }, [accessToken, dispatch])

  useInsertionEffect(() => {
    HttpApi.setLanguage(i18n.language as LanguageEnum)
  }, [i18n.language])

  // Renders
  return (
    <AuthContext.Provider
      value={{
        isAuthorized: !!accessToken,
        isInitialized,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const AuthProvider = memo(AuthProviderInner)
