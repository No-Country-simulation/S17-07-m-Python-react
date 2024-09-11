import { Grid, Typography, Skeleton, Box } from '@mui/material';
import React from 'react';
import MusicCard from '../../../components/MusicCard';

export const GridSearchCard = ({ cards }) => {
  const isLoading = !cards;

  return (
    <Box sx={{ marginTop: 4 }}>
      {/* Título de Canciones */}
      {isLoading ? (
        <Skeleton
          variant="text"
          width={150}
          height={40}
          sx={{ marginTop: 2 }}
        />
      ) : (
        <Typography variant="h6" align="left" sx={{ marginTop: 2 }}>
          Canciones
        </Typography>
      )}

      {/* Grid de Canciones */}
      <Grid
        container
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: 2,
          marginTop: 2,
        }}
      >
        {isLoading
          ? Array.from(new Array(6)).map((_, index) => (
              <Skeleton
                key={index}
                variant="rectangular"
                width={190}
                height={200}
              />
            ))
          : cards.map((card) => (
              <MusicCard
                type={card.type}
                key={card.id}
                id={card.id}
                image={card.album.cover_medium}
                title={card.title}
                artist={card.artist.name}
              />
            ))}
      </Grid>

      {/* Título de Albums */}
      {isLoading ? (
        <Skeleton
          variant="text"
          width={150}
          height={40}
          sx={{ marginTop: 2 }}
        />
      ) : (
        <Typography variant="h6" align="left" sx={{ marginTop: 2 }}>
          Albums
        </Typography>
      )}

      {/* Grid de Albums */}
      <Grid
        container
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: 2,
          marginTop: 2,
        }}
      >
        {isLoading
          ? Array.from(new Array(6)).map((_, index) => (
              <Skeleton
                key={index}
                variant="rectangular"
                width={190}
                height={200}
              />
            ))
          : cards.map((card, index) => (
              <MusicCard
                type={card.album.type}
                key={index}
                id={card.album.id}
                image={card.album.cover_medium}
                title={card.album.title}
                artist={card.artist.name}
              />
            ))}
      </Grid>
    </Box>
  );
};
