import {
  AppBar,
  Avatar,
  Box,
  Button,
  Grid,
  Toolbar,
  Typography,
} from '@mui/material';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';

export const Navbar = () => {
  const location = useLocation();

  const isRegisterPage = location.pathname === '/register';
  const isLoginPage = location.pathname === '/login';
  return (
    <Box sx={{ flexGrow: 1, height: '10vh' }}>
      <AppBar position="static">
        <Toolbar sx={{ padding: 2, bgcolor: 'background.default' }}>
          <Avatar alt="Jilguero logo" src="/logo.svg" />
          <Box>
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontSize: '0.8rem',
                marginLeft: 1,
                marginBottom: 0,
              }}
            >
              Jilguero
              <Typography
                variant="body2"
                component="div"
                sx={{
                  fontSize: '0.6rem',
                  marginLeft: '50%',
                  marginTop: -1,
                  color: 'text.secondary',
                }}
              >
                .com
              </Typography>
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }}></Box>
          <Grid sx={{ display: 'flex', gap: 2 }}>
            <Button
              component={RouterLink}
              to="/register"
              variant={isRegisterPage ? 'outlined' : 'text'}
              color={isRegisterPage ? 'secondary' : 'inherit'}
            >
              Crear cuenta
            </Button>
            <Button
              component={RouterLink}
              to="/login"
              variant={isLoginPage ? 'outlined' : 'text'}
              color={isLoginPage ? 'secondary' : 'inherit'}
            >
              Ingresar
            </Button>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
