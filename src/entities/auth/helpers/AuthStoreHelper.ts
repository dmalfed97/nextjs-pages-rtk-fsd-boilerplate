import type { AxiosResponse } from 'axios'

import { parseJWTData } from '~shared/utils/parseJWTData'
import type { BaseResponseWrapper } from '~shared/api/base'

import type { TokensModel } from '../models'

export class AuthStoreHelper {
  static prepareDataForTokensUpdateAction = (
    response: AxiosResponse<BaseResponseWrapper<TokensModel>>
  ) => {
    const { refreshToken, accessToken } = response.data.data

    if (accessToken && refreshToken) {
      return {
        success: response.data.success,
        data: {
          refreshToken,
          accessToken,
          expiresAt: Number(parseJWTData(accessToken).exp),
        },
      }
    } else {
      return {
        success: response.data.success,
        data: {
          refreshToken: null,
          accessToken: null,
          expiresAt: null,
        },
      }
    }
  }
}
