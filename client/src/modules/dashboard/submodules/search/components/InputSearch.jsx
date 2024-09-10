import { Search as SearchIcon, Close as CloseIcon } from '@mui/icons-material';
import { Box, IconButton, InputBase, Paper } from '@mui/material';
import React, { useState } from 'react';
import { useSearch } from '../pages/store/search';

export const InputSearch = () => {
  const { isSearchVisible } = useSearch();
  const [searchText, setSearchText] = useState('');

  const handleClearSearch = () => {
    setSearchText('');
  };

  return (
    <>
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
          <SearchIcon />
          <InputBase
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            fullWidth
            sx={{ ml: 1, flex: 1 }}
            placeholder="Buscar por canción, artista, álbum, género, etc"
          />
          {searchText && (
            <IconButton
              onClick={handleClearSearch}
              sx={{ margin: 0, padding: 0 }}
            >
              <CloseIcon />
            </IconButton>
          )}
        </Paper>
      </Box>

      {isSearchVisible && (
        <Box
          sx={{
            display: { xs: 'flex', md: 'none' },
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 9999,
            justifyContent: 'center',
            p: 2,
            backdropFilter: 'blur(10px)',
          }}
        >
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
            <SearchIcon />
            <InputBase
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              fullWidth
              sx={{ ml: 1, flex: 1 }}
              placeholder="Buscar..."
            />
            {searchText && (
              <IconButton
                onClick={handleClearSearch}
                sx={{ margin: 0, padding: 0 }}
              >
                <CloseIcon />{' '}
              </IconButton>
            )}
          </Paper>
        </Box>
      )}
    </>
  );
};
