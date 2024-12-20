import { HttpApi, type BaseResponseWrapper } from '~shared/api/base'

import type {
  RestorePasswordDto,
  LoginDto,
  LogoutDto,
  RefreshTokensDto,
  RegistrationDto,
  RestorePasswordRequestDto,
} from '../dto'
import type { /*SessionModel,*/ TokensModel } from '../models'

// Payloads
export type ConfirmRegistrationQueryPayload = {
  emailConfirmToken: string
}

// Requests
const refreshTokensQuery = (data: RefreshTokensDto) => {
  return HttpApi.post<RefreshTokensDto, BaseResponseWrapper<TokensModel>>(
    'auth/refresh-tokens',
    data,
    {
      headers: {
        ['Authorization']: undefined,
      },
    }
  )
}

const loginQuery = (data: LoginDto) => {
  return HttpApi.post<LoginDto, BaseResponseWrapper<TokensModel>>('auth/login', data)
}

const logoutQuery = (data: LogoutDto) => {
  return HttpApi.post<LogoutDto, BaseResponseWrapper>('auth/logout', data)
}

/* Сессии */
const logoutAllSessionsQuery = (data: LogoutDto) => {
  return HttpApi.post<LogoutDto, BaseResponseWrapper>('auth/logout-all', data)
}

// export const getSessionsQuery = () => {
//   return HttpApi.get<BaseResponseWrapper<SessionModel[]>>(`auth/sessions`)
// }

/* Регистрация */
const registerQuery = (data: RegistrationDto) => {
  return HttpApi.post<RegistrationDto, BaseResponseWrapper<TokensModel>>('register', data)
}

const confirmRegistrationQuery = (data: ConfirmRegistrationQueryPayload) => {
  return HttpApi.post<ConfirmRegistrationQueryPayload, BaseResponseWrapper>(
    `users/confirm-registration`,
    data
  )
}

/* Сброс пароля */
const sendResetPasswordEmailQuery = (data: RestorePasswordRequestDto) => {
  return HttpApi.post<RestorePasswordRequestDto, BaseResponseWrapper>(
    `users/send-reset-password-email`,
    data
  )
}

const resetPasswordQuery = (data: RestorePasswordDto) => {
  return HttpApi.post<RestorePasswordDto, BaseResponseWrapper>(`users/reset-password`, data)
}

export const authApi = {
  resetPasswordQuery,
  sendResetPasswordEmailQuery,
  registerQuery,
  confirmRegistrationQuery,
  // getSessionsQuery,
  logoutAllSessionsQuery,
  logoutQuery,
  loginQuery,
  refreshTokensQuery,
}
