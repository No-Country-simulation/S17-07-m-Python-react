import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { useState } from 'react';
import { darkTheme, lightTheme } from './theme';
import { useContext } from 'react';
import { createContext } from 'react';

const ThemeContext = createContext();

export const AppTheme = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true);
  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeToggle = () => {
  return useContext(ThemeContext);
};
