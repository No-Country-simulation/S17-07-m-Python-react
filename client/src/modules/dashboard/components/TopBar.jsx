import { Box, Stack } from '@mui/material';
import React from 'react';
import { InputSearch } from './InputSearch';
import { MenuAccount } from './MenuAccount';

export const TopBar = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Stack>
        <InputSearch />
      </Stack>
      <Stack>
        <MenuAccount />
      </Stack>
    </Box>
  );
};
