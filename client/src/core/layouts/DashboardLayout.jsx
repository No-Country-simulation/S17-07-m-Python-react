import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

import MusicPlayer from '../../modules/dashboard/submodules/player/components/musicPlayer/musicPlayer';
import { MusicPlayerProvider } from '../../modules/dashboard/submodules/playlists/services/store/player';
import { Sidebar } from '../../modules/dashboard/components/Sidebar';

const drawerWidth = 240;

const DashboardLayout = () => {
  return (
    <MusicPlayerProvider>
      <Box sx={{ display: 'flex' }}>
        <Box
          sx={{
            display: 'flex',
            zIndex: '1',
            width: `100vw`,
          }}
        >
          <Sidebar drawerWidth={drawerWidth} />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              bgcolor: 'background.default',
              p: 2,
              minWidth: `100% - ${drawerWidth}px`,
            }}
          >
            <Outlet />
          </Box>
        </Box>
        <Box sx={{ zIndex: '20', bgcolor: 'background.default' }}>
          <MusicPlayer trackId={3135556} />
        </Box>
      </Box>
    </MusicPlayerProvider>
  );
};

export default DashboardLayout;
