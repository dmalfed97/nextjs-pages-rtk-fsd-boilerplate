import 'axios'

declare module 'axios' {
  interface AxiosRequestConfig extends OriginalAxiosRequestConfig {
    customHideToast?: boolean
    isRetry?: boolean
  }
}
