import { HttpApi, type BaseResponseWrapper } from '~shared/api/base'
// import { _buildParams } from '~shared/utils/_buildParams'
// import type { UniquenessResponse } from '~shared/types/uniquenessResponse'
import type { UploadFileResponse } from '~shared/types/uploadFileResponse'

import type { ChangeEmailDto, UpdateCurrentUserDto, UpdatePasswordDto } from '../dto'
import type { CurrentUserModel } from '../models'

// Query params
// export type CheckUsernameExistenceQueryParams = {
//   userName: string
// }

// Requests
const getCurrentUserQuery = () => {
  return HttpApi.get<BaseResponseWrapper<CurrentUserModel>>(`users/current`)
}

const updateCurrentUserQuery = (data: Partial<UpdateCurrentUserDto>) => {
  return HttpApi.patch<UpdateCurrentUserDto, BaseResponseWrapper<CurrentUserModel>>(
    `users/current`,
    data
  )
}

// const checkUserNameExistenceQuery = (params: CheckUsernameExistenceQueryParams) => {
//   return HttpApi.get<BaseResponseWrapper<UniquenessResponse>>(
//     `users/check-username-existence?${_buildParams(params)}`
//   )
// }

const updatePasswordQuery = (data: UpdatePasswordDto) => {
  return HttpApi.post<UpdatePasswordDto, BaseResponseWrapper>(`users/change-password`, data)
}

const changeCurrentUserAvatarQuery = (formData: FormData) => {
  return HttpApi.post<FormData, BaseResponseWrapper<UploadFileResponse>>(`images/upload`, formData)
}

const changeEmailQuery = (data: ChangeEmailDto) => {
  return HttpApi.post<ChangeEmailDto, BaseResponseWrapper>(`users/change-email`, data)
}

export const currentUserApi = {
  changeEmailQuery,
  changeCurrentUserAvatarQuery,
  updatePasswordQuery,
  // checkUserNameExistenceQuery,
  updateCurrentUserQuery,
  getCurrentUserQuery,
}
