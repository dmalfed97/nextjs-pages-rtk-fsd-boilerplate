import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { LoadingStatus, UploadingStatus } from '~shared/types/loadingStatus'
import Dto from '~shared/services/DtoService'

import { currentUserApi } from '../api'
import { UpdateCurrentUserDto, UpdatePasswordDto, ChangeEmailDto } from '../dto'
import type {
  UpdateCurrentUserFormValues,
  UpdatePasswordFormValues,
  ChangeEmailFormValues,
} from '../forms'
import type { CurrentUserModel } from '../models'

interface ICurrentUserSlice {
  currentUser: CurrentUserModel | null
  loadingStatus: LoadingStatus
  uploadingStatus: UploadingStatus
}

const initialState = (): ICurrentUserSlice => ({
  currentUser: null,
  loadingStatus: LoadingStatus.IDLE,
  uploadingStatus: UploadingStatus.IDLE,
})

export const getCurrentUserAction = createAsyncThunk('getCurrentUser', async () => {
  const response = await currentUserApi.getCurrentUserQuery()

  return {
    success: response.data.success,
    data: response.data.data,
  }
})

export const updateCurrentUserAction = createAsyncThunk(
  'updateCurrentUser',
  async (data: Partial<UpdateCurrentUserFormValues>) => {
    const dto = Dto.populate(UpdateCurrentUserDto, data)

    const response = await currentUserApi.updateCurrentUserQuery(dto)

    return {
      success: response.data.success,
      data: response.data.data,
    }
  }
)

export const updateCurrentUserAvatarAction = createAsyncThunk(
  'updateCurrentUserAvatar',
  async (data: FormData) => {
    const response = await currentUserApi.changeCurrentUserAvatarQuery(data)

    return {
      success: response.data.success,
      data: response.data.data,
    }
  }
)

export const updatePasswordAction = createAsyncThunk(
  'updatePassword',
  async (data: UpdatePasswordFormValues) => {
    const dto = Dto.populate(UpdatePasswordDto, data)

    const response = await currentUserApi.updatePasswordQuery(dto)

    return {
      success: response.data.success,
      data: response.data.data,
    }
  }
)

export const changeEmailAction = createAsyncThunk(
  'changeEmail',
  async (data: ChangeEmailFormValues) => {
    const dto = Dto.populate(ChangeEmailDto, data)

    const response = await currentUserApi.changeEmailQuery(dto)

    return {
      success: response.data.success,
      data: response.data.data,
    }
  }
)

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState: initialState(),
  reducers: {
    clearState: initialState,
  },
  extraReducers: (builder) => {
    builder
      // getCurrentUser
      .addCase(getCurrentUserAction.pending, (state) => {
        state.loadingStatus = LoadingStatus.FETCHING
      })
      .addCase(getCurrentUserAction.fulfilled, (state, { payload }) => {
        if (payload.success) {
          state.currentUser = payload.data
          state.loadingStatus = LoadingStatus.SUCCESS
        } else {
          state.loadingStatus = LoadingStatus.FAIL
        }
      })
      .addCase(getCurrentUserAction.rejected, (state) => {
        state.loadingStatus = LoadingStatus.FAIL
      })

      // updateCurrentUser
      .addCase(updateCurrentUserAction.pending, (state) => {
        state.uploadingStatus = UploadingStatus.UPLOADING
      })
      .addCase(updateCurrentUserAction.fulfilled, (state, { payload }) => {
        if (payload.success) {
          state.currentUser = payload.data
          state.uploadingStatus = UploadingStatus.SUCCESS
        } else {
          state.uploadingStatus = UploadingStatus.FAIL
        }
      })
      .addCase(updateCurrentUserAction.rejected, (state) => {
        state.uploadingStatus = UploadingStatus.FAIL
      })

      // updateCurrentUserAvatar
      .addCase(updateCurrentUserAvatarAction.pending, (state) => {
        state.uploadingStatus = UploadingStatus.UPLOADING
      })
      .addCase(updateCurrentUserAvatarAction.fulfilled, (state, { payload }) => {
        if (payload.success) {
          if (state.currentUser) {
            state.currentUser.avatar = `${payload.data.url}?${Date.now()}`
          }

          state.uploadingStatus = UploadingStatus.SUCCESS
        } else {
          state.uploadingStatus = UploadingStatus.FAIL
        }
      })
      .addCase(updateCurrentUserAvatarAction.rejected, (state) => {
        state.uploadingStatus = UploadingStatus.FAIL
      })

      // updatePassword
      .addCase(updatePasswordAction.pending, (state) => {
        state.uploadingStatus = UploadingStatus.UPLOADING
      })
      .addCase(updatePasswordAction.fulfilled, (state, { payload }) => {
        if (payload.success) {
          state.uploadingStatus = UploadingStatus.SUCCESS
        } else {
          state.uploadingStatus = UploadingStatus.FAIL
        }
      })
      .addCase(updatePasswordAction.rejected, (state) => {
        state.uploadingStatus = UploadingStatus.FAIL
      })

      // changeEmail
      .addCase(changeEmailAction.pending, (state) => {
        state.uploadingStatus = UploadingStatus.UPLOADING
      })
      .addCase(changeEmailAction.fulfilled, (state, { payload }) => {
        if (payload.success) {
          state.uploadingStatus = UploadingStatus.SUCCESS
        } else {
          state.uploadingStatus = UploadingStatus.FAIL
        }
      })
      .addCase(changeEmailAction.rejected, (state) => {
        state.uploadingStatus = UploadingStatus.FAIL
      })
  },
})

export const { clearState } = currentUserSlice.actions
