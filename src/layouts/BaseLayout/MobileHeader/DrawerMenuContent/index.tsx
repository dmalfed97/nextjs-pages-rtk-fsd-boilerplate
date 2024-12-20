import type { FC } from 'react'
import React, { useMemo } from 'react'
import { Stack, Link, Typography } from '@mui/material'
import NavLink from 'next/link'
import { makeStyles } from 'tss-react/mui'
import { useRouter } from 'next/router'

import { LanguageDropdownSelector } from '~entities/language'

type NavBarItem = {
  key: string
  link: string
  text: string
}

type DrawerMenuContentProps = {
  onClose: () => void
}

const DrawerMenuContent: FC<DrawerMenuContentProps> = ({ onClose }) => {
  const router = useRouter()

  const { classes, cx } = useStyles()

  const menuItems = useMemo(
    (): NavBarItem[] => [
      {
        key: 'test',
        text: 'Test link',
        link: `/`,
      },
    ],
    []
  )

  // Renders
  return (
    <Stack className={classes.wrapper}>
      <Stack className={classes.menuItems} alignItems="center" gap={3}>
        {menuItems.map((menuItem) => (
          <Link
            component={NavLink}
            key={menuItem.key}
            href={{ pathname: menuItem.link }}
            className={cx(classes.link, {
              active: router.pathname?.includes(menuItem.link),
            })}
            onClick={onClose}
          >
            <Typography fontWeight={500} variant="h4">
              {menuItem.text}
            </Typography>
          </Link>
        ))}
      </Stack>

      <Stack alignItems="center" justifyContent="center" className={classes.langWrapper}>
        <LanguageDropdownSelector />
      </Stack>
    </Stack>
  )
}

const useStyles = makeStyles()((theme) => ({
  wrapper: {
    height: '100%',
  },
  menuItems: {
    padding: theme.spacing(3, 0),
    flexGrow: 1,
    borderBottom: `1px solid ${theme.palette.grey[100]}`,
  },
  link: {
    fontWeight: 900,
    '&.active': {},
  },
  langWrapper: {
    padding: theme.spacing(1, 0),
  },
}))

export { DrawerMenuContent }
