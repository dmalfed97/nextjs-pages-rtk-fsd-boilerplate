import type { ReactElement } from 'react'
import React, { memo } from 'react'
import type { DrawerProps } from '@mui/material'
import { CircularProgress, Drawer, Stack } from '@mui/material'

interface SideDrawerWithLoadingProps extends DrawerProps {
  isLoading?: boolean
  customLoader?: ReactElement
  width?: number | string
  height?: number | string
  contentClassName?: string
}

const SideDrawerWithLoading = memo(
  ({
    isLoading = false,
    customLoader,
    width,
    height,
    contentClassName,
    children,
    anchor = 'right',
    open,
    onClose,
    ...rest
  }: SideDrawerWithLoadingProps): ReactElement => (
    <Drawer anchor={anchor} open={open} onClose={onClose} {...rest}>
      <Stack width={width} height={height} className={contentClassName}>
        {isLoading ? customLoader || <CircularProgress sx={{ alignSelf: 'center' }} /> : children}
      </Stack>
    </Drawer>
  )
)

export { SideDrawerWithLoading }
