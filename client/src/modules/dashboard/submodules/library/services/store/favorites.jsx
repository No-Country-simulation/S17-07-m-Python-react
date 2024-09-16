import React, { createContext, useState, useEffect } from 'react';
import {
  fetchGetMyFavorites,
  fetchAddToFavorites,
  fetchRemoveFromFavorites,
} from '../../helpers/fetchFavorites';

const FavoritesContext = createContext();

export const MyFavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saveError, setSaveError] = useState(null);
  const [deleteError, setDeleteError] = useState(null);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        setLoading(true);
        const fetchedFavorites = await fetchGetMyFavorites();
        setFavorites(fetchedFavorites);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar los favoritos.');
        setLoading(false);
        throw new Error(err);
      }
    };

    loadFavorites();
  }, []);

  const handleAddToFavorites = async (item) => {
    try {
      await fetchAddToFavorites(item);
      const fetchedFavorites = await fetchGetMyFavorites();
      setFavorites(fetchedFavorites);
      setSaveError(null);
    } catch (err) {
      setSaveError('Error al agregar a favoritos.');
      throw new Error(err);
    }
  };

  const handleRemoveFromFavorites = async (id) => {
    try {
      await fetchRemoveFromFavorites(id);
      const fetchedFavorites = await fetchGetMyFavorites();
      setFavorites(fetchedFavorites);
      setDeleteError(null);
    } catch (err) {
      setDeleteError('Error al eliminar de favoritos.');
      throw new Error(err);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        loading,
        error,
        saveError,
        deleteError,
        handleAddToFavorites,
        handleRemoveFromFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesContext;
