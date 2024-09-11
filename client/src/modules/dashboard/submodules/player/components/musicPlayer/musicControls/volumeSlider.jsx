import { VolumeUp, VolumeDown, VolumeOff } from '@mui/icons-material';
import { Box, Slider, Stack } from '@mui/material';
import React from 'react';

export const VolumeSlider = ({ volume, handleVolumeChange }) => {
  return (
    <Box>
      <Stack
        spacing={2}
        direction="row"
        sx={{ alignItems: 'center', mb: 1, width: '200px' }}
      >
        {volume === 0 ? (
          <VolumeOff />
        ) : volume <= 0.5 ? (
          <VolumeDown />
        ) : (
          <VolumeUp />
        )}
        <Slider
          aria-label="Volume"
          sx={{ color: 'secondary.main' }}
          min={0}
          max={1}
          step={0.1}
          value={volume}
          onChange={handleVolumeChange}
        />
      </Stack>
    </Box>
  );
};
