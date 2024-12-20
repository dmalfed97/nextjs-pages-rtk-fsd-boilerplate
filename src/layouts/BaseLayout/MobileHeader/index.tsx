import React, { useState, type FC } from 'react'
import { AppBar, Toolbar, Stack, Button, IconButton, Drawer } from '@mui/material'
import { Close as CloseIcon, Menu as MenuIcon } from '@mui/icons-material'
import NavLink from 'next/link'
import dynamic from 'next/dynamic'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'

import { useAuthContext } from '~app/providers/Auth'
import { AuthRoutesEnum } from '~shared/types/routesEnums'

import { useStyles } from './index.styled'

// Dynamic imports
const ProfileHeaderDropdown = dynamic(() =>
  import('~widgets/ProfileHeaderDropdown').then((m) => m.ProfileHeaderDropdown)
)
const DrawerMenuContent = dynamic(() =>
  import('./DrawerMenuContent').then((m) => m.DrawerMenuContent)
)

const MobileHeader: FC = () => {
  const { t } = useTranslation('common')

  const { isAuthorized } = useAuthContext()

  const [drawerIsOpened, setDrawerIsOpened] = useState<boolean>(false)

  const { classes } = useStyles()

  // Handlers
  const handleCloseDrawer = (): void => {
    setDrawerIsOpened(false)
  }

  const handleToggleDrawer = (): void => {
    setDrawerIsOpened((prev) => !prev)
  }

  // Renders
  return (
    <AppBar position="sticky" className={classes.header}>
      <Toolbar className={classes.toolbar}>
        <IconButton aria-label="menu" onClick={handleToggleDrawer}>
          {drawerIsOpened ? <CloseIcon /> : <MenuIcon />}
        </IconButton>

        <Stack direction="row" alignItems="center" gap={10}>
          <NavLink href="/" className={classes.imgLink}>
            <Image src="" alt="main logo" />
          </NavLink>
        </Stack>

        <Stack direction="row" alignItems="center" gap={2}>
          {isAuthorized ? (
            <ProfileHeaderDropdown />
          ) : (
            <Button
              LinkComponent={NavLink}
              href={AuthRoutesEnum.LOGIN}
              className={classes.signInBtn}
              size="small"
              variant="outlined"
            >
              {t('button.signIn')}
            </Button>
          )}
        </Stack>
      </Toolbar>

      <Drawer
        open={drawerIsOpened}
        classes={{
          root: classes.drawer,
          paper: classes.drawerPaper,
        }}
        onClose={handleCloseDrawer}
      >
        {drawerIsOpened && <DrawerMenuContent onClose={handleCloseDrawer} />}
      </Drawer>
    </AppBar>
  )
}

export { MobileHeader }
