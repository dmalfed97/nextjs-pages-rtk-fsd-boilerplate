import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { appConfig } from '~app/config'
import Dto from '~shared/services/DtoService'
import { UploadingStatus } from '~shared/types/loadingStatus'
import { getFingerprint } from '~shared/utils/getFingerprint'

import { type ConfirmRegistrationQueryPayload, authApi } from '../api'
import {
  RestorePasswordDto,
  LoginDto,
  LogoutDto,
  RefreshTokensDto,
  RegistrationDto,
  RestorePasswordRequestDto,
} from '../dto'
import type {
  RestorePasswordFormValues,
  LoginFormValues,
  RegistrationFormValues,
  RestorePasswordRequestFormValues,
} from '../forms'
import { AuthStoreHelper } from '../helpers'

interface IAuthSlice {
  uploadingStatus: UploadingStatus
  confirmationStatus: UploadingStatus
  data: {
    accessToken: string | null
    expiresAt: number | null
  }
}

const initialState = (): IAuthSlice => ({
  uploadingStatus: UploadingStatus.IDLE,
  confirmationStatus: UploadingStatus.IDLE,
  data: {
    accessToken: null,
    expiresAt: null,
  },
})

export const loginAction = createAsyncThunk('login', async (data: LoginFormValues) => {
  const fingerprint = await getFingerprint()

  const dto = Dto.populate(LoginDto, { ...data, fingerprint: fingerprint.visitorId })

  const response = await authApi.loginQuery(dto)

  return AuthStoreHelper.prepareDataForTokensUpdateAction(response)
})

export const registerAction = createAsyncThunk('register', async (data: RegistrationFormValues) => {
  const fingerprint = await getFingerprint()

  const dto = Dto.populate(RegistrationDto, { ...data, fingerprint: fingerprint.visitorId })

  const response = await authApi.registerQuery(dto)

  return AuthStoreHelper.prepareDataForTokensUpdateAction(response)
})

export const confirmRegistrationAction = createAsyncThunk(
  'confirmRegistration',
  async (data: ConfirmRegistrationQueryPayload) => {
    return await authApi.confirmRegistrationQuery(data)
  }
)

export const refreshTokensAction = createAsyncThunk('refreshTokens', async () => {
  const fingerprint = await getFingerprint()

  const dto = Dto.populate(RefreshTokensDto, {
    fingerprint: fingerprint.visitorId,
    refreshToken: localStorage[appConfig.refreshTokenStorageKey] || null,
  })

  const response = await authApi.refreshTokensQuery(dto)

  return AuthStoreHelper.prepareDataForTokensUpdateAction(response)
})

export const logoutAction = createAsyncThunk('logout', async () => {
  const refreshToken = localStorage[appConfig.refreshTokenStorageKey]

  const dto = Dto.populate(LogoutDto, { refreshToken })

  await authApi.logoutQuery(dto)
})

export const logoutAllSessionsAction = createAsyncThunk('logoutAllSessions', async () => {
  const refreshToken = localStorage[appConfig.refreshTokenStorageKey]

  const dto = Dto.populate(LogoutDto, { refreshToken })

  await authApi.logoutAllSessionsQuery(dto)
})

export const sendResetPasswordEmailAction = createAsyncThunk(
  'sendResetPasswordEmail',
  async (data: RestorePasswordRequestFormValues) => {
    const dto = Dto.populate(RestorePasswordRequestDto, data)

    return await authApi.sendResetPasswordEmailQuery(dto)
  }
)

