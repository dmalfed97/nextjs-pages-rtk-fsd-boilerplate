import { LanguageEnum } from '~shared/types/language'
import type { ILang } from '~shared/types/language'

export const appConfig = {
  apiUrl: {
    development: process.env.NEXT_PUBLIC_DEV_API_URL,
    production: process.env.NEXT_PUBLIC_PROD_API_URL,
    test: process.env.NEXT_PUBLIC_DEV_API_URL,
  } as Record<typeof process.env.NODE_ENV, string>,

  apiVersions: {
    default: '/',
    list: {} as Record<string, string>,
  },

  // Auth
  refreshTokenStorageKey: '_RefreshToken', // _[projectName][TokenType]Token
  refreshTokenRefreshRate: 1000, // In ms
  refreshTokenRefreshThreshold: 15, // In minutes

  // i18n
  langStorageKey: '_Lang', // _[projectName]Lang
  defaultLanguage: LanguageEnum.EN_GB,
  languages: [
    { title: 'Русский', lang: LanguageEnum.RU },
    { title: 'English', lang: LanguageEnum.EN_GB },
  ] as ILang[],
}
