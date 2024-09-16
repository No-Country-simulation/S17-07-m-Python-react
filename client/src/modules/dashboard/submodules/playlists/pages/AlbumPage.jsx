import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PanelLayout } from '../../../../../core/layouts/PanelLayout';
import Album from '../components/Album';
import { fetchAlbumById } from '../helpers/fetchAlbum';

export const AlbumPage = () => {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAlbum = async () => {
      try {
        const albumData = await fetchAlbumById(id);
        setAlbum(albumData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getAlbum();
  }, [id]);

  if (error) return <div>Error cargando el album {error.message}</div>;

  return (
    <PanelLayout>
      <Album album={album} loading={loading} />
    </PanelLayout>
  );
};
