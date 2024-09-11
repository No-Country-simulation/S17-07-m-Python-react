import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Skeleton,
} from '@mui/material';
import React from 'react';
import banner from '../../../../core/assets/banner.png';
import texture from '../../../../core/assets/pattern.svg';

export const Banner = ({ album }) => {
  const isLoading = !album;

  // Definir los valores de width y height condicionalmente
  const skeletonWidth = window.innerWidth < 600 ? '100%' : 150;
  const skeletonHeight = window.innerWidth < 600 ? 300 : 150;

  return (
    <Card
      sx={{
        display: 'flex',
        padding: { sm: 0, md: 2 },
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundImage: { xs: 'none', sm: `url(${texture})` },
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        borderRadius: 4,
        height: '100%',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <CardContent
          sx={{ flex: '1 0 auto', display: { xs: 'none', sm: 'block' } }}
        >
          {isLoading ? (
            <>
              <Skeleton variant="text" width={200} height={50} />
              <Skeleton variant="text" width={200} height={50} />
            </>
          ) : (
            <>
              <Typography component="div" variant="h4">
                Nuevos
              </Typography>
              <Typography component="div" variant="h4">
                lanzamientos
              </Typography>
            </>
          )}
        </CardContent>
      </Box>

      {isLoading ? (
        <Skeleton
          variant="rectangular"
          width={skeletonWidth}
          height={skeletonHeight}
        />
      ) : (
        <CardMedia
          component="img"
          sx={{
            width: { xs: '100%', sm: 150 },
            height: { xs: 300, sm: 150 },
            opacity: { xs: 0.4, sm: 1 },
          }}
          image={album.album?.cover_medium || banner}
          alt="Banner nuevos lanzamientos"
        />
      )}

      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: { xs: 'flex', sm: 'none' },
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textAlign: 'center',
          padding: 2,
        }}
      >
        <Typography variant="h3">Nuevos lanzamientos</Typography>
      </Box>
    </Card>
  );
};
