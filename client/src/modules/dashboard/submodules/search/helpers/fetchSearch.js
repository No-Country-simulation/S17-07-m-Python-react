import axios from 'axios';
import { getEnvVariables } from '../../../../../core/utils/getEnvVariables';

const { VITE_API_URL } = getEnvVariables();

export const searchMusic = async (query) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${VITE_API_URL}/search/query`, {
      params: {
        q: query,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response.data.data;
  } catch (error) {
    throw new Error('No se pudo realizar la búsqueda', error);
  }
};
