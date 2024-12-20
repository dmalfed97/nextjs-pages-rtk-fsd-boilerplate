import axios from 'axios'
import toast from 'react-hot-toast'
import { t } from 'i18next'
import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CreateAxiosDefaults,
} from 'axios'

import { appConfig } from '~app/config'

import type { LanguageEnum } from '../types/language'

export type BaseResponseWrapper<D = undefined> = {
  success: boolean
  message?: string
  data: D
}

const processApiErrors = (error: AxiosError<BaseResponseWrapper>): void => {
  if (error.response?.data.message) {
    toast.error(error.response.data.message)
  }
}

export class Http {
  private readonly instance: AxiosInstance
  private abortController
  public updateToken: () => Promise<boolean>

  readonly ver: {
    [key: keyof typeof appConfig.apiVersions.list]: {
      post<D, T = D>(
        url: string,
        data?: D,
        config?: AxiosRequestConfig<D>
      ): Promise<AxiosResponse<T>>
      get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>
      put<D, T = D>(
        url: string,
        data?: D,
        config?: AxiosRequestConfig<D>
      ): Promise<AxiosResponse<T>>
      patch<D, T = D>(
        url: string,
        data?: Partial<D>,
        config?: AxiosRequestConfig<D>
      ): Promise<AxiosResponse<T>>
      delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>
    }
  } = {}

  private baseApi = appConfig.apiUrl[process.env.NODE_ENV]

  constructor(config?: CreateAxiosDefaults) {
    this.abortController = new AbortController()

    let baseConfig: CreateAxiosDefaults = {
      baseURL: config?.baseURL || this.baseApi,
      signal: this.abortController.signal,
    }

    if (config) {
      baseConfig = {
        ...config,
        ...baseConfig,
        withCredentials: true,
        headers: {
          ...baseConfig.headers,
          ...config.headers,
          common: {
            ['Accept-Language']: appConfig.defaultLanguage,
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
        },
      }
    }

    this.instance = axios.create(baseConfig)

    // Mocked function for JWT update
    // eslint-disable-next-line @typescript-eslint/require-await
    this.updateToken = async () => {
      return false
    }

    this.instance.interceptors.request.use((request) => {
      request.headers['X-Timezone'] = Intl.DateTimeFormat().resolvedOptions().timeZone
      // request.headers['ngrok-skip-browser-warning'] = true

      return request
    })

    this.instance.interceptors.response.use(
      (response) => {
        return response
      },
      async (error: AxiosError<BaseResponseWrapper>) => {
        if (error.message === 'Network Error') {
          this.abortController.abort()
          toast.error(t('common:errors.api.serverUnavailable'))

          this.abortController = new AbortController()

          this.instance.defaults.signal = this.abortController.signal

          throw error
        }

        if (!error.config?.customHideToast) {
          processApiErrors(error)
        }

        if (error.status === 429) {
          toast.error(t('common:errors.api.429'))
        }
        if (error.status === 503) {
          toast.error(t('common:errors.api.503'))
        }

        const originalRequest = error.config

        if (error.status === 401) {
          if (
            error.response?.headers['is-token-expired'] &&
            originalRequest &&
            !originalRequest?.isRetry
          ) {
            const isRefreshed = await this.updateToken()

            if (isRefreshed) {
              originalRequest.headers['Authorization'] =
                this.instance.defaults.headers['Authorization']

              originalRequest.isRetry = true

              return this.instance.request(originalRequest)
            }
          }
        }

        throw error
      }
    )

    Object.entries(appConfig.apiVersions.list).forEach((version) => {
      this.ver[version[0]] = {
        post: <D, T = D>(url: string, data?: D, config?: AxiosRequestConfig<D>) => {
          return this.instance.post<T, AxiosResponse<T>>(`${version[1]}${url}`, data, config)
        },
        get: <T>(url: string, config?: AxiosRequestConfig) => {
          return this.instance.get<T, AxiosResponse<T>>(`${version[1]}${url}`, config)
        },
        put: <D, T = D>(url: string, data?: D, config?: AxiosRequestConfig<D>) => {
          return this.instance.put<T, AxiosResponse<T>>(`${version[1]}${url}`, data, config)
        },
        patch: <D, T = D>(
          url: string,
          data?: Partial<D>,
          config?: AxiosRequestConfig<Partial<D>>
        ) => {
          return this.instance.patch<T, AxiosResponse<T>>(`${version[1]}${url}`, data, config)
        },
        delete: <T>(url: string, config?: AxiosRequestConfig) => {
          return this.instance.delete<T, AxiosResponse<T>>(`${version[1]}${url}`, config)
        },
      }
    })
  }

  post<D, T = D>(url: string, data?: D, config?: AxiosRequestConfig<D>) {
    return this.instance.post<T, AxiosResponse<T>>(
      `${appConfig.apiVersions.default}${url}`,
      data,
      config
    )
  }

  get<T>(url: string, config?: AxiosRequestConfig) {
    return this.instance.get<T, AxiosResponse<T>>(`${appConfig.apiVersions.default}${url}`, config)
  }

  patch<D, T = D>(url: string, data?: Partial<D>, config?: AxiosRequestConfig<Partial<D>>) {
    return this.instance.patch<T, AxiosResponse<T>>(
      `${appConfig.apiVersions.default}${url}`,
      data,
      config
    )
  }

  put<D, T = D>(url: string, data?: D, config?: AxiosRequestConfig<D>) {
    return this.instance.put<T, AxiosResponse<T>>(
      `${appConfig.apiVersions.default}${url}`,
      data,
      config
    )
  }

  delete<T>(url: string, config?: AxiosRequestConfig) {
    return this.instance.delete<T, AxiosResponse<T>>(
      `${appConfig.apiVersions.default}${url}`,
      config
    )
  }

  setAccessToken = (token: string | null) => {
    if (token) {
      this.instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
      this.instance.defaults.headers.common['Authorization'] = undefined
    }
  }

  setLanguage = (lang: LanguageEnum) => {
    this.instance.defaults.headers.common['Accept-Language'] = lang
  }
}

export const HttpApi = new Http()
