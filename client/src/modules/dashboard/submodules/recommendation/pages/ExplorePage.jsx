import React from 'react';
import { PanelLayout } from '../../../../../core/layouts/PanelLayout';
import { Explore } from '../components/Explore';
import { Alert } from '@mui/material';
import { useExplore } from '../services/store/explore';

export const ExplorePage = () => {
  const { music, loading, error } = useExplore();

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
