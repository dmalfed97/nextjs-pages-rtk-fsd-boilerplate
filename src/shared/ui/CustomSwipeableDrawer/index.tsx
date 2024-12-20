import type { ReactElement } from 'react'
import React from 'react'
import { makeStyles } from 'tss-react/mui'
import type { SwipeableDrawerProps } from '@mui/material'
import { SwipeableDrawer } from '@mui/material'

type CustomSwipeableDrawerProps = SwipeableDrawerProps

const CustomSwipeableDrawer = ({
  className,
  anchor = 'bottom',
  onOpen = () => {},
  children,
  disableDiscovery = true,
  disableSwipeToOpen = true,
  ...rest
}: CustomSwipeableDrawerProps): ReactElement => {
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

export { CustomSwipeableDrawer }
