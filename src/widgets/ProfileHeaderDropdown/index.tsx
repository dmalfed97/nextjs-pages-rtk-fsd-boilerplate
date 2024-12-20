import type { ReactElement, MouseEvent } from 'react'
import React, { useState } from 'react'
import { makeStyles } from 'tss-react/mui'
import { Divider, Menu, MenuItem, Skeleton, Stack, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import NavLink from 'next/link'

import { LogoutButton } from '~features/auth/LogoutButton'
import { UpdatePassword } from '~features/currentUser/ChangePassword'
import { CurrentUserAvatar, CurrentUserHelper, currentUserSelectors } from '~entities/currentUser'
import { PrivateRoutesEnum } from '~shared/types/routesEnums'

const ProfileHeaderDropdown = (): ReactElement => {
  const { t } = useTranslation('common')

  const { classes } = useStyles()

  const currentUser = currentUserSelectors.useCurrentUser()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const isDropdownOpen = Boolean(anchorEl)

  // Handlers
  const handleClick = (event: MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (): void => {
    setAnchorEl(null)
  }

  // Renders
  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        className={classes.triggerContainer}
        onClick={handleClick}
        aria-controls={isDropdownOpen ? 'profile-dropdown' : undefined}
        aria-haspopup="true"
        aria-expanded={isDropdownOpen ? 'true' : undefined}
        gap={1}
      >
        <CurrentUserAvatar className={classes.avatar} />

        {currentUser ? (
          <Typography className={classes.username}>
            {CurrentUserHelper.getCurrentUserName(currentUser)}
          </Typography>
        ) : (
          <Skeleton width={80} />
        )}
      </Stack>

      <Menu
        id="profile-dropdown"
        sx={{ mt: '15px' }}
        anchorEl={anchorEl}
        open={isDropdownOpen}
        onClose={handleClose}
        onClick={handleClose}
      >
        <NavLink href={PrivateRoutesEnum.PROFILE} passHref legacyBehavior>
          <MenuItem onClick={handleClose}>{t('button.myAccount')}</MenuItem>
        </NavLink>

        <UpdatePassword
          renderTrigger={(onClick) => (
            <MenuItem onClick={onClick}>{t('button.changePassword')}</MenuItem>
          )}
          onClose={handleClose}
        />

        <Divider />

        <LogoutButton
          renderTrigger={(onClick) => (
            <MenuItem onClick={onClick} sx={{ color: 'red' }}>
              {t('button.logOut')}
            </MenuItem>
          )}
          onClose={handleClose}
        />
      </Menu>
    </>
  )
}

const useStyles = makeStyles()(() => ({
  triggerContainer: {
    cursor: 'pointer',
    width: 200,
  },
  avatar: {
    height: 40,
    width: 40,
    fontSize: 14,
  },
  username: {
    color: 'black',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'pre-wrap',
  },
}))

export { ProfileHeaderDropdown }
