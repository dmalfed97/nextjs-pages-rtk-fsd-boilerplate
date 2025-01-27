import { useMediaQuery, useTheme } from '@mui/material'

import { useIsMobile } from '~app/providers/Device'

export const useMuiMediaQuery = () => {
  const theme = useTheme()

  const isMobile = useIsMobile()

  return {
    isXS: useMediaQuery(theme.breakpoints.up('xs')),
    isSM: useMediaQuery(theme.breakpoints.up('sm')) || !isMobile,
    isMD: useMediaQuery(theme.breakpoints.up('md')) || !isMobile,
    isLG: useMediaQuery(theme.breakpoints.up('lg')) || !isMobile,
    isXL: useMediaQuery(theme.breakpoints.up('xl')) || !isMobile,
  }
}
