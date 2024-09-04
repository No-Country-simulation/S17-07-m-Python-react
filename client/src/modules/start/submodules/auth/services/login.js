import axios from 'axios';
import { getEnvVariables } from '../../../../../core/utils/getEnvVariables';

const { VITE_API_URL } = getEnvVariables();

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${VITE_API_URL}/login/`, {
      username: username,
      password: password,
    });

    if (response.status === 200) {
      const token = response.data.token;
      localStorage.setItem('token', token);
      localStorage.setItem('tokenDate', Date.now().toString());
      localStorage.setItem('username', username);

      return {
        ok: true,
        message: '¡Inicio de sesión exitoso!',
        token: token,
      };
    }
  } catch (error) {
    if (error.response && error.response.status === 400) {
      return {
        ok: false,
        message: 'Credenciales incorrectas',
      };
    } else {
      return {
        ok: false,
        message: `Unexpected error: ${error.message}`,
      };
    }
  }
};
