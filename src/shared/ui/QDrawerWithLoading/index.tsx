import { CircularProgress, Drawer, Stack, type DrawerProps } from '@mui/material'
import React, { memo, type ReactElement } from 'react'

interface QDrawerWithLoadingProps extends DrawerProps {
  isLoading?: boolean
  customLoader?: ReactElement
  width?: number | string
  height?: number | string
  contentClassName?: string
}

const QDrawerWithLoading = memo(
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
  }: QDrawerWithLoadingProps) => (
    <Drawer anchor={anchor} open={open} onClose={onClose} {...rest}>
      <Stack width={width} height={height} className={contentClassName}>
        {isLoading ? customLoader || <CircularProgress sx={{ alignSelf: 'center' }} /> : children}
      </Stack>
    </Drawer>
  )
)

export { QDrawerWithLoading }
