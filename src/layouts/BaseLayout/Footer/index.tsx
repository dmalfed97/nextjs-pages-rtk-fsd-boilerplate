import React, { type FC } from 'react'
import { Container, Stack, Typography, Link } from '@mui/material'
import NavLink from 'next/link'
import { makeStyles } from 'tss-react/mui'

import { useMuiMediaQuery } from '~shared/hooks/useMediaQuery'

const Footer: FC = () => {
  const { isSM } = useMuiMediaQuery()
  const { classes } = useStyles()

  // Renders
  return (
    <Stack direction="row" className={classes.wrapper}>
      <Container>
        <Stack
          direction={isSM ? 'row' : 'column-reverse'}
          alignItems="center"
          justifyContent="center"
          gap={isSM ? 3 : 2}
          flexWrap="wrap"
        >
          <Typography variant="body2">© 2025 FSD Boilerplate</Typography>

          <Link component={NavLink} href="">
            <Typography variant="body2">Example link</Typography>
          </Link>
        </Stack>
      </Container>
    </Stack>
  )
}

export const useStyles = makeStyles()((theme) => ({
  wrapper: {
    padding: theme.spacing(4, 0),
    background: theme.palette.grey[100],
  },
}))

export { Footer }
