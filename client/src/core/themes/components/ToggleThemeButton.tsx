import React from 'react';
import { Button } from '@mui/material';
import { useThemeToggle } from '../theme/AppTheme';
import { DarkMode } from '@mui/icons-material';
import { LightMode } from '@mui/icons-material';

const ToggleThemeButton = () => {
  const { darkMode, setDarkMode } = useThemeToggle();

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };
  return (
    <Button style={{ margin: '0 8px' }} variant="text" onClick={toggleDarkMode}>
      {darkMode ? <LightMode /> : <DarkMode />}
    </Button>
  );
};

export default ToggleThemeButton;
