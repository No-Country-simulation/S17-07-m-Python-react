import { Stack, Slider } from '@mui/material';

export const TimeSliderMovil = ({ currentTime, handleTimeChange }) => {
  return (
    <Stack
      direction="row"
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        bgcolor: 'background.default',
        display: { xs: 'flex', md: 'none' },
      }}
    >
      <Slider
        aria-label="Time Slider"
        min={0}
        max={30}
        step={0.1}
        value={currentTime}
        onChange={handleTimeChange}
        sx={{
          color: 'secondary.main',
          '& .MuiSlider-thumb': {
            display: 'none',
          },
        }}
      />
    </Stack>
  );
};
