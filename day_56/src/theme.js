'use client';
import { Roboto } from 'next/font/google';
import { createTheme, extendTheme } from '@mui/material/styles';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  colorSchemes: {
    dark: {
      palette: {
        primary: {
          main: '#002884',
        },
        text: {
          secondary: '#fb923c',
        },
      },
    },
    light: {
      palette: {},
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
    color: 'inherit',
    link: {
      color: '#fb923c', // Custom link color (blue)
      textDecoration: 'none',
    },
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        root: {
          variants: [
            {
              props: { severity: 'info' },
              style: {
                backgroundColor: '#60a5fa',
              },
            },
          ],
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#fb923c', // Custom link color (blue)
          textDecoration: 'none',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: 'inherit',
        },
      },
    },
  },
});

export default theme;
