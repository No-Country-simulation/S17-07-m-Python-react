import axios from 'axios';
import { getEnvVariables } from '../../../../../core/utils/getEnvVariables';

const { VITE_API_MUSIC } = getEnvVariables();

export const fetchAlbumById = async (albumId) => {
  try {
    const response = await axios.get(`${VITE_API_MUSIC}/album/${albumId}`);
    return response.data;
  } catch (error) {
    throw new error();
  }
};