export const resetPasswordAction = createAsyncThunk(
  'resetPassword',
  async (data: RestorePasswordFormValues) => {
    const dto = Dto.populate(RestorePasswordDto, data)

    return await authApi.resetPasswordQuery(dto)
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUploadingStatus: (state, { payload }: PayloadAction<UploadingStatus>) => {
      state.uploadingStatus = payload
    },
    clearState: () => ({
      uploadingStatus: UploadingStatus.IDLE,
      confirmationStatus: UploadingStatus.IDLE,
      data: {
        accessToken: null,
        expiresAt: null,
      },
    }),
  },
  extraReducers: (builder) => {
    builder
      // loginAsync
      .addCase(loginAction.pending, (state) => {
        state.uploadingStatus = UploadingStatus.UPLOADING
      })
      .addCase(loginAction.fulfilled, (state, { payload }) => {
        if (payload.success) {
          if (payload.data.refreshToken) {
            localStorage.setItem(appConfig.refreshTokenStorageKey, payload.data.refreshToken)
          }

          state.data = {
            accessToken: payload.data.accessToken,
            expiresAt: payload.data.expiresAt,
          }
          state.uploadingStatus = UploadingStatus.SUCCESS
        } else {
          state.data = {
            accessToken: null,
            expiresAt: null,
          }
          state.uploadingStatus = UploadingStatus.FAIL
        }
      })
      .addCase(loginAction.rejected, (state) => {
        state.data = {
          accessToken: null,
          expiresAt: null,
        }
        state.uploadingStatus = UploadingStatus.FAIL
      })

      // registerAsync
      .addCase(registerAction.pending, (state) => {
        state.uploadingStatus = UploadingStatus.UPLOADING
      })
      .addCase(registerAction.fulfilled, (state, { payload }) => {
        if (payload.success) {
          if (payload.data.refreshToken) {
            localStorage.setItem(appConfig.refreshTokenStorageKey, payload.data.refreshToken)
          }

          state.data = {
            accessToken: payload.data.accessToken,
            expiresAt: payload.data.expiresAt,
          }
          state.uploadingStatus = UploadingStatus.SUCCESS
        } else {
          state.data = {
            accessToken: null,
            expiresAt: null,
          }
          state.uploadingStatus = UploadingStatus.FAIL
        }
      })
      .addCase(registerAction.rejected, (state) => {
        state.data = {
          accessToken: null,
          expiresAt: null,
        }
        state.uploadingStatus = UploadingStatus.FAIL
      })

      // confirmRegistrationAsync
      .addCase(confirmRegistrationAction.pending, (state) => {
        state.confirmationStatus = UploadingStatus.UPLOADING
      })
      .addCase(confirmRegistrationAction.fulfilled, (state) => {
        state.confirmationStatus = UploadingStatus.SUCCESS
      })
      .addCase(confirmRegistrationAction.rejected, (state) => {
        state.confirmationStatus = UploadingStatus.FAIL
      })

      // refreshTokensAsync
      .addCase(refreshTokensAction.pending, (state) => {
        state.uploadingStatus = UploadingStatus.UPLOADING
      })
      .addCase(refreshTokensAction.fulfilled, (state, { payload }) => {
        if (payload.success && payload.data.refreshToken) {
          localStorage.setItem(appConfig.refreshTokenStorageKey, payload.data.refreshToken)

          state.data = {
            accessToken: payload.data.accessToken,
            expiresAt: payload.data.expiresAt,
          }
          state.uploadingStatus = UploadingStatus.SUCCESS
        } else {
          localStorage.removeItem(appConfig.refreshTokenStorageKey)
          state.data = {
            accessToken: null,
            expiresAt: null,
          }
          state.uploadingStatus = UploadingStatus.FAIL
        }
      })
      .addCase(refreshTokensAction.rejected, (state) => {
        localStorage.removeItem(appConfig.refreshTokenStorageKey)

        state.data = {
          accessToken: null,
          expiresAt: null,
        }
        state.uploadingStatus = UploadingStatus.FAIL
      })

      // logoutAsync
      .addCase(logoutAction.fulfilled, (state) => {
        localStorage.clear()
        state.data = initialState().data
        state.uploadingStatus = UploadingStatus.IDLE
      })

      // logoutAllSessionsAsync
      .addCase(logoutAllSessionsAction.fulfilled, (state) => {
        localStorage.clear()
        state.data = initialState().data
        state.uploadingStatus = UploadingStatus.IDLE
      })

      // sendResetPasswordEmailAsync
      .addCase(sendResetPasswordEmailAction.pending, (state) => {
        state.uploadingStatus = UploadingStatus.UPLOADING
      })
      .addCase(sendResetPasswordEmailAction.fulfilled, (state) => {
        state.uploadingStatus = UploadingStatus.SUCCESS
      })
      .addCase(sendResetPasswordEmailAction.rejected, (state) => {
        state.uploadingStatus = UploadingStatus.FAIL
      })

      // resetPasswordAsync
      .addCase(resetPasswordAction.pending, (state) => {
        state.uploadingStatus = UploadingStatus.UPLOADING
      })
      .addCase(resetPasswordAction.fulfilled, (state) => {
        state.uploadingStatus = UploadingStatus.SUCCESS
      })
      .addCase(resetPasswordAction.rejected, (state) => {
        state.uploadingStatus = UploadingStatus.FAIL
      })
  },
})

export const { setUploadingStatus, clearState } = authSlice.actions
