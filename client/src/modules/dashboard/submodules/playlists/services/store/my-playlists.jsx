import React, { createContext, useState, useEffect } from 'react';
import {
  fetchGetMyPlaylists,
  fetchCreateMyPlaylist,
  fetchDeleteMyPlaylist,
  fetchUpdateSongsToMyPlaylist,
  fetchUpdateNameMyPlaylist,
} from '../../helpers/fetchMyPlaylists';

const PlaylistContext = createContext();

export const MyPlaylistProvider = ({ children }) => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saveError, setSaveError] = useState(null);
  const [deleteError, setDeleteError] = useState(null);

  useEffect(() => {
    const loadPlaylists = async () => {
      try {
        setLoading(true);
        const fetchedPlaylists = await fetchGetMyPlaylists();
        setPlaylists(fetchedPlaylists);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar las playlists.');
        setLoading(false);
        throw new Error(err);
      }
    };

    loadPlaylists();
  }, []);

  const handleSavePlaylist = async (playlistName) => {
    if (playlistName.trim().length >= 5) {
      try {
        await fetchCreateMyPlaylist(playlistName);
        const fetchedPlaylists = await fetchGetMyPlaylists();
        setPlaylists(fetchedPlaylists);
        setSaveError(null);
      } catch (err) {
        setSaveError('Error al crear la playlist.');
        throw new Error(err);
      }
    }
  };

  const handleRemovePlaylist = async (id) => {
    try {
      await fetchDeleteMyPlaylist(id);
      const fetchedPlaylists = await fetchGetMyPlaylists();
      setPlaylists(fetchedPlaylists);
      setDeleteError(null);
    } catch (err) {
      setDeleteError('Error al eliminar la playlist.');
      throw new Error(err);
    }
  };

  const handleChangeSongsToPlaylist = async (id, songs) => {
    try {
      await fetchUpdateSongsToMyPlaylist(id, songs);
      const fetchedPlaylists = await fetchGetMyPlaylists();
      setPlaylists(fetchedPlaylists);
    } catch (err) {
      throw new Error(err);
    }
  };

  const handleChangeNameToPlaylist = async (id, name) => {
    try {
      await fetchUpdateNameMyPlaylist(id, name);
      const fetchedPlaylists = await fetchGetMyPlaylists();
      setPlaylists(fetchedPlaylists);
    } catch (err) {
      throw new Error(err);
    }
  };

  return (
    <PlaylistContext.Provider
      value={{
        playlists,
        loading,
        error,
        saveError,
        deleteError,
        handleSavePlaylist,
        handleRemovePlaylist,
        handleChangeSongsToPlaylist,
        handleChangeNameToPlaylist,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};

export default PlaylistContext;
