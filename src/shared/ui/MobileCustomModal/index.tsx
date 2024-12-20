import { Close as CloseIcon } from '@mui/icons-material'
import type { DialogProps } from '@mui/material'
import { Dialog, IconButton, Slide, Stack, Typography } from '@mui/material'
import type { TransitionProps } from '@mui/material/transitions'
import type { MouseEvent } from 'react'
import React, { memo } from 'react'
import { makeStyles } from 'tss-react/mui'

interface IMobileCustomModalProps extends DialogProps {
  onClose: (event: MouseEvent) => void
  hasCloseIcon?: boolean
}

const MobileCustomModal = memo(
  ({ children, title, onClose, hasCloseIcon, ...props }: IMobileCustomModalProps) => {
    const { classes } = useStyles()

    // Handlers
    const handleModalClose = (event: MouseEvent): void => {
      event.stopPropagation()

      onClose(event)
    }

    // Renders
    return (
      <Dialog
        classes={{
          root: classes.modalRoot,
          container: classes.modalContainer,
          paper: classes.modal,
        }}
        TransitionComponent={Transition}
        onClose={handleModalClose}
        {...props}
      >
        <>
          <Stack gap={2} pt={hasCloseIcon && !title ? 5 : 0}>
            {title && <Typography variant="h6">{title}</Typography>}

            {children}
          </Stack>

          {hasCloseIcon && (
            <IconButton className={classes.closeBtn} onClick={handleModalClose}>
              <CloseIcon />
            </IconButton>
          )}
        </>
      </Dialog>
    )
  }
)

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

const useStyles = makeStyles()((theme) => ({
  modalRoot: {
    top: 'unset',
  },
  modalContainer: {
    alignItems: 'flex-end',
  },
  modal: {
    maxHeight: '100dvh',
    margin: 0,
    width: '100%',
    borderTopLeftRadius: theme.spacing(1.5),
    borderTopRightRadius: theme.spacing(1.5),
    padding: theme.spacing(2),
  },
  closeBtn: {
    cursor: 'pointer',
    position: 'absolute',
    right: theme.spacing(1.5),
    top: theme.spacing(1.5),
  },
}))

export { MobileCustomModal }
