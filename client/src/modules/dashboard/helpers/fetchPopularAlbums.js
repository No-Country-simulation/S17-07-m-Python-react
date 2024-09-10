import axios from 'axios';
import { getEnvVariables } from '../../../core/utils/getEnvVariables';

const { VITE_API_MUSIC } = getEnvVariables();

export const fetchPopularAlbums = async (limit = 5) => {
  try {
    const response = await axios.get(`${VITE_API_MUSIC}/chart/0`, {
      params: {
        limit: limit,
      },
    });
    return response.data.albums.data;
  } catch (error) {
    throw new error();
  }
};
