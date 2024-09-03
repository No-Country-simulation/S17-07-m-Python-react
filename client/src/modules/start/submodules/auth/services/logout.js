import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './store/auth';

export const useLogout = () => {
  const navigate = useNavigate();
  const { setLogged } = useContext(AuthContext);

  const logout = () => {
    localStorage.removeItem('username');

    if (setLogged) {
      setLogged(false);
    }

    navigate('/login');
  };

  return logout;
};
