import React, { createContext, useContext, useState } from 'react';
import { useCallback } from 'react';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [results, setResults] = useState(null);

  const updateSearchText = useCallback((text) => {
    setSearchText(text);
  }, []);

  const updateResults = useCallback((data) => {
    setResults(data);
  }, []);

  const openSearch = () => {
    setIsSearchVisible(true);
  };
  const closeSearch = () => {
    setIsSearchVisible(false);
  };

  return (
    <SearchContext.Provider
      value={{
        isSearchVisible,
        openSearch,
        closeSearch,
        searchText,
        updateSearchText,
        results,
        updateResults,
      }}
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
