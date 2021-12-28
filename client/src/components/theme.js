import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

// 2. Add your color mode config
const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const fonts = { mono: `'Open Sans', monospace` };
const fontSizes = {
  xs: '0.75rem',
  sm: '0.875rem',
  md: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
  '3xl': '1.8rem',
  '4xl': '2.25rem',
  '5xl': '3rem',
  '6xl': '4rem',
};

const breakpoints = createBreakpoints({
  sm: '40em',
  md: '52em',
  lg: '64em',
  xl: '80em',
});

export const theme = extendTheme({
  config,
  fonts: {
    heading: 'Open Sans',
    body: 'Open Sans',
  },
  colors: {
    brand: {
      blue: '#24b4fb',
      black: '#2E2E2D',
      gray: '#909090',
    },

    black: {
      100: '#2E2E2D',
      200: '#404040',
    },

    gray: {
      200: '#B7B7B7',
      300: '#CAD4DB',
      400: '#919191',
      500: '#C4C4C4',
      600: '#CBCBCB',
    },
  },
  fontSizes,
  breakpoints,
});
