import type { ReactElement, ReactNode } from 'react'
import React from 'react'
import { Container } from '@mui/material'
import { makeStyles } from 'tss-react/mui'

interface AuthLayoutProps {
  children: ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps): ReactElement => {
  const { classes } = useStyles()

  // Renders
  return (
    <Container maxWidth="xs" className={classes.container}>
      {children}
    </Container>
  )
}

const useStyles = makeStyles()((theme) => ({
  container: {
    width: '100%',
    margin: '0 auto',
    padding: theme.spacing(6, 2),
    justifyContent: 'center',
    alignItems: 'stretch',
    minHeight: 'calc(100vh - 183px)',
  },
}))

export { AuthLayout }
