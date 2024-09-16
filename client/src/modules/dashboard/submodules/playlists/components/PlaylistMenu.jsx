import React, { useState, useContext, useEffect } from 'react';
import {
  IconButton,
  Menu,
  MenuItem,
  Checkbox,
  ListItemText,
  Divider,
  Box,
} from '@mui/material';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import PlaylistContext from '../services/store/my-playlists';

const PlaylistMenu = ({ id }) => {
  const { playlists, handleChangeSongsToPlaylist } =
    useContext(PlaylistContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedPlaylists, setSelectedPlaylists] = useState([]);

  useEffect(() => {
    if (!id) return;
    const initializedPlaylists = playlists.filter((playlist) =>
      playlist.songs.some((song) => song.id === id),
    );
    setSelectedPlaylists(initializedPlaylists);
  }, [playlists, id]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleToggle = (playlist) => {
    setSelectedPlaylists((prevSelected) =>
      prevSelected.find((p) => p.id === playlist.id)
        ? prevSelected.filter((p) => p.id !== playlist.id)
        : [...prevSelected, playlist],
    );
  };

  const handleSave = () => {
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
        const updatedSongIds = existingSongIds.filter((id) => id !== id);

        handleChangeSongsToPlaylist(playlist.id, updatedSongIds);
      }
    });

    setSelectedPlaylists([]);
    handleClose();
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
            width: '28ch',
            display: { xs: 'none', md: 'block' },
          },
        }}
      >
        <Box
          sx={{
            maxHeight: 300,
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
                  onClick={() => handleToggle(playlist)}
                  onChange={() => handleToggle(playlist)}
                />
                <ListItemText primary={playlist.name} />
              </MenuItem>
            ))}
        </Box>
        <Divider />
        <MenuItem onClick={handleSave}>Guardar</MenuItem>
      </Menu>
    </div>
  );
};

export default PlaylistMenu;
