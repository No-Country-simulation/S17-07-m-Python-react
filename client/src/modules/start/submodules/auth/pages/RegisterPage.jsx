import React from 'react';

import { Box } from '@mui/material';
import { Navbar } from '../components/Navbar';
import { RegisterForm } from '../components/RegisterForm';

const RegisterPage = () => {
  return (
    <Box
      sx={{
        bgcolor: 'white.main',
        backgroundImage:
          'url(https://res.cloudinary.com/dfulftofe/image/upload/v1725286571/jilguero_s4jlwb.webp)',
        backgroundSize: {
          xs: '100% 100%',
          sm: '100% 100%',
          md: '40% 80%',
        },
        backgroundPosition: 'left bottom',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
      }}
    >
      <Navbar />
      <RegisterForm />
    </Box>
  );
};

export default RegisterPage;
