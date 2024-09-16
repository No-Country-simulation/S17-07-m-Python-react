import { createTheme } from '@mui/material';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#D2B50F',
    },
    secondary: {
      main: '#897608',
    },
    red: {
      main: '#a3534b',
    },
    yellow: {
      main: '#FFE668',
    },
    brown: {
      main: '#f8ebd9',
    },
    white: {
      main: '#F3E1C7',
    },
    black: {
      main: '#594539',
    },
    grey: {
      main: '#9A8B76',
    },
    background: {
      default: '#FFF8ED',
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#D2B50F',
    },
    secondary: {
      main: '#FACD66',
    },
    red: {
      main: '#8C281F',
    },
    yellow: {
      main: '#FADB3E',
    },
    brown: {
      main: '#1E1E1E',
    },
    white: {
      main: '#F3E1C7',
    },
    black: {
      main: '#594539',
    },
    grey: {
      main: '#3D3C3D',
    },
    background: {
      default: '#212121',
    },
  },
});
