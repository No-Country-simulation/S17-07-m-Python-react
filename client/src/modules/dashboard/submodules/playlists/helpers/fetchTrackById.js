import axios from 'axios';
import { getEnvVariables } from '../../../../../core/utils/getEnvVariables';

const { VITE_API_MUSIC } = getEnvVariables();

export const fetchTrackById = async (trackId) => {
  try {
    const response = await axios.get(`${VITE_API_MUSIC}/track/${trackId}`);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
