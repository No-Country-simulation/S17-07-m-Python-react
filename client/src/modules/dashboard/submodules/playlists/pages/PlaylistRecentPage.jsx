import React from 'react';
import { PanelLayout } from '../../../../../core/layouts/PanelLayout';
import { useState } from 'react';
import { useEffect } from 'react';

import { fetchHistory } from '../helpers/fetchHistory';
import { History } from '../components/History';

export const PlaylistRecentPage = () => {
  const [history, setHistory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAlbum = async () => {
      try {
        const historyData = await fetchHistory();
        setHistory(historyData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getAlbum();
  }, []);

  if (error) return <div>Error cargando el album {error.message}</div>;

  return (
    <PanelLayout>
      <History history={history} loading={loading} />
    </PanelLayout>
  );
};
