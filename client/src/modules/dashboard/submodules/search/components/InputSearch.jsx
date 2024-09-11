import { Search as SearchIcon, Close as CloseIcon } from '@mui/icons-material';
import { Box, IconButton, InputBase, Paper } from '@mui/material';
import React from 'react';
import { useSearch } from '../pages/store/search';
import { debounce } from 'lodash';
import { searchMusic } from '../helpers/fetchSearch';
import { useEffect } from 'react';
import { useCallback } from 'react';

export const InputSearch = () => {
  const { isSearchVisible, searchText, updateSearchText, updateResults } =
    useSearch();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchSearchResults = useCallback(
    debounce(async (query) => {
      if (query.length === 0) {
        updateResults(null);
        return;
      }

      try {
        const data = await searchMusic(query);
        if (data.length === 0) {
          updateResults([]);
        } else {
          updateResults(data);
        }
      } catch (error) {
        updateResults(null);
        throw (new 'Error fetching search results:'(), error);
      }
    }, 600),
    [updateResults],
  );

  useEffect(() => {
    fetchSearchResults(searchText);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  const handleClearSearch = () => {
    updateSearchText('');
    updateResults(null);
  };

  const handleInputChange = (e) => {
    updateSearchText(e.target.value);
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
            onChange={handleInputChange}
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
            backdropFilter: 'blur(8px)',
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
              onChange={handleInputChange}
              fullWidth
              sx={{ ml: 1, flex: 1 }}
              placeholder="Buscar..."
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
      )}
    </>
  );
};
