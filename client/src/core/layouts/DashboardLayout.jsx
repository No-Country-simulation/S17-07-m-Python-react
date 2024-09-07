import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import {
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import { useLogout } from '../../modules/start/submodules/auth/services/logout';
import MusicPlayer from '../../modules/dashboard/submodules/player/components/musicPlayer/musicPlayer';
import { MusicPlayerProvider } from '../../modules/dashboard/submodules/playlists/services/store/player';
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
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
                bgcolor: 'brown.main',
              },
            }}
            variant="permanent"
            anchor="left"
          >
            <Toolbar>
              <Typography variant="h6" noWrap component="div">
                Dashboard
              </Typography>
            </Toolbar>
            <List>
              <ListItem button component={Link} to="/">
                <ListItemText primary="Home" />
              </ListItem>
              <Button
                onClick={useLogout()}
                variant="text"
                color="warning"
                fullWidth
              >
                Salir
              </Button>
            </List>
          </Drawer>
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
