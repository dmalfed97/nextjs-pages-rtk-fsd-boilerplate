import { Button, Stack, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import React, { useState, useCallback, type ReactElement, type FC, type MouseEvent } from 'react'
import { makeStyles } from 'tss-react/mui'

import { authStore } from '~entities/auth'
import useAppDispatch from '~shared/hooks/useAppDispatch'
import { QModal } from '~shared/ui/QModal'

interface LogoutButtonProps {
  className?: string
  renderTrigger?: (onClick: (e: MouseEvent) => void) => ReactElement
  onClose?: () => void
}

const LogoutButton: FC<LogoutButtonProps> = ({ className, renderTrigger, onClose }) => {
  const { t } = useTranslation(['common', 'auth'])

  const { classes, cx } = useStyles()

  const dispatch = useAppDispatch()

  const [isOpened, setIsOpened] = useState<boolean>(false)

  // Handlers
  const handleOpenModal = (e: MouseEvent): void => {
    e.stopPropagation()
    setIsOpened(true)
  }

  const handleCloseModal = useCallback((e: MouseEvent): void => {
    e.stopPropagation()
    setIsOpened(false)
  }, [])

  const handleLogout = (e: MouseEvent): void => {
    e.stopPropagation()

    void dispatch(authStore.logoutAction()).finally(() => {
      setIsOpened(false)
      onClose?.()
    })
  }

  // Renders
  return (
    <>
      {renderTrigger ? (
        renderTrigger(handleOpenModal)
      ) : (
        <Button onClick={handleOpenModal} className={cx(classes.triggerButton, className)}>
          {t('button.logOut')}
        </Button>
      )}

      <QModal open={isOpened} onClose={handleCloseModal}>
        <Stack className={classes.container} gap={5}>
          <Typography component="p" className={classes.message}>
            {t('auth:modal.logOut.infoMessage')}
          </Typography>

          <Stack direction="row" justifyContent="center" gap={4}>
            <Button
              onClick={handleCloseModal}
              variant="outlined"
              className={cx(classes.button, classes.cancelButton)}
            >
              {t('button.cancel')}
            </Button>

            <Button onClick={handleLogout} variant="outlined" className={classes.button}>
              {t('button.yes')}
            </Button>
          </Stack>
        </Stack>
      </QModal>
    </>
  )
}

const useStyles = makeStyles()((theme) => ({
  container: {
    padding: '40px 60px',
  },
  message: {
    fontSize: 15,
    fontWeight: 600,
    textAlign: 'center',
  },
  triggerButton: {
    transition: 'all .3s',
    justifyContent: 'flex-start',
    padding: 10,
    background: theme.palette.background.default,
    color: theme.palette.error.main,
    '&:hover': {
      // FIXME
      background: 'rgba(190, 190, 190, 0.35)',
    },
  },
  button: {
    flex: 0,
    minWidth: 100,
    fontWeight: 400,
  },
  cancelButton: {
    // FIXME
    border: '1px solid rgba(48, 38, 85, .1)',
    color: theme.palette.text.primary,
  },
}))

export { LogoutButton }
