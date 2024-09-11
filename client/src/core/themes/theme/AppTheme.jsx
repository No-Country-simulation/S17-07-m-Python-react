import { ThemeProvider } from '@emotion/react';
import { CssBaseline, Box } from '@mui/material';
import { useState, useContext, createContext } from 'react';
import { darkTheme, lightTheme } from './theme';

const ThemeContext = createContext();

export const AppTheme = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true);
  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            transition: 'background-color 1s ease, color 1s ease',
          }}
        >
          <CssBaseline />
          {children}
        </Box>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeToggle = () => {
  return useContext(ThemeContext);
};
