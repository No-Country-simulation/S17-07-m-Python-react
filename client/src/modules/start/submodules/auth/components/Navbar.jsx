import { AppBar, Box, Button, Grid, Toolbar } from '@mui/material';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { Logo } from '../../../../dashboard/components/Logo';

export const Navbar = () => {
  const location = useLocation();

  const isRegisterPage = location.pathname === '/register';
  const isLoginPage = location.pathname === '/login';
  return (
    <Box sx={{ flexGrow: 1, height: '10vh' }}>
      <AppBar position="static">
        <Toolbar sx={{ padding: 2, bgcolor: 'background.default' }}>
          <Logo />
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
