import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
  Skeleton,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { fetchPopularArtists } from '../../helpers/fetchPopularArtists';

export const EmergingArtists = () => {
  const [artists, setArtists] = useState([]);
  const [checkedArtists, setCheckedArtists] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadArtists = async () => {
      try {
        setLoading(true);
        const artistsData = await fetchPopularArtists(5);
        setArtists(artistsData);
      } catch (err) {
        setError('Error cargando los artistas', err);
      } finally {
        setLoading(false);
      }
    };

    loadArtists();
  }, []);

  const handleCheckboxChange = (artistId) => {
    setCheckedArtists((prev) => ({
      ...prev,
      [artistId]: !prev[artistId],
    }));
  };

  if (loading) {
    return (
      <Box>
        <Typography variant="body2" sx={{ margin: 0 }}>
          Artistas populares
        </Typography>
        <List dense sx={{ width: '100%', bgcolor: 'none' }}>
          {[...Array(5)].map((_, index) => (
            <ListItem key={index} disablePadding sx={{ mb: '4px' }}>
              <ListItemButton>
                <ListItemAvatar>
                  <Skeleton variant="circular">
                    <Avatar />
                  </Skeleton>
                </ListItemAvatar>
                <ListItemText
                  primary={<Skeleton />}
                  secondary={<Skeleton width="60%" />}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    );
  }

  if (error) return <p>{error}</p>;

  return (
    <Box>
      <Typography variant="body2" sx={{ margin: 0 }}>
        Artistas populares
      </Typography>
      <List dense sx={{ width: '100%', bgcolor: 'none' }}>
        {artists.map((artist) => {
          const labelId = `checkbox-list-secondary-label-${artist.id}`;
          return (
            <ListItem
              key={artist.id}
              secondaryAction={
                <IconButton
                  edge="end"
                  onClick={() => handleCheckboxChange(artist.id)}
                  aria-label="favorite"
                >
                  {checkedArtists[artist.id] ? (
                    <FavoriteIcon />
                  ) : (
                    <FavoriteBorderIcon />
                  )}
                </IconButton>
              }
              disablePadding
              sx={{ mb: '4px' }}
            >
              <ListItemButton sx={{ bgcolor: 'brown.main', borderRadius: 2 }}>
                <ListItemAvatar>
                  <Avatar alt={artist.name} src={artist.picture_medium} />
                </ListItemAvatar>
                <ListItemText id={labelId} primary={artist.name} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};
