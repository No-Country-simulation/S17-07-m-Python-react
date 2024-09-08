import {
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  Toolbar,
  Typography,
} from '@mui/material';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Logo } from './Logo';
import { Link } from 'react-router-dom';
import { Home } from '@mui/icons-material';
import { AccessTime } from '@mui/icons-material';
import { Favorite } from '@mui/icons-material';
import { PeopleAlt } from '@mui/icons-material';
import { Explore } from '@mui/icons-material';
import { LibraryAdd } from '@mui/icons-material';

export const Sidebar = ({ drawerWidth }) => {
  const location = useLocation();

  // Función para determinar si el botón está activo
  const isActive = (path) => location.pathname === path;
  return (
    <Drawer
      sx={{
        display: { xs: 'none', md: 'block' },
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
        <Logo />
      </Toolbar>
      <List
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          overflowY: 'auto',
          marginBottom: '134px',
        }}
      >
        {/* Botón Home */}
        <ListItemButton
          component={Link}
          to="/"
          sx={{
            borderRight: isActive('/') ? '2px solid yellow' : 'none',
            color: isActive('/') ? 'secondary.main' : 'text.default',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Home />
            <Typography sx={{ fontSize: '16px' }}>Home</Typography>
          </Box>
        </ListItemButton>

        {/* Botón Escuchado recientemente */}
        <ListItemButton
          component={Link}
          to="/recientes"
          sx={{
            borderRight: isActive('/recientes') ? '2px solid yellow' : 'none',
            color: isActive('/recientes') ? 'secondary.main' : 'text.default',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AccessTime />
            <Typography sx={{ fontSize: '16px' }}>
              Escuchados recientemente
            </Typography>
          </Box>
        </ListItemButton>

        {/* Botón Artistas favoritos */}
        <ListItemButton
          component={Link}
          to="/artistas-favoritos"
          sx={{
            borderRight: isActive('/artistas-favoritos')
              ? '2px solid yellow'
              : 'none',
            color: isActive('/artistas-favoritos')
              ? 'secondary.main'
              : 'text.default',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <PeopleAlt />
            <Typography sx={{ fontSize: '16px' }}>
              Artistas favoritos
            </Typography>
          </Box>
        </ListItemButton>

        {/* Línea de separación */}
        <Divider
          sx={{
            mx: 2,
            my: 2,
            backgroundColor: 'primary.main',
          }}
        />

        {/* Título Biblioteca */}
        <Typography
          variant="body2"
          fontWeight="normal"
          sx={{
            marginLeft: 2,
            opacity: '0.8',
          }}
        >
          Biblioteca
        </Typography>

        {/* Botón Tus me gusta (favoritos) */}
        <ListItemButton
          component={Link}
          to="/favoritos"
          sx={{
            borderRight: isActive('/favoritos') ? '2px solid yellow' : 'none',
            color: isActive('/favoritos') ? 'secondary.main' : 'text.default',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Favorite />
            <Typography sx={{ fontSize: '16px' }}>Tus me gusta</Typography>
          </Box>
        </ListItemButton>

        {/* Botón Descubrir */}
        <ListItemButton
          component={Link}
          to="/descubrir"
          sx={{
            borderRight: isActive('/descubrir') ? '2px solid yellow' : 'none',
            color: isActive('/descubrir') ? 'secondary.main' : 'text.default',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Explore />
            <Typography sx={{ fontSize: '16px' }}>Descubrir</Typography>
          </Box>
        </ListItemButton>

        {/* Línea de separación */}
        <Divider
          sx={{
            mx: 2,
            my: 2,
            backgroundColor: 'primary.main',
          }}
        />

        <Typography
          variant="body2"
          fontWeight="normal"
          sx={{
            marginLeft: 2,
            opacity: '0.8',
          }}
        >
          Playlist
        </Typography>

        {/* Botón Crear una Playlist */}
        <ListItemButton
          component={Link}
          to="/crear-playlist"
          sx={{
            borderRight: isActive('/crear-playlist')
              ? '2px solid yellow'
              : 'none',
            color: isActive('/crear-playlist')
              ? 'secondary.main'
              : 'text.default',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LibraryAdd />
            <Typography sx={{ fontSize: '16px' }}>
              Crear una playlist
            </Typography>
          </Box>
        </ListItemButton>
      </List>
    </Drawer>
  );
};
