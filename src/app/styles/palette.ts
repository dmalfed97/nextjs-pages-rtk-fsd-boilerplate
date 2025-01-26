import type { PaletteOptions } from '@mui/material'

interface ICustomPalette {}

export interface IPaletteOptions extends PaletteOptions {
  custom: ICustomPalette
}

export const palette: IPaletteOptions = {
  background: {
    default: '#FFFFFF',
    paper: '#FFFFFF',
  },
  primary: {
    main: '#1E90FF',
    dark: '#1C86EE',
    contrastText: '#FFFFFF',
  },
  grey: {
    50: '#FBFBFB',
    100: '#F2F2F2',
    200: '#E9E9E9',
    300: '#E0E0E0',
    500: '#AAAAAA',
    600: '#8E8E8E',
    900: '#101010',
  },
  custom: {},
}
