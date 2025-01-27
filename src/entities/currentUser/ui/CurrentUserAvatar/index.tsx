import { Person as PersonIcon, Error as ErrorIcon } from '@mui/icons-material'
import { Box } from '@mui/material'
import React, { type FC } from 'react'
import { makeStyles } from 'tss-react/mui'

import { currentUserSelectors } from '../..'

interface CurrentUserAvatarProps {
  className?: string
}

const CurrentUserAvatar: FC<CurrentUserAvatarProps> = ({ className }) => {
  const { classes, cx } = useStyles()

  const currentUser = currentUserSelectors.useCurrentUser()

  // Renders
  if (!currentUser || !currentUser.avatar) {
    return (
      <Box className={cx(classes.pictureContainer, className)}>
        <PersonIcon className={classes.picture} />

        <ErrorIcon className={classes.errorIcon} fontSize="small" color="error" />
      </Box>
    )
  }
  return (
    <Box
      className={cx(classes.pictureContainer, className)}
      component="img"
      src={currentUser.avatar}
    />
  )
}

const useStyles = makeStyles()((theme) => ({
  pictureContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    flexGrow: 0,
    position: 'relative',
    borderRadius: '100%',
    background: theme.palette.grey[200],
    width: 138,
    height: 138,
  },
  picture: {
    height: '60%',
    width: '60%',
    color: theme.palette.grey['900'],
  },
  errorIcon: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
}))

export { CurrentUserAvatar }
