import axios from 'axios';
import { getEnvVariables } from '../../../../../core/utils/getEnvVariables';

const { VITE_API_MUSIC } = getEnvVariables();

export const searchMusic = async (query) => {
  try {
    const response = await axios.get(`${VITE_API_MUSIC}/search`, {
      params: {
        q: query,
      },
    });
    return response.data.data;
  } catch (error) {
    throw new Error('No se pudo realizar la búsqueda', error);
  }
};
