import React, { useContext, useState } from 'react';
import {
  Button,
  Typography,
  TextField,
  Collapse,
  IconButton,
  List,
  ListItemText,
  Box,
  ListItemButton,
  Skeleton,
  Alert,
} from '@mui/material';
import { LibraryAdd, Save, Delete } from '@mui/icons-material';
import { TransitionGroup } from 'react-transition-group';
import { Link } from 'react-router-dom';
import PlaylistContext from '../services/store/my-playlists';

export const CreatePlaylist = () => {
  const {
    playlists,
    loading,
    error,
    saveError,
    deleteError,
    handleSavePlaylist,
    handleRemovePlaylist,
  } = useContext(PlaylistContext);

  const [isInputVisible, setIsInputVisible] = useState(false);
  const [playlistName, setPlaylistName] = useState('');
  const isActive = (path) => location.pathname === path;

  const handleToggleInput = () => {
    setIsInputVisible((prev) => !prev);
  };

  const onSavePlaylist = async () => {
    await handleSavePlaylist(playlistName);
    setPlaylistName('');
    setIsInputVisible(false);
  };

  const onRemovePlaylist = async (event, id) => {
    event.preventDefault();
    event.stopPropagation();
    await handleRemovePlaylist(id);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Button
        variant="text"
        color="inherit"
        onClick={handleToggleInput}
        sx={{
          marginLeft: 2,
          opacity: '0.8',
          '&:hover': {
            opacity: '1',
          },
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <LibraryAdd />
        <Typography sx={{ fontSize: '16px', textTransform: 'capitalize' }}>
          Crear una playlist
        </Typography>
      </Button>

      {loading && (
        <List sx={{ mt: 0 }}>
          {[...Array(3)].map((_, index) => (
            <Skeleton
              key={index}
              variant="rectangular"
              height={50}
              sx={{ marginY: 1, marginX: 2 }}
            />
          ))}
        </List>
      )}

      {error && (
        <Alert severity="error" sx={{ margin: 2 }}>
          {error}
        </Alert>
      )}

      {saveError && (
        <Alert severity="error" sx={{ margin: 2 }}>
          {saveError}
        </Alert>
      )}

      {deleteError && (
        <Alert severity="error" sx={{ margin: 2 }}>
          {deleteError}
        </Alert>
      )}

      {!loading && !error && (
        <List sx={{ mt: 0 }}>
          <Collapse in={isInputVisible}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                margin: 0,
              }}
            >
              <TextField
                value={playlistName}
                onChange={(e) => setPlaylistName(e.target.value)}
                placeholder="Nombre"
                variant="outlined"
                size="small"
                fullWidth
                sx={{ marginY: 1, marginLeft: 2 }}
              />
              <IconButton
                disabled={playlistName.trim().length < 5}
                onClick={onSavePlaylist}
                color="primary"
                sx={{ marginRight: 2 }}
              >
                <Save />
              </IconButton>
            </div>
          </Collapse>
          <TransitionGroup>
            {playlists
              .slice()
              .reverse()
              .map((playlist) => (
                <Collapse in={true} key={playlist.id}>
                  <ListItemButton
                    component={Link}
                    to={`/mis-playlists/${playlist.id}`}
                    sx={{
                      borderRight: isActive(`/mis-playlists/${playlist.id}`)
                        ? '2px solid yellow'
                        : 'none',
                      color: isActive(`/mis-playlists/${playlist.id}`)
                        ? 'secondary.main'
                        : 'text.default',
                    }}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <ListItemText primary={playlist.name} />
                    {!isActive(`/mis-playlists/${playlist.id}`) && (
                      <IconButton
                        onClick={(event) =>
                          onRemovePlaylist(event, playlist.id)
                        }
                      >
                        <Delete />
                      </IconButton>
                    )}
                  </ListItemButton>
                </Collapse>
              ))}
          </TransitionGroup>
        </List>
      )}
    </Box>
  );
};
