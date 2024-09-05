import { createTheme } from '@mui/material';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#D2B50F',
    },
    secondary: {
      main: '#FACD66',
    },
    red: {
      main: '#a3534b',
    },
    yellow: {
      main: '#FFE668',
    },
    brown: {
      main: '#F3E1C7',
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FACD66',
    },
    secondary: {
      main: '#D2B50F',
    },
    red: {
      main: '#8C281F',
    },
    yellow: {
      main: '#FADB3E',
    },
    brown: {
      main: '#594539',
    },
  },
});
