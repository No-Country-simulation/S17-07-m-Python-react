import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');

  if (!token || !username) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
