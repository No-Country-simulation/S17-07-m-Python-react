import { Box, IconButton } from '@mui/material';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import ShuffleOnIcon from '@mui/icons-material/ShuffleOn';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import RepeatIcon from '@mui/icons-material/Repeat';
import RepeatOnIcon from '@mui/icons-material/RepeatOn';
import RepeatOneOnIcon from '@mui/icons-material/RepeatOneOn';

export default function MusicControls({ props }) {
  const {
    isPlaying,
    repeat,
    shuffle,
    handlePlayPause,
    handleRepeatChange,
    handleShuffle,
    handleNextTrack,
    handlePreviousTrack,
  } = props;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: { xs: 1, sm: 2 },
      }}
    >
      <IconButton
        onClick={handleShuffle}
        sx={{ display: { xs: 'none', sm: 'flex' } }}
      >
        {!shuffle ? (
          <ShuffleIcon
            sx={{
              fontSize: '1.8rem',
            }}
          />
        ) : (
          <ShuffleOnIcon
            sx={{
              color: 'secondary.main',
              fontSize: '1.8rem',
            }}
          />
        )}
      </IconButton>

      <IconButton onClick={handlePreviousTrack}>
        <SkipPreviousIcon
          sx={{
            fontSize: '1.8rem',
          }}
        />
      </IconButton>

      {/* Play / Pause */}
      <IconButton onClick={handlePlayPause}>
        {!isPlaying ? (
          <PlayCircleIcon
            sx={{
              color: 'secondary.main',
              fontSize: '3.5rem',
            }}
          />
        ) : (
          <PauseCircleIcon
            sx={{
              color: 'secondary.main',
              fontSize: '3.5rem',
            }}
          />
        )}
      </IconButton>

      {/* Skip next */}
      <IconButton onClick={handleNextTrack}>
        <SkipNextIcon
          sx={{
            fontSize: '1.8rem',
          }}
        />
      </IconButton>

      {/* Repeat */}
      <IconButton
        onClick={handleRepeatChange}
        sx={{ display: { xs: 'none', sm: 'flex' } }}
      >
        {repeat === 'off' && (
          <RepeatIcon
            sx={{
              fontSize: '1.8rem',
            }}
          />
        )}
        {repeat === 'on' && (
          <RepeatOnIcon
            sx={{
              color: 'secondary.main',
              fontSize: '1.8rem',
            }}
          />
        )}
        {repeat === 'one' && (
          <RepeatOneOnIcon
            sx={{
              color: 'secondary.main',
              fontSize: '1.8rem',
            }}
          />
        )}
      </IconButton>
    </Box>
  );
}
