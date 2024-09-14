import React, { useState, useEffect } from 'react';
import { PanelLayout } from '../../../../../core/layouts/PanelLayout';
import { Explore } from '../components/Explore';
import { fetchMusicExplore } from '../../playlists/helpers/fetchMusicExplore';
import { Alert } from '@mui/material';

export const ExplorePage = () => {
  const [music, setMusic] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const loadMusic = async () => {
      try {
        const musicData = await fetchMusicExplore();
        setMusic(musicData.similar_songs);

      } catch (err) {
        setError(
          'Error al cargar la música. Por favor, inténtalo de nuevo más tarde.',
        );
        throw new Error('Failed to load music. Please try again later.', err);
      } finally {
        setLoading(false);
      }
    };

    loadMusic();
  }, []);

  return (
    <PanelLayout>
      {error ? (
        <Alert severity="error" sx={{ margin: 2 }}>
          {error}
        </Alert>
      ) : (
        <Explore music={music} loading={loading} />
      )}
      
    </PanelLayout>
  );
};
