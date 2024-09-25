import axios from 'axios';
import { getEnvVariables } from '../../../../../core/utils/getEnvVariables';

const { VITE_API_URL } = getEnvVariables();

export const fetchAlbumById = async (albumId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${VITE_API_URL}/search/category/album/${albumId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response.data.data;
  } catch (error) {
    throw new error();
  }
};
