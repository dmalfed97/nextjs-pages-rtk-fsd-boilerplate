import type { ReactElement, MouseEvent } from 'react'
import React, { memo } from 'react'
import { makeStyles } from 'tss-react/mui'
import dynamic from 'next/dynamic'
import type { ModalProps } from '@mui/material'
import { Modal, Box, Paper, Typography, IconButton } from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'

import { useMuiMediaQuery } from '../../hooks/useMediaQuery'

// Dynamic imports
const MobileCustomModal = dynamic(() =>
  import('../MobileCustomModal').then((m) => m.MobileCustomModal)
)

export interface CustomModalProps extends ModalProps {
  onClose: (event: MouseEvent) => void
  width?: number | string
  wrapperClassName?: string
}

const CustomModal = memo(
  ({
    children,
    onClose,
    width = 700,
    wrapperClassName,
    ...rest
  }: CustomModalProps): ReactElement => {
    const { isSM } = useMuiMediaQuery()
    const { classes, cx } = useStyles({ width })

    // Handlers
    const handleModalClose = (event: MouseEvent): void => {
      event.stopPropagation()

      onClose(event)
    }

    // Renders
    if (isSM) {
      return (
        <Modal {...rest} onClose={handleModalClose}>
          <Paper className={cx(classes.wrapper, wrapperClassName)}>
            {rest.title && (
              <Box p={3}>
                <Typography variant="h6">{rest.title}</Typography>
              </Box>
            )}

            <Box p={3}>
              <IconButton className={classes.closeBtn} onClick={handleModalClose}>
                <CloseIcon />
              </IconButton>

              {children}
            </Box>
          </Paper>
        </Modal>
      )
    } else {
      return (
        <MobileCustomModal hasCloseIcon onClose={handleModalClose} {...rest}>
          {children}
        </MobileCustomModal>
      )
    }
  }
)

const useStyles = makeStyles<{ width: number | string }>()((theme, { width }) => ({
  wrapper: {
    overflow: 'auto',
    maxHeight: '95vh',
    maxWidth: '95vw',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width,
    outline: 'none',
  },
  closeBtn: {
    cursor: 'pointer',
    position: 'absolute',
    right: theme.spacing(2),
    top: theme.spacing(2),
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },
}))

export { CustomModal }
