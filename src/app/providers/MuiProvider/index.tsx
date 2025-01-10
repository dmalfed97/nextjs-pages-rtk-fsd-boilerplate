import { createTheme, ThemeProvider, type Theme } from '@mui/material'
import { LocalizationProvider, type PickersLocaleText } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import type { Locale } from 'date-fns'
import { useTranslation } from 'next-i18next'
import React, { useState, useEffect, type PropsWithChildren, type FC } from 'react'

import { LanguageEnum } from '~shared/types/language'

import { theme as baseTheme } from '../../styles/muiTheme'

type LocalesObj = {
  adapterLocale: Locale
  localeText?: Partial<PickersLocaleText<Date>>
  theme: Theme
}

const defaultLocale: LocalesObj = {
  adapterLocale: undefined!, // will be replaced on client-side
  localeText: undefined,
  theme: baseTheme,
}

const MuiProvider: FC<PropsWithChildren> = ({ children }) => {
  const { i18n } = useTranslation()
  const [currentLocale, setCurrentLocale] = useState<LocalesObj>(defaultLocale)

  useEffect(() => {
    const loadLocaleData = async () => {
      let adapterLocale: Locale
      let localeText: Partial<PickersLocaleText<Date>> | undefined
      let selectedTheme: Theme

      switch (i18n.language) {
        case LanguageEnum.RU: {
          const ruLocale = await import('date-fns/locale/ru')
          const { ruRU: ruRULocaleText } = await import('@mui/x-date-pickers/locales')
          const { ruRU: ruRUMuiLocale } = await import('@mui/material/locale')

          adapterLocale = ruLocale.ru
          localeText = ruRULocaleText.components.MuiLocalizationProvider.defaultProps.localeText
          selectedTheme = createTheme({ ...baseTheme }, ruRUMuiLocale)
          break
        }
        default: {
          const enLocale = await import('date-fns/locale/en-GB')

          adapterLocale = enLocale.enGB
          localeText = undefined
          selectedTheme = baseTheme
          break
        }
      }

      setCurrentLocale({
        adapterLocale,
        localeText,
        theme: selectedTheme,
      })
    }

    void loadLocaleData()
  }, [i18n.language])

  return (
    <ThemeProvider theme={currentLocale.theme}>
      <LocalizationProvider
        dateAdapter={AdapterDateFns}
        adapterLocale={currentLocale.adapterLocale}
        localeText={currentLocale.localeText}
      >
        {children}
      </LocalizationProvider>
    </ThemeProvider>
  )
}

export { MuiProvider }
