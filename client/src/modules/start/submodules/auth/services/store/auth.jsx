import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    if (token && username) {
      setLogged(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ logged, setLogged }}>
      {children}
    </AuthContext.Provider>
  );
};
