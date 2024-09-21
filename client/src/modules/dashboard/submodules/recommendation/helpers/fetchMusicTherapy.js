import axios from 'axios';
import { getEnvVariables } from '../../../../../core/utils/getEnvVariables';

const { VITE_API_URL } = getEnvVariables();

export const fetchMusicTherapy = async (text) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      `${VITE_API_URL}/buscar-canciones-deezer/`,
      {
        texto: text,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
