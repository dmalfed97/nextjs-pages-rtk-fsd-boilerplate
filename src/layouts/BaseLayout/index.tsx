import { Stack } from '@mui/material'
import dynamic from 'next/dynamic'
import React, { type PropsWithChildren, type FC } from 'react'
import { makeStyles } from 'tss-react/mui'

import { useMuiMediaQuery } from '~shared/hooks/useMediaQuery'

import { Footer } from './Footer'

// Dynamic imports
const Header = dynamic(() => import('./Header').then((m) => m.Header))
const MobileHeader = dynamic(() => import('./MobileHeader').then((m) => m.MobileHeader))

const BaseLayout: FC<PropsWithChildren> = ({ children }) => {
  const { isLG } = useMuiMediaQuery()
  const { classes } = useStyles()

  // Renders
  return (
    <Stack className={classes.root}>
      {isLG ? <Header /> : <MobileHeader />}

      <main className={classes.main}>{children}</main>

      <Footer />
    </Stack>
  )
}

const useStyles = makeStyles()(() => ({
  root: {
    minHeight: '100vh',
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    paddingBottom: 25,
  },
}))

export { BaseLayout }
