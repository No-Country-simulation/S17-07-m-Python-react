import { Slider, Stack } from '@mui/material';
import React from 'react';

export const TimeSlider = ({ currentTime, handleTimeChange }) => {
  return (
    <Stack
      direction="row"
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        width: '60%',
        minWidth: '200px',
        display: { xs: 'none', md: 'flex' },
      }}
    >
      <Slider
        aria-label="Time Slider"
        sx={{ color: 'secondary.main' }}
        min={0}
        max={30}
        step={0.1}
        value={currentTime}
        onChange={handleTimeChange}
      />
    </Stack>
  );
};
