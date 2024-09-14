import axios from 'axios';
import { getEnvVariables } from '../../../../../core/utils/getEnvVariables';

const { VITE_API_URL } = getEnvVariables();

export const fetchMusicExplore = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${VITE_API_URL}/discover/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new error();
  }
};
