import React, { createContext, useState, useEffect, useContext } from 'react';
import { fetchMusicExplore } from '../../../playlists/helpers/fetchMusicExplore';

const ExploreContext = createContext();

export const ExploreProvider = ({ children }) => {
  const [music, setMusic] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMusic = async () => {
      try {
        const musicData = await fetchMusicExplore();
        setMusic(musicData.similar_songs.slice(-5));
      } catch (err) {
        setError(
          'Error al cargar la música. Por favor, inténtalo de nuevo más tarde.',
        );
        throw new Error(err);
      } finally {
        setLoading(false);
      }
    };

    loadMusic();
  }, []);

  return (
    <ExploreContext.Provider value={{ music, loading, error }}>
      {children}
    </ExploreContext.Provider>
  );
};

export const useExplore = () => {
  return useContext(ExploreContext);
};
