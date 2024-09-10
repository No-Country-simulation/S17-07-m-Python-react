import React, { useState, useEffect } from 'react';
import { Box, Grid, Skeleton, Typography } from '@mui/material';
import { PanelLayout } from '../../../core/layouts/PanelLayout';
import { Banner } from '../components/home/Banner';
import { EmergingArtists } from '../components/home/EmergingArtists';

import { fetchPopularAlbums } from '../helpers/fetchPopularAlbums';
import GridMusicCards from '../components/home/GridMusicCards';

export const HomePage = () => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAlbums = async () => {
      try {
        setLoading(true);
        const data = await fetchPopularAlbums(36);
        setAlbums(data);
      } catch (err) {
        setError('Error cargando los albums', err);
      } finally {
        setLoading(false);
      }
    };

    loadAlbums();
  }, []);

  const chunks = [];
  for (let i = 0; i < albums.length; i += 6) {
    chunks.push(albums.slice(i, i + 6));
  }

  const titles = [
    'Nuevos lanzamientos',
    'En tendencia',
    'Top charts',
    'Recomendaciones',
    'Álbumes destacados',
    'Artistas emergentes',
  ];

  return (
    <PanelLayout>
      <Grid container alignItems="stretch" spacing={1} marginY={2}>
        <Grid item xs={12} md={8}>
          <Banner album={albums[4]} />
        </Grid>
        <Grid item xs={12} md={4}>
          <EmergingArtists />
        </Grid>
      </Grid>

      <Box sx={{ marginY: 2 }}>
        {loading ? (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box sx={{ padding: 2 }}>
                <Skeleton variant="rectangular" width="100%" height={200} />
              </Box>
              <Box sx={{ padding: 2 }}>
                <Skeleton variant="rectangular" width="100%" height={200} />
              </Box>
              <Box sx={{ padding: 2 }}>
                <Skeleton variant="rectangular" width="100%" height={200} />
              </Box>
              <Box sx={{ padding: 2 }}>
                <Skeleton variant="rectangular" width="100%" height={200} />
              </Box>
              <Box sx={{ padding: 2 }}>
                <Skeleton variant="rectangular" width="100%" height={200} />
              </Box>
            </Grid>
          </Grid>
        ) : error ? (
          <Typography variant="body1" color="error">
            {error}
          </Typography>
        ) : (
          chunks.map((chunk, index) => (
            <Box key={index} sx={{ marginY: 2 }}>
              <Typography variant="h6" sx={{ marginBottom: 2 }}>
                {titles[index] ?? titles[0]}
              </Typography>
              <GridMusicCards music={chunk} />
            </Box>
          ))
        )}
      </Box>
    </PanelLayout>
  );
};
