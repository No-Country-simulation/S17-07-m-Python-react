import { Box, Stack } from '@mui/material';
import React from 'react';
import { InputSearch } from '../submodules/search/components/InputSearch';
import { MenuAccount } from './MenuAccount';

export const TopBar = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Stack sx={{ flexGrow: 1 }}>
        <InputSearch />
      </Stack>
      <Stack>
        <MenuAccount />
      </Stack>
    </Box>
  );
};
