import { Search, Menu, House } from '@mui/icons-material';
import { AppBar, Tab, Tabs } from '@mui/material';
import React, { useEffect } from 'react';
import { useSearch } from '../submodules/search/pages/store/search';

export const TabBar = ({ stateDrawer, openDrawer, closeDrawer }) => {
  const [value, setValue] = React.useState(0);
  const { openSearch, closeSearch } = useSearch();
  const { updateSearchText } = useSearch();

  useEffect(() => {
    if (stateDrawer) setValue(2);
  }, [stateDrawer]);

  const handleChange = (event, newValue) => {
    setValue(newValue);

    if (newValue === 2) {
      openDrawer();
    } else if (newValue === 1) {
      openSearch();
      closeDrawer();
    } else {
      closeDrawer();
      closeSearch();
      updateSearchText('');
    }
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        top: 'auto',
        bottom: 0,
        display: { xs: 'flex', md: 'none' },
      }}
    >
      <Tabs
        variant="fullWidth"
        value={value}
        onChange={handleChange}
        aria-label="icon tabs example"
        sx={{
          bgcolor: 'background.default',
          display: 'flex',
        }}
      >
        <Tab icon={<House />} aria-label="home" />
        <Tab icon={<Search />} aria-label="search" />
        <Tab icon={<Menu />} aria-label="menu" />
      </Tabs>
    </AppBar>
  );
};
