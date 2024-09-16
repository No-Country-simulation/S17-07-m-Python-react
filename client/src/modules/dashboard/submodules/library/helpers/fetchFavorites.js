import axios from 'axios';
import { getEnvVariables } from '../../../../../core/utils/getEnvVariables';

const { VITE_API_URL } = getEnvVariables();

export const fetchGetMyFavorites = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${VITE_API_URL}/favorite/get`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.favorites;
  } catch (error) {
    throw new Error('Error al obtener los favoritos: ' + error.message);
  }
};

export const fetchAddToFavorites = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      `${VITE_API_URL}/favorite/add`,
      { element_id: id, category: 'song' },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    throw new Error('Error al agregar a favoritos: ' + error.message);
  }
};

export const fetchRemoveFromFavorites = async (itemId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.delete(
      `${VITE_API_URL}/favorites/remove/${itemId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    throw new Error('Error al eliminar de favoritos: ' + error.message);
  }
};
