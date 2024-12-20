import type { PropsWithChildren, ReactElement } from 'react'
import React from 'react'
import { makeStyles } from 'tss-react/mui'
import { Stack } from '@mui/material'
import dynamic from 'next/dynamic'

import { useMuiMediaQuery } from '~shared/hooks/useMediaQuery'

import { Footer } from './Footer'

// Dynamic imports
const Header = dynamic(() => import('./Header').then((m) => m.Header))
const MobileHeader = dynamic(() => import('./MobileHeader').then((m) => m.MobileHeader))

const BaseLayout = ({ children }: PropsWithChildren): ReactElement => {
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
