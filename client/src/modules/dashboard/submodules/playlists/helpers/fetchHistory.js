import axios from 'axios';
import { getEnvVariables } from '../../../../../core/utils/getEnvVariables';

const { VITE_API_URL } = getEnvVariables();

export const fetchHistory = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${VITE_API_URL}/history/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new error();
  }
};

export const fetchAddHistory = async (idSong) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      `${VITE_API_URL}/history/`,
      { song: idSong },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    throw new error();
  }
};
