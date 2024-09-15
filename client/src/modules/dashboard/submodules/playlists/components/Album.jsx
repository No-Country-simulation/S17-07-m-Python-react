import React from 'react';
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
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useTheme } from '@emotion/react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { MusicPlayerContext } from '../services/store/player';
import { hexToRgba } from '../../../../../core/utils/hexToRgba';
import { formatDuration } from '../../../../../core/utils/formatDuration';

function Album({ album, loading }) {
  const { setTrackId, setType, selectTrack, currentTrackIndex } =
    useContext(MusicPlayerContext);

  const theme = useTheme();

  useEffect(() => {
    if (album) {
      setTrackId(album.id);
      setType('album');
    }
  }, [album, setTrackId, setType]);

  const [favorites, setFavorites] = React.useState([]);
  const [selectedTrack, setSelectedTrack] = React.useState(null);
  const [notification, setNotification] = React.useState(false);

  const backgroundStyle = {
    backgroundImage: `linear-gradient(180deg, ${hexToRgba(theme.palette.background.default, 0.85)}, ${hexToRgba(theme.palette.brown.main, 0.85)}), url('${album?.cover_big}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    border: '-8px solid transparent',
    borderImage: `linear-gradient(45deg, ${hexToRgba(theme.palette.background.default, 0.5)}, ${hexToRgba(theme.palette.brown.main, 0.5)}) 1`,
    borderImageSlice: 1,
  };

  const toggleFavorite = (trackNumber) => {
    if (favorites.includes(trackNumber)) {
      setFavorites(favorites.filter((fav) => fav !== trackNumber));
    } else {
      setFavorites([...favorites, trackNumber]);
      showNotification();
    }
  };

  const showNotification = () => {
    setNotification(true);
    setTimeout(() => {
      setNotification(false);
    }, 2000);
  };

  const onSelectTrack = (trackNumber) => {
    setSelectedTrack(trackNumber);
    selectTrack(trackNumber);
  };

  return (
    <Box
      sx={{
        p: 0,
        width: '100%',
        height: { xs: `calc(100vh)`, md: `calc(100vh - 168px)` },
        marginTop: '-64px',
        borderRadius: 4,
        ...backgroundStyle,
      }}
    >
      {notification && (
        <Box
          sx={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            backgroundColor: 'rgba(0,0,0,0.7)',
            color: 'white',
            p: 2,
            borderRadius: 1,
          }}
        >
          Se ha añadido a favoritos
        </Box>
      )}

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          paddingTop: '80px',
          px: 2,
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        {loading ? (
          <Skeleton
            variant="rectangular"
            width={150}
            height={150}
            sx={{ borderRadius: 2, mr: 3, mt: 4 }}
          />
        ) : (
          <Box
            component="img"
            src={album?.cover_medium}
            alt="Album Cover"
            sx={{ width: 150, height: 150, borderRadius: 2, mr: 3, mt: 4 }}
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
              <Typography
                variant="h6"
                sx={{ color: 'secondary.main', textTransform: 'capitalize' }}
              >
                {album.type}
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                {album.title}
              </Typography>
              <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
                {album.artist.name}
              </Typography>
            </>
          )}
        </Box>
      </Box>

      <Box sx={{ padding: 2 }}>
        <TableContainer
          sx={{
            borderRadius: 4,
            maxHeight: 'calc(100vh - 440px)',
            overflowY: 'auto',
          }}
        >
          <Table aria-label="track table">
            <TableHead>
              <TableRow
                sx={{
                  borderBottom: '2px solid yellow',
                }}
              >
                <TableCell>#</TableCell>
                <TableCell>Título</TableCell>
                <TableCell>Artistas</TableCell>
                <TableCell>Duración</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading || !Array.isArray(album?.tracks?.data)
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
                : (album?.tracks?.data || []).map((track, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        cursor: 'pointer',
                        backgroundColor:
                          selectedTrack === index
                            ? 'rgba(0, 0, 0, 0.1)'
                            : 'inherit',
                        '&:hover': { backgroundColor: 'brown.main' },
                        borderBottom: 'none',
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
                      <TableCell>
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(track.id);
                          }}
                        >
                          {favorites.includes(track.id) ? (
                            <FavoriteIcon />
                          ) : (
                            <FavoriteBorderIcon />
                          )}
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default Album;
