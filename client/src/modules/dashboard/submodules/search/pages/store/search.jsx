import React, { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const openSearch = () => {
    setIsSearchVisible(true);
  };
  const closeSearch = () => {
    setIsSearchVisible(false);
  };

  return (
    <SearchContext.Provider
      value={{ isSearchVisible, openSearch, closeSearch }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch debe usarse dentro de un SearchProvider');
  }
  return context;
};
