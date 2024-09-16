import React, { useState, useContext, useEffect } from 'react';
import {
  IconButton,
  Menu,
  MenuItem,
  Checkbox,
  ListItemText,
  Divider,
  Box,
  Snackbar,
  Alert,
} from '@mui/material';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import PlaylistContext from '../services/store/my-playlists';

const PlaylistMenu = ({ id }) => {
  const { playlists, handleChangeSongsToPlaylist } =
    useContext(PlaylistContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedPlaylists, setSelectedPlaylists] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');

  useEffect(() => {
    if (!id) return;
    const initializedPlaylists = playlists.filter((playlist) =>
      playlist.songs.some((song) => song.id === id),
    );
    setSelectedPlaylists(initializedPlaylists);
  }, [playlists, id]);

  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    if (event) event.stopPropagation();
    setAnchorEl(null);
  };

  const handleToggle = (playlist) => {
    setSelectedPlaylists((prevSelected) =>
      prevSelected.find((p) => p.id === playlist.id)
        ? prevSelected.filter((p) => p.id !== playlist.id)
        : [...prevSelected, playlist],
    );
  };

  const handleSave = async () => {
    try {
      // Actualizar playlists seleccionadas
      selectedPlaylists.forEach((playlist) => {
        const existingSongIds = playlist.songs.map((song) => song.id);
        const updatedSongIds = existingSongIds.includes(id)
          ? existingSongIds
          : [...existingSongIds, id];

        handleChangeSongsToPlaylist(playlist.id, updatedSongIds);
      });

      // Actualizar playlists desmarcadas
      playlists.forEach((playlist) => {
        if (!selectedPlaylists.find((p) => p.id === playlist.id)) {
          const existingSongIds = playlist.songs.map((song) => song.id);
          const updatedSongIds = existingSongIds.filter(
            (songId) => songId !== id,
          );

          handleChangeSongsToPlaylist(playlist.id, updatedSongIds);
        }
      });

      setSnackbarMessage('Playlists updated successfully');
      setSnackbarSeverity('success');
    } catch (error) {
      setSnackbarMessage('Error updating playlists');
      setSnackbarSeverity('error');
      throw new Error(error);
    } finally {
      setSnackbarOpen(true);
      setSelectedPlaylists([]);
      handleClose();
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <IconButton onClick={handleClick} disabled={!id}>
        <LibraryAddIcon sx={{ fontSize: '1.5rem' }} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: 'auto',
            maxWidth: '300px',
            minWidth: '150px',
            display: { xs: 'block', sm: 'block' },
            maxHeight: '50vh',
            overflowY: 'auto',
          },
        }}
      >
        <Box
          sx={{
            maxHeight: 'calc(50vh - 48px)',
            overflowY: 'auto',
          }}
        >
          {playlists
            .slice()
            .reverse()
            .map((playlist) => (
              <MenuItem
                key={playlist.id}
                onClick={() => handleToggle(playlist)}
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <Checkbox
                  checked={
                    !!selectedPlaylists.find((p) => p.id === playlist.id)
                  }
                />
                <ListItemText primary={playlist.name} />
              </MenuItem>
            ))}
        </Box>
        <Divider />
        <MenuItem onClick={handleSave}>Guardar</MenuItem>
      </Menu>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{
          '& .MuiSnackbarContent-root': {
            backgroundColor: snackbarSeverity === 'success' ? 'green' : 'red',
            color: 'white',
            fontSize: '1rem',
            borderRadius: '8px',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{
            '& .MuiAlert-icon': {
              color: 'white',
            },
            '& .MuiAlert-message': {
              fontWeight: 'bold',
            },
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default PlaylistMenu;
