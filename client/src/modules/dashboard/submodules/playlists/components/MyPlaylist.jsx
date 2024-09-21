import React, { useEffect, useState, useContext } from 'react';
import {
  Box,
  Typography,
  IconButton,
  TableCell,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  Skeleton,
  TextField,
  Button,
  Grid,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useTheme } from '@emotion/react';
import { MusicPlayerContext } from '../services/store/player';
import myPlaylistImage from '../../../../../core/assets/my-playlist.svg';
import { hexToRgba } from '../../../../../core/utils/hexToRgba';
import PlaylistContext from '../services/store/my-playlists';
import { formatDuration } from '../../../../../core/utils/formatDuration';
import ToggleFavorite from '../../library/components/ToggleFavorite';
import PlaylistMenu from './PlaylistMenu';

function MyPlaylist({ playlist, loading }) {
  const { myPlaylistData, selectTrack, currentTrackIndex, addToMyPlaylist } =
    useContext(MusicPlayerContext);
  const { handleChangeNameToPlaylist } = useContext(PlaylistContext);

  const theme = useTheme();

  const [selectedTrack, setSelectedTrack] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const [playlistName, setPlaylistName] = useState('');
  const [originalName, setOriginalName] = useState('');

  const handleSaveName = async () => {
    try {
      await handleChangeNameToPlaylist(playlist.id, playlistName);
      setIsEditing(false);
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleCancelEdit = () => {
    setPlaylistName(originalName);
    setIsEditing(false);
  };

  useEffect(() => {
    if (playlist) {
      const trackIds = playlist.songs.map((track) => track.id);
      setPlaylistName(playlist.name);
      setOriginalName(playlist.name);
      addToMyPlaylist(trackIds);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playlist]);

  const onSelectTrack = (trackIndex) => {
    setSelectedTrack(trackIndex);
    selectTrack(trackIndex);
  };

  const backgroundStyle = {
    backgroundImage: `linear-gradient(180deg, ${hexToRgba(
      theme.palette.background.default,
      0.85,
    )}, ${hexToRgba(theme.palette.brown.main, 0.85)})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <Box sx={{ ...backgroundStyle, p: 0, width: '100%', height: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          px: 2,
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        {loading ? (
          <Skeleton
            variant="rectangular"
            width={150}
            height={150}
            sx={{ borderRadius: 2, mr: 3, mt: 2 }}
          />
        ) : (
          <Box
            component="img"
            src={myPlaylistData?.[0]?.album?.cover_medium || myPlaylistImage}
            alt="Album Cover"
            sx={{ width: 150, height: 150, borderRadius: 2, mr: 3, mt: 2 }}
          />
        )}
        <Box>
          {loading ? (
            <>
              <Skeleton variant="text" width={200} height={40} />
              <Skeleton variant="text" width={150} height={30} />
              <Skeleton variant="text" width={150} height={30} />
            </>
          ) : (
            <>
              <Typography variant="h6" sx={{ color: 'secondary.main' }}>
                Mi playlist
              </Typography>
              {isEditing ? (
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      value={playlistName}
                      onChange={(e) => setPlaylistName(e.target.value)}
                      variant="outlined"
                      size="small"
                    />
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <Button
                      fullWidth
                      disabled={
                        playlistName === originalName ||
                        playlistName === '' ||
                        playlistName?.length < 5
                      }
                      startIcon={<SaveIcon />}
                      onClick={handleSaveName}
                      variant="contained"
                      color="primary"
                    >
                      Guardar
                    </Button>
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <Button
                      fullWidth
                      startIcon={<CancelIcon />}
                      onClick={handleCancelEdit}
                      variant="outlined"
                      color="secondary"
                    >
                      Cancelar
                    </Button>
                  </Grid>
                </Grid>
              ) : (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    {playlist?.name}
                  </Typography>
                  <IconButton
                    onClick={() => setIsEditing(true)}
                    size="small"
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                </Box>
              )}
              <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
                # {playlist ? playlist['songs amount'] : ''}
              </Typography>
            </>
          )}
        </Box>
      </Box>

      <Box sx={{ p: 2 }}>
        <TableContainer
          sx={{
            borderRadius: 4,
            maxHeight: 'calc(100vh - 440px)',
            overflowY: 'auto',
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Título</TableCell>
                <TableCell>Artistas</TableCell>
                <TableCell>Duración</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading || !Array.isArray(playlist?.songs)
                ? [...Array(5).keys()].map((index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Skeleton variant="text" width={40} />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" width={200} />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" width={150} />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" width={100} />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="circular" width={24} height={24} />
                      </TableCell>
                    </TableRow>
                  ))
                : (myPlaylistData || [])?.map((track, index) => {
                    return (
                      <TableRow
                        key={index}
                        sx={{
                          cursor: 'pointer',
                          backgroundColor:
                            selectedTrack === index
                              ? 'rgba(0, 0, 0, 0.1)'
                              : 'inherit',
                          '&:hover': { backgroundColor: 'brown.main' },
                        }}
                        onClick={() => onSelectTrack(index)}
                      >
                        <TableCell>
                          {currentTrackIndex === index ? (
                            <PlayArrowIcon color="secondary" />
                          ) : (
                            <Typography>{index + 1}</Typography>
                          )}
                        </TableCell>
                        <TableCell
                          sx={{
                            color: (theme) =>
                              currentTrackIndex === index &&
                              theme.palette.secondary.main,
                          }}
                        >
                          {track?.title}
                        </TableCell>
                        <TableCell
                          sx={{
                            color: (theme) =>
                              currentTrackIndex === index &&
                              theme.palette.secondary.main,
                          }}
                        >
                          {track?.artist?.name}
                        </TableCell>
                        <TableCell
                          sx={{
                            color: (theme) =>
                              currentTrackIndex === index &&
                              theme.palette.secondary.main,
                          }}
                        >
                          {track?.duration
                            ? formatDuration(track.duration)
                            : '00:00'}
                        </TableCell>
                        <TableCell sx={{ display: 'flex' }}>
                          <ToggleFavorite id={track?.id} />
                          <PlaylistMenu id={track?.id} />
                        </TableCell>
                      </TableRow>
                    );
                  })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default MyPlaylist;
