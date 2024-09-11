import { Avatar, Box, Typography } from '@mui/material';
import React from 'react';

export const Logo = () => {
  return (
    <>
      <Avatar alt="Jilguero logo" src="/logo.svg" />
      <Box>
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontSize: '0.8rem',
            marginLeft: 1,
            marginBottom: 0,
            fontFamily: '"Rufina", serif',
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
    </>
  );
};
