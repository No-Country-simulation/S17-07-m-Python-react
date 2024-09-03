import React from 'react';
import { LoginForm } from '../components/LoginForm';
import { Box } from '@mui/material';
import { Navbar } from '../components/Navbar';

const LoginPage = () => {
  return (
    <Box
      sx={{
        bgcolor: '#F3E1C7',
        backgroundImage:
          'url(https://res.cloudinary.com/dfulftofe/image/upload/v1725286571/jilguero_s4jlwb.webp)',
        backgroundSize: {
          xs: '100% 100%',
          sm: '100% 100%',
          md: '50% 100%',
        },
        backgroundPosition: 'left',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
      }}
    >
      <Navbar />
      <LoginForm />
    </Box>
  );
};

export default LoginPage;
