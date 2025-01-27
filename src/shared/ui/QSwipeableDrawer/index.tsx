import { SwipeableDrawer, type SwipeableDrawerProps } from '@mui/material'
import React, { type FC } from 'react'
import { makeStyles } from 'tss-react/mui'

type QSwipeableDrawerProps = SwipeableDrawerProps

const QSwipeableDrawer: FC<QSwipeableDrawerProps> = ({
  className,
  anchor = 'bottom',
  onOpen = () => {},
  children,
  disableDiscovery = true,
  disableSwipeToOpen = true,
  ...rest
}) => {
  const { classes, cx } = useStyles()

  // Renders
  return (
    <SwipeableDrawer
      className={cx(classes.elevation, className)}
      anchor={anchor}
      onOpen={onOpen}
      disableDiscovery={disableDiscovery}
      disableSwipeToOpen={disableSwipeToOpen}
      {...rest}
    >
      {children}
    </SwipeableDrawer>
  )
}

const useStyles = makeStyles()(() => ({
  elevation: {
    '.MuiPaper-elevation': {
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
      padding: 20,
    },
  },
}))

export { QSwipeableDrawer }
