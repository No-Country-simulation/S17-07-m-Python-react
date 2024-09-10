import { Search } from '@mui/icons-material';
import { Box, InputBase, Paper } from '@mui/material';
import React from 'react';

export const InputSearch = () => {
  return (
    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
      <Paper
        component="form"
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          width: '90%',
          backgroundColor: 'grey.main',
          borderRadius: 4,
        }}
      >
        <Search />
        <InputBase
          fullWidth
          sx={{ ml: 1, flex: 1 }}
          placeholder="Buscar por canción, artista, álbum, genero, etc"
        />
      </Paper>
    </Box>
  );
};
