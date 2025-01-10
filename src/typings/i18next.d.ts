import type { CustomInstanceExtensions } from 'i18next'

import type { TranslationResources } from '~public/locales/en-GB'
import type { LanguageEnum } from '~shared/types/language'

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: TranslationResources
    defaultNS: keyof TranslationResources | (keyof TranslationResources)[]
  }

  interface i18n extends CustomInstanceExtensions {
    language: LanguageEnum
  }
}

declare module 'next-i18next' {
  import type { DefaultNamespace, TFunctionNonStrict } from 'i18next'

  export type CustomTFunction<NS extends DefaultNamespace> = TFunctionNonStrict<NS, undefined>
}
