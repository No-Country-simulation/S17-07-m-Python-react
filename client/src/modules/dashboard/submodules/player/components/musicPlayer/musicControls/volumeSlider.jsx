import { VolumeUp } from '@mui/icons-material';
import { VolumeDown } from '@mui/icons-material';
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
        <VolumeDown />
        <Slider
          aria-label="Volume"
          sx={{ color: 'secondary.main' }}
          min={0}
          max={1}
          step={0.1}
          value={volume}
          onChange={handleVolumeChange}
        />
        <VolumeUp />
      </Stack>
    </Box>
  );
};
