import React from 'react';
import { Box, Typography, Grid, useMediaQuery, useTheme } from '@mui/material';
import MusicCard from '../MusicCard';

const GridMusicCards = ({ music, title }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const isInRange1336To1560 = useMediaQuery(
    '(min-width:1336px) and (max-width:1560px)',
  );
  const isInRange1120To1335 = useMediaQuery(
    '(min-width:1120px) and (max-width:1335px)',
  );
  const isInRange1000To1119 = useMediaQuery(
    '(min-width:1000px) and (max-width:1119px)',
  );

  const getFilteredMusic = () => {
    if (isInRange1336To1560) {
      return music.slice(1);
    } else if (isInRange1120To1335) {
      return music.slice(2);
    } else if (isInRange1000To1119) {
      return music.slice(3);
    } else {
      return music;
    }
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {title}
      </Typography>
      {isSmallScreen ? (
        <Box
          sx={{
            display: 'flex',
            overflowX: 'auto',
            gap: 2,
            padding: 0,
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: theme.palette.primary.main,
            },
          }}
        >
          {getFilteredMusic().map((play) => (
            <Box key={play.id} sx={{ flex: '0 0 auto' }}>
              <MusicCard
                id={play.album.id}
                type={play.album.type}
                image={play.album.cover_medium}
                title={play.album.title}
                artist={play.artist.name}
              />
            </Box>
          ))}
        </Box>
      ) : (
        <Grid container spacing={2} justifyContent={'space-between'}>
          {getFilteredMusic().map((play) => (
            <MusicCard
              key={play.id}
              id={play.album.id}
              type={play.album.type}
              image={play.album.cover_medium}
              title={play.album.title}
              artist={play.artist.name}
            />
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default GridMusicCards;
