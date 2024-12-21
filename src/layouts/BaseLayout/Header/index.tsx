import { AppBar, Toolbar, Stack, Button, Link, Skeleton } from '@mui/material'
import Image from 'next/image'
import NavLink from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import React, { useMemo, type FC } from 'react'
import { makeStyles } from 'tss-react/mui'

import { useAuthContext } from '~app/providers/Auth'
import { LanguageDropdownSelector } from '~entities/language'
import { useMuiMediaQuery } from '~shared/hooks/useMediaQuery'
import { AuthRoutesEnum } from '~shared/types/routesEnums'
import { ProfileHeaderDropdown } from '~widgets/ProfileHeaderDropdown'

type NavBarItem = {
  key: string
  link: string
  text: string
}

const Header: FC = () => {
  const router = useRouter()

  const { t } = useTranslation('common')

  const { isAuthorized, isInitialized } = useAuthContext()

  const { isXL } = useMuiMediaQuery()
  const { classes, cx } = useStyles()

  // Memoized values
  const menuItems = useMemo(
    (): NavBarItem[] => [
      {
        key: 'test',
        text: 'Test nav link',
        link: `/`,
      },
    ],
    []
  )

  // Renders
  return (
    <AppBar position="static" className={classes.header}>
      <Toolbar className={classes.toolbar}>
        <Stack
          direction="row"
          alignItems="center"
          gap={isXL ? 8 : 6}
          justifyContent="space-between"
        >
          <NavLink href={{ pathname: '/' }}>
            <Image src="" alt="main logo" />
          </NavLink>

          <Stack component="nav" direction="row" gap={isXL ? 4 : 3}>
            {menuItems.map((menuItem) => (
              <Link
                component={NavLink}
                key={menuItem.key}
                href={{ pathname: menuItem.link }}
                className={cx(classes.link, {
                  active: router.pathname?.includes(menuItem.link),
                })}
              >
                {menuItem.text}
              </Link>
            ))}
          </Stack>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={isXL ? 3.75 : 2}>
          {isInitialized ? (
            isAuthorized ? (
              <ProfileHeaderDropdown />
            ) : (
              <Button LinkComponent={NavLink} href={AuthRoutesEnum.LOGIN} variant="outlined">
                {t('button.signIn')}
              </Button>
            )
          ) : (
            <Stack spacing={1} direction="row" alignItems="center">
              <Skeleton variant="circular" height={40} width={40} />

              <Skeleton width={80} />
            </Stack>
          )}

          <LanguageDropdownSelector />
        </Stack>
      </Toolbar>
    </AppBar>
  )
}

const useStyles = makeStyles()((theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    padding: theme.spacing(0, 3.5),
    backgroundColor: 'white',
    boxShadow: 'unset',
    [theme.breakpoints.up('xl')]: {
      padding: theme.spacing(0, 12.5),
    },
  },
  toolbar: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 'unset!important',
  },
  link: {
    fontSize: 16,
    fontWeight: 400,
  },
}))

export { Header }
