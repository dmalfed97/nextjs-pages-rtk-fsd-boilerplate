import type { ReactElement, MouseEvent } from 'react'
import React, { useState, useCallback } from 'react'
import { makeStyles } from 'tss-react/mui'
import { useTranslation } from 'next-i18next'
import { Button, Stack, Typography } from '@mui/material'

import { CustomModal } from '~shared/ui/CustomModal'
import useAppDispatch from '~shared/hooks/useAppDispatch'
import { authStore } from '~entities/auth'

interface LogoutButtonProps {
  className?: string
  renderTrigger?: (onClick: (event: MouseEvent) => void) => ReactElement
  onClose?: () => void
}

const LogoutButton = ({ className, renderTrigger, onClose }: LogoutButtonProps): ReactElement => {
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

      <CustomModal open={isOpened} onClose={handleCloseModal}>
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
      </CustomModal>
    </>
  )
}

const useStyles = makeStyles()(() => ({
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
    background: 'white',
    color: 'red',
    '&:hover': {
      background: 'rgba(190, 190, 190, 0.35)',
    },
  },
  button: {
    flex: 0,
    minWidth: 100,
    fontWeight: 400,
  },
  cancelButton: {
    border: '1px solid rgba(48, 38, 85, .1)',
    color: 'black',
  },
}))

export { LogoutButton }
