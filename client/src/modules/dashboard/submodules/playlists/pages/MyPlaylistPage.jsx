import React, { useEffect, useContext, useState } from 'react';
import { PanelLayout } from '../../../../../core/layouts/PanelLayout';
import MyPlaylist from '../components/MyPlaylist';
import { useParams } from 'react-router-dom';
import PlaylistContext from '../services/store/my-playlists';

export const MyPlaylistPage = () => {
  const { id } = useParams();
  const [myPlaylist, setMyPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { playlists } = useContext(PlaylistContext);

  useEffect(() => {
    const getAlbum = async () => {
      try {
        const playlist = playlists.find(
          (playlist) => playlist.id === parseInt(id),
        );
        setMyPlaylist(playlist);
      } catch (err) {
        setError('Ocurrió un error al encontrar la playlist');
        throw new Error(err);
      } finally {
        setLoading(false);
      }
    };
    getAlbum();
  }, [id, playlists]);

  return (
    <PanelLayout>
      {error ? (
        <p>{error}</p>
      ) : (
        <MyPlaylist playlist={myPlaylist} loading={loading} />
      )}
    </PanelLayout>
  );
};
