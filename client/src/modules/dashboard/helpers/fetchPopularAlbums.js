import axios from 'axios';
import { getEnvVariables } from '../../../core/utils/getEnvVariables';

const { VITE_API_URL } = getEnvVariables();

export const fetchPopularAlbums = async (limit = 5) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${VITE_API_URL}/search/charts`, {
      params: {
        limit: limit,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response.data.tracks.data;
  } catch (error) {
    throw new error();
  }
};
