import { Box } from '@mui/material';
import React from 'react';
import { TopBar } from '../../modules/dashboard/components/TopBar';

export const PanelLayout = ({ children }) => {
  return (
    <Box>
      <TopBar />
      {children}
    </Box>
  );
};
