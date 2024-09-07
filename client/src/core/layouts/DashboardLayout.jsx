import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import { useLogout } from '../../modules/start/submodules/auth/services/logout';
import MusicPlayer from '../../modules/dashboard/submodules/player/components/musicPlayer/musicPlayer';
import { MusicPlayerProvider } from '../../modules/dashboard/submodules/playlists/services/store/player';
import logo from '../../../public/logo3.png';

const drawerWidth = 240;

const DashboardLayout = () => {
  const theme = useTheme();
  const location = useLocation();

  // Función para determinar si el botón está activo
  const isActive = (path) => location.pathname === path;

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

      <Box sx={{ display: 'flex' }}>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Toolbar>
            <Box
              component="img"
              src={logo}
              alt="Logo"
              sx={{
                width: '131.87px',
                height: '59.06px',
                marginTop: '15px',
                marginLeft: '41px',
                marginBottom: '40px',
              }}
            />
          </Toolbar>
          <List>
            {/* Botón Home */}
            <ListItem
              button
              component={Link}
              to="/"
              sx={{
                color: isActive('/') ? theme.palette.primary.main : '#fff',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Button
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                    color: isActive('/') ? theme.palette.primary.main : '#fff',
                    textTransform: 'none',
                  }}
                >
                  <Box
                    component="svg"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    sx={{
                      width: '24px',
                      height: '24px',
                      fill: isActive('/') ? theme.palette.primary.main : '#fff',
                    }}
                  >
                    <path d="M 12 2.0996094 L 1 12 L 4 12 L 4 21 L 10 21 L 10 15 L 14 15 L 14 21 L 20 21 L 20 12 L 23 12 L 12 2.0996094 z"></path>
                  </Box>

                  <Box sx={{ fontSize: '16px' }}>Home</Box>
                </Button>
              </Box>
            </ListItem>

            {/* Botón Artistas favoritos */}
            <ListItem
              button
              component={Link}
              to="/artistas"
              sx={{
                color: isActive('/artistas')
                  ? theme.palette.primary.main
                  : '#fff',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Button
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                    color: isActive('/artistas')
                      ? theme.palette.primary.main
                      : '#fff',
                    textTransform: 'none',
                  }}
                >
                  <Box
                    component="svg"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    sx={{
                      width: '24px',
                      height: '24px',
                      fill: isActive('/artistas')
                        ? theme.palette.primary.main
                        : '#fff',
                    }}
                  >
                    <path d="M23.313 26.102l-6.296-3.488c2.34-1.841 2.976-5.459 2.976-7.488v-4.223c0-2.796-3.715-5.91-7.447-5.91-3.73 0-7.544 3.114-7.544 5.91v4.223c0 1.845 0.78 5.576 3.144 7.472l-6.458 3.503s-1.688 0.752-1.688 1.689v2.534c0 0.933 0.757 1.689 1.688 1.689h21.625c0.931 0 1.688-0.757 1.688-1.689v-2.534c0-0.994-1.689-1.689-1.689-1.689z"></path>
                  </Box>
                  <Box sx={{ fontSize: '16px' }}>Artistas favoritos</Box>
                </Button>
              </Box>
            </ListItem>

            {/* Línea de separación */}
            <Divider
              sx={{
                my: 2,
                backgroundColor: theme.palette.primary.main,
                width: '80%',
                mx: 'auto',
              }}
            />

            {/* Título Biblioteca */}
            <Typography
              variant="h6"
              sx={{
                marginLeft: '16px',
                color: '#9C9C9C',
                fontSize: '15px',
                fontWeight: 'bold',
              }}
            >
              Biblioteca
            </Typography>

            {/* Botón Tus me gusta */}
            <ListItem
              button
              component={Link}
              to="/me-gusta"
              sx={{
                color: isActive('/me-gusta')
                  ? theme.palette.primary.main
                  : '#fff',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Button
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                    color: isActive('/me-gusta')
                      ? theme.palette.primary.main
                      : '#fff',
                    textTransform: 'none',
                  }}
                >
                  <Box
                    component="svg"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    sx={{
                      width: '24px',
                      height: '24px',
                      fill: isActive('/me-gusta')
                        ? theme.palette.primary.main
                        : '#fff',
                    }}
                  >
                    <path
                      d="M19.4626 3.99415C16.7809 2.34923 14.4404 3.01211 13.0344 4.06801C12.4578 4.50096 12.1696 4.71743 12 4.71743C11.8304 4.71743 11.5422 4.50096 10.9656 4.06801C9.55962 3.01211 7.21909 2.34923 4.53744 3.99415C1.01807 6.15294 0.221721 13.2749 8.33953 19.2834C9.88572 20.4278 10.6588 21 12 21C13.3412 21 14.1143 20.4278 15.6605 19.2834C23.7783 13.2749 22.9819 6.15294 19.4626 3.99415Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </Box>
                  <Box sx={{ fontSize: '16px' }}>Tus me gusta</Box>
                </Button>
              </Box>
            </ListItem>

            {/* Botón Descubrir */}
            <ListItem
              button
              component={Link}
              to="/descubrir"
              sx={{
                color: isActive('/descubrir')
                  ? theme.palette.primary.main
                  : '#fff',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Button
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                    color: isActive('/descubrir')
                      ? theme.palette.primary.main
                      : '#fff',
                    textTransform: 'none',
                  }}
                >
                  <Box
                    component="svg"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 15 15"
                    sx={{
                      width: '24px',
                      height: '24px',
                      fill: isActive('/descubrir')
                        ? theme.palette.primary.main
                        : '#fff',
                    }}
                  >
                    <path d="M3.5 11.5L3.07125 11.2428C2.95321 11.4395 2.98421 11.6913 3.14645 11.8536C3.30868 12.0158 3.56051 12.0468 3.75725 11.9287L3.5 11.5ZM6.5 6.5L6.24275 6.07125L6.13557 6.13557L6.07125 6.24275L6.5 6.5ZM11.5 3.5L11.9287 3.75725C12.0468 3.56051 12.0158 3.30868 11.8536 3.14645C11.6913 2.98421 11.4395 2.95321 11.2428 3.07125L11.5 3.5ZM8.5 8.5L8.75725 8.92875L8.86443 8.86443L8.92875 8.75725L8.5 8.5ZM14 7.5C14 11.0903 11.0903 14 7.5 14V15C11.6426 15 15 11.6426 15 7.5H14ZM7.5 14C3.90971 14 1 11.0903 1 7.5H0C0 11.6426 3.35742 15 7.5 15V14ZM1 7.5C1 3.90971 3.90971 1 7.5 1V0C3.35742 0 0 3.35742 0 7.5H1ZM7.5 1C11.0903 1 14 3.90971 14 7.5H15C15 3.35742 11.6426 0 7.5 0V1ZM3.92875 11.7572L6.92875 6.75725L6.07125 6.24275L3.07125 11.2428L3.92875 11.7572ZM6.75725 6.92875L11.7572 3.92875L11.2428 3.07125L6.24275 6.07125L6.75725 6.92875ZM11.0713 3.24275L8.07125 8.24275L8.92875 8.75725L11.9287 3.75725L11.0713 3.24275ZM8.24275 8.07125L3.24275 11.0713L3.75725 11.9287L8.75725 8.92875L8.24275 8.07125Z"></path>
                  </Box>
                  <Box sx={{ fontSize: '16px' }}>Descubrir</Box>
                </Button>
              </Box>
            </ListItem>

            {/* Línea de separación */}
            <Divider
              sx={{
                my: 2,
                backgroundColor: theme.palette.primary.main,
                width: '80%',
                mx: 'auto',
              }}
            />

            <Typography
              variant="h6"
              sx={{
                marginLeft: '16px',
                color: '#9C9C9C',
                fontSize: '15px',
                fontWeight: 'bold',
              }}
            >
              Playlist
            </Typography>

            {/* Botón Crear una Playlist */}
            <ListItem
              button
              component={Link}
              to="/crear-playlist"
              sx={{
                color: isActive('/crear-playlist')
                  ? theme.palette.primary.main
                  : '#fff',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Button
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                    color: isActive('/crear-playlist')
                      ? theme.palette.primary.main
                      : '#fff',
                    textTransform: 'none',
                  }}
                >
                  <Box
                    component="svg"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    sx={{
                      width: '24px',
                      height: '24px',
                      fill: isActive('/crear-playlist')
                        ? theme.palette.primary.main
                        : '#fff',
                    }}
                  >
                    <path
                      d="M21 7V19C21 20.1046 20.1046 21 19 21H7M9 8.5V11.5L12 10L9 8.5ZM17 15V5C17 3.89543 16.1046 3 15 3H5C3.89543 3 3 3.89543 3 5V15C3 16.1046 3.89543 17 5 17H15C16.1046 17 17 16.1046 17 15Z"
                      stroke="#000000"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </Box>
                  <Box sx={{ fontSize: '16px' }}>Crear una playlist</Box>
                </Button>
              </Box>
            </ListItem>

            {/* Botón Salir */}
            <ListItem>
              <Button
                onClick={useLogout()}
                variant="text"
                color="warning"
                fullWidth
              >
                Salir
              </Button>
            </ListItem>
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
        >
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
    </MusicPlayerProvider>
  );
};

export default DashboardLayout;
