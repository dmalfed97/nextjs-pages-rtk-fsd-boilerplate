import { MenuItem, Select, Stack, type SelectChangeEvent } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import React, { type FC } from 'react'
import { makeStyles } from 'tss-react/mui'

import { appConfig } from '~app/config'
import FlagRu from '~public/icons/flag-ru.svg'
import FlagUk from '~public/icons/flag-uk.svg'
import { LanguageEnum } from '~shared/types/language'

const LanguageDropdownSelector: FC = () => {
  const router = useRouter()

  const { i18n } = useTranslation()

  const { classes } = useStyles()

  const options = [
    {
      key: LanguageEnum.RU,
      text: 'RU',
      value: LanguageEnum.RU,
      image: FlagRu,
    },
    {
      key: LanguageEnum.EN_GB,
      text: 'EN',
      value: LanguageEnum.EN_GB,
      image: FlagUk,
    },
  ]

  // Handlers
  const onChange = (e: SelectChangeEvent<LanguageEnum>): void => {
    localStorage.setItem(appConfig.langStorageKey, e.target.value)

    void router.push(
      {
        pathname: router.pathname,
        query: router.query,
      },
      router.asPath,
      { locale: e.target.value }
    )
  }

  // Renders
  return (
    <Select<LanguageEnum>
      onChange={onChange}
      value={i18n.language as LanguageEnum}
      className={classes.select}
    >
      {options.map((option) => (
        <MenuItem key={option.key} value={option.value}>
          <Stack direction="row" gap={1} alignItems="center">
            <Image src={option.image} alt={option.text} />

            <span>{option.text}</span>
          </Stack>
        </MenuItem>
      ))}
    </Select>
  )
}

const useStyles = makeStyles()(() => ({
  select: {
    '&.MuiInputBase-root': {
      border: 'none',
    },
    '& > .MuiSelect-select': {
      padding: '8.5px 14px !important',
    },
    '& > .MuiSvgIcon-root': {
      display: 'none',
    },
    '& > .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
  },
}))

export { LanguageDropdownSelector }
