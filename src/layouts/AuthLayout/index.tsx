import { Container } from '@mui/material'
import React, { type FC, type ReactNode } from 'react'
import { makeStyles } from 'tss-react/mui'

interface AuthLayoutProps {
  children: ReactNode
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
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
