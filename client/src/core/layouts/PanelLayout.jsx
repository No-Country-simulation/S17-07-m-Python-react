import React from 'react';
import { TopBar } from '../../modules/dashboard/components/TopBar';

import { GridSearchCard } from '../../modules/dashboard/submodules/search/components/GridSearchCard';
import { useSearch } from '../../modules/dashboard/submodules/search/services/store/search';

export const PanelLayout = ({ children }) => {
  const { results, searchText } = useSearch();

  return (
    <>
      <TopBar />
      {searchText !== '' ? <GridSearchCard cards={results} /> : children}
    </>
  );
};
