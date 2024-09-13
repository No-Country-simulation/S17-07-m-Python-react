import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';

import MusicPlayer from '../../modules/dashboard/submodules/player/components/musicPlayer/musicPlayer';
import { MusicPlayerProvider } from '../../modules/dashboard/submodules/playlists/services/store/player';
import { Sidebar } from '../../modules/dashboard/components/Sidebar';
import { SidebarMobile } from '../../modules/dashboard/components/SidebarMobile';
import { TabBar } from '../../modules/dashboard/components/TabBar';
import { useState } from 'react';
import { SearchProvider } from '../../modules/dashboard/submodules/search/pages/store/search';
import { SmartToy } from '@mui/icons-material'; 

import ChatBot from '../../modules/dashboard/submodules/recommendation/components/chatBot';


const drawerWidth = 240;
const drawerWidthMobile = '100vw';

const DashboardLayout = () => {
  const [stateDrawer, setStateDrawer] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const openDrawer = () => {
    setStateDrawer(true);
  };

  const closeDrawer = () => {
    setStateDrawer(false);
  };


  return (
    <MusicPlayerProvider>
      <SearchProvider>
        <Box sx={{ display: 'flex' }}>
          <Box
            sx={{
              display: 'flex',
              zIndex: '1',
              width: `100vw`,
            }}
          >
            <Sidebar drawerWidth={drawerWidth} />
            <SidebarMobile
              drawerWidth={drawerWidthMobile}
              stateDrawer={stateDrawer}
              closeDrawer={closeDrawer}
            />

            <Box
              component="main"
              sx={{
                flexGrow: 1,
                bgcolor: 'background.default',
                p: 2,
                width: { xs: '100%', md: `100% - ${drawerWidth}px` },
                marginBottom: { xs: '168px', md: '134px' },
              }}
            >
              <Outlet />
            </Box>
          </Box>
          <Box sx={{ zIndex: '20', bgcolor: 'background.default' }}>
            <MusicPlayer trackId={3135556} />
            <TabBar
              stateDrawer={stateDrawer}
              openDrawer={openDrawer}
              closeDrawer={closeDrawer}
            />
          </Box>

          {/* Botón para abrir el chat box */}
          <Button
            variant="contained"
            onClick={() => setShowChat(!showChat)}
            startIcon={<SmartToy />} 
            sx={{
              position: 'fixed',
              bottom: 150, 
              right: 24, 
              width: '79px',
              height: '50px',
              padding: '12px 16px',
              gap: '8px',
              borderRadius: '100px 0px 0px 0px',
              opacity: 1, 
              zIndex: 1000, 
              borderRadius: '20px', 
              bgcolor: 'primary.main', 
            }}
          >
          IA
          </Button>

          
           {showChat && (
            <Box
              sx={{
                position: 'fixed',
                bottom: 200,
                right: 24,
                zIndex: 1000,
              }}
            >
              <ChatBot />
            </Box>
          )}
        </Box>
      </SearchProvider>
    </MusicPlayerProvider>
  );
};

export default DashboardLayout;
