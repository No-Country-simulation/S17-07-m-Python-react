import React, { useContext, useState } from 'react';
import { IconButton, Snackbar, Alert } from '@mui/material';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import FavoritesContext from '../services/store/favorites';
import { useEffect } from 'react';

const ToggleFavorite = ({ id }) => {
  const { favorites, handleAddToFavorites, handleRemoveFromFavorites } =
    useContext(FavoritesContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');

  useEffect(() => {
    const isFavorite = favorites.some((fav) => fav.element_id == id);
    setIsFavorite(isFavorite);
  }, [favorites, id]);

  const handleToggleFavorite = async (event) => {
    event.stopPropagation();
    setLoading(true);
    try {
      if (isFavorite) {
        await handleRemoveFromFavorites(id);
        setSnackbarMessage('Removed from favorites');
      } else {
        await handleAddToFavorites(id);
        setSnackbarMessage('Added to favorites');
      }
      setIsFavorite(!isFavorite);
      setSnackbarSeverity('success');
    } catch (error) {
      setSnackbarMessage('Error toggling favorite');
      setSnackbarSeverity('error');
      throw new Error(error);
    } finally {
      setLoading(false);
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <IconButton onClick={handleToggleFavorite} disabled={loading || !id}>
        {isFavorite ? (
          <FavoriteOutlinedIcon sx={{ fontSize: '1.5rem' }} />
        ) : (
          <FavoriteBorderOutlinedIcon sx={{ fontSize: '1.5rem' }} />
        )}
      </IconButton>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{
          '& .MuiSnackbarContent-root': {
            backgroundColor: 'green',
            color: 'white',
            fontSize: '1rem',
            borderRadius: '8px',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{
            '& .MuiAlert-icon': {
              color: 'white',
            },
            '& .MuiAlert-message': {
              fontWeight: 'bold',
            },
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ToggleFavorite;
