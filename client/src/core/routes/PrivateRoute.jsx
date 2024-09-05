import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const tokenDate = localStorage.getItem('tokenDate');
  const username = localStorage.getItem('username');

  if (!token || !username || !tokenDate) {
    return <Navigate to="/login" />;
  }

  const tokenTime = parseInt(tokenDate, 10);
  const currentTime = Date.now();
  const twentyFourHours = 24 * 60 * 60 * 1000; // 24 horas

  if (currentTime - tokenTime > twentyFourHours) {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('tokenDate');
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
