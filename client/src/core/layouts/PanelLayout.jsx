import React from 'react';
import { TopBar } from '../../modules/dashboard/components/TopBar';
import { useSearch } from '../../modules/dashboard/submodules/search/pages/store/search';
import { GridSearchCard } from '../../modules/dashboard/submodules/search/components/GridSearchCard';

export const PanelLayout = ({ children }) => {
  const { results, searchText } = useSearch();

  return (
    <>
      <TopBar />
      {searchText !== '' ? <GridSearchCard cards={results} /> : children}
    </>
  );
};
