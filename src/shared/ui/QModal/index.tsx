import { Close as CloseIcon } from '@mui/icons-material'
import { Modal, Box, Paper, Typography, IconButton, type ModalProps } from '@mui/material'
import dynamic from 'next/dynamic'
import React, { memo, type MouseEvent } from 'react'
import { makeStyles } from 'tss-react/mui'

import { useMuiMediaQuery } from '../../hooks/useMediaQuery'

// Dynamic imports
const MobileCustomModal = dynamic(() => import('../QMobileModal').then((m) => m.QMobileModal))

export interface QModalProps extends ModalProps {
  onClose: (e: MouseEvent) => void
  width?: number | string
  wrapperClassName?: string
}

const QModal = memo(
  ({ children, onClose, width = 700, wrapperClassName, ...rest }: QModalProps) => {
    const { isSM } = useMuiMediaQuery()
    const { classes, cx } = useStyles({ width })

    // Handlers
    const handleModalClose = (e: MouseEvent): void => {
      e.stopPropagation()

      onClose(e)
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

export { QModal }
