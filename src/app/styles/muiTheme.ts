import { createTheme } from '@mui/material'
import { toggleButtonGroupClasses } from '@mui/material/ToggleButtonGroup'

import { stolziFont } from './font'
import { palette } from './palette'

import type {} from '@mui/lab/themeAugmentation'

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 320,
      sm: 576,
      md: 768,
      lg: 1024,
      xl: 1208 + 48,
    },
  },
  palette,
  typography: {
    fontFamily: stolziFont.style.fontFamily,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          minWidth: 320,
        },
        '#root': {
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        },
        img: {
          height: 'auto',
          maxWidth: '100%',
        },
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: 'xl',
      },
      styleOverrides: {
        maxWidthXl: 1180,
      },
    },
    MuiLink: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: 'black',
          textDecoration: 'none',
          '&:hover': {
            color: theme.palette.primary.main,
          },
        }),
      },
    },
    MuiButton: {
      defaultProps: {
        size: 'large',
      },
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 8,
          textTransform: 'none',
          fontSize: 12,
          [theme.breakpoints.up('sm')]: {
            fontSize: 14,
          },
        }),
        sizeLarge: ({ theme }) => ({
          padding: theme.spacing(1, 2),
        }),
      },
    },
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.grey[100],
          borderRadius: 70,
          overflow: 'hidden',
          [`& .${toggleButtonGroupClasses.grouped}`]: {
            margin: theme.spacing(0.75),
            border: 0,
            borderRadius: 30,
            [`&.${toggleButtonGroupClasses.disabled}`]: {
              border: 0,
            },
          },
          [`& .${toggleButtonGroupClasses.middleButton},& .${toggleButtonGroupClasses.lastButton}`]:
            {
              marginLeft: -1,
              borderLeft: '1px solid transparent',
            },
        }),
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          border: 'none',
          padding: theme.spacing(2, 3),
          textTransform: 'none',
        }),
        selected: ({ theme }) => ({
          color: theme.palette.primary.main,
        }),
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: { borderRadius: 8 },
        notchedOutline: ({ theme }) => ({
          borderColor: theme.palette.grey[200],
        }),
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          whiteSpace: 'pre-wrap',
        },
        h1: ({ theme }) => ({
          fontSize: 36,
          lineHeight: '42px',
          fontWeight: 700,
          [theme.breakpoints.up('sm')]: {
            fontSize: 48,
            lineHeight: '56px',
          },
        }),
        h2: ({ theme }) => ({
          fontSize: 20,
          lineHeight: '26px',
          fontWeight: 500,
          letterSpacing: 0.25,
          [theme.breakpoints.up('sm')]: {
            fontSize: 34,
            lineHeight: '42px',
          },
        }),
        h3: ({ theme }) => ({
          fontSize: 20,
          lineHeight: '26px',
          fontWeight: 500,
          letterSpacing: 0.25,
          [theme.breakpoints.up('sm')]: {
            fontSize: 24,
            lineHeight: '32px',
            fontWeight: 400,
          },
        }),
        h4: ({ theme }) => ({
          fontSize: 15,
          lineHeight: '20px',
          fontWeight: 500,
          [theme.breakpoints.up('sm')]: {
            fontSize: 20,
            lineHeight: '32px',
            fontWeight: 400,
          },
        }),
        subtitle1: ({ theme }) => ({
          fontSize: 12,
          lineHeight: '18px',
          fontWeight: 500,
          letterSpacing: 0.15,
          [theme.breakpoints.up('sm')]: {
            fontSize: 15,
            lineHeight: '22.5px',
          },
        }),
        body1: ({ theme }) => ({
          fontSize: 12,
          lineHeight: '18px',
          fontWeight: 300,
          letterSpacing: 0.15,
          [theme.breakpoints.up('sm')]: {
            fontSize: 15,
            lineHeight: '22.5px',
            fontWeight: 300,
          },
        }),
        body2: ({ theme }) => ({
          fontSize: 12,
          lineHeight: '18px',
          fontWeight: 400,
          letterSpacing: 0.15,
          [theme.breakpoints.up('sm')]: {
            fontSize: 13,
            lineHeight: '19px',
            fontWeight: 400,
          },
        }),
      },
    },
  },
})
