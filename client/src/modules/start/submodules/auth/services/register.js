import axios from 'axios';
import { getEnvVariables } from '../../../../../core/utils/getEnvVariables';

const { VITE_API_URL } = getEnvVariables();

export const register = async (username, email, password) => {
  try {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);

    const response = await axios.post(`${VITE_API_URL}/register/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.status === 201) {
      return {
        ok: true,
        message: '¡Registro exitoso!',
      };
    }
  } catch (error) {
    if (error.response && error.response.status === 400) {
      const errors = error.response.data.errors || {};
      let message = 'Datos inválidos';

      if (errors.username) {
        message = `Usuario con ese nombre ya existe`;
      }
      if (errors.email) {
        message = `Correo electrónico con ese usuario ya existe`;
      }

      return {
        ok: false,
        message: message,
      };
    } else {
      return {
        ok: false,
        message: `Unexpected error: ${error.message}`,
      };
    }
  }
};
