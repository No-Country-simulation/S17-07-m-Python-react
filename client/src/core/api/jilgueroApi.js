import axios from 'axios';
import { getEnvVariables } from '../utils/getEnvVariables';

const { VITE_API_URL } = getEnvVariables();
const jilgueroApi = axios.create({
  baseURL: VITE_API_URL,
});

jilgueroApi.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    'x-token': localStorage.getItem('token'),
  };
  return config;
});

export default jilgueroApi;
