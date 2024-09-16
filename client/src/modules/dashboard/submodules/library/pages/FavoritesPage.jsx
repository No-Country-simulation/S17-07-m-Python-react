import React from 'react';
import { PanelLayout } from '../../../../../core/layouts/PanelLayout';
import { Favorites } from '../components/Favorites';

import { useContext } from 'react';
import FavoritesContext from '../services/store/favorites';
import { Alert } from '@mui/material';

export const FavoritesPage = () => {
  const { favorites, loading, error } = useContext(FavoritesContext);

  return (
    <PanelLayout>
      {error ? (
        <Alert severity="error" sx={{ margin: 2 }}>
          {error}
        </Alert>
      ) : (
        <Favorites favorites={favorites} loading={loading} />
      )}
    </PanelLayout>
  );
};
