import React from 'react';
import { Switch, Box } from '@mui/material';
import { useThemeToggle } from '../theme/AppTheme';

const ToggleThemeSlider = () => {
  const { darkMode, setDarkMode } = useThemeToggle();

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <Box display="flex" alignItems="center">
      <Switch checked={darkMode} onChange={toggleDarkMode} color="secondary" />
    </Box>
  );
};

export default ToggleThemeSlider;
