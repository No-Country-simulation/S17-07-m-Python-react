import { useContext, useRef, useState, useEffect } from 'react';

import ReactPlayer from 'react-player';
import LibraryControls from './libraryControls/libraryControls';
import MusicControls from './musicControls/musicControls';
import CurrentMusic from './currentMusic/currentMusic';
import Box from '@mui/material/Box';
import { TimeSlider } from './musicControls/timeSlider';
import { AppBar, Stack, Toolbar } from '@mui/material';
import { VolumeSlider } from './musicControls/volumeSlider';
import { TimeSliderMovil } from './musicControls/timeSliderMovil';
import { MusicPlayerContext } from '../../../playlists/services/store/player';
import { fetchAddHistory } from '../../../playlists/helpers/fetchHistory';

const MusicPlayer = () => {
  const { trackData, nextTrack, previousTrack } =
    useContext(MusicPlayerContext);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [currentTime, setCurrentTime] = useState(0);
  const repeatValues = ['off', 'on', 'one'];
  const [repeat, setRepeat] = useState(repeatValues[0]);
  const [shuffle, setShuffle] = useState(false);
  const playerRef = useRef(null);

  const currentTrack = trackData?.preview;

  useEffect(() => {
    if (trackData) {
      setIsPlaying(true);
    }
  }, [trackData]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current) {
        setCurrentTime(playerRef.current.getCurrentTime());
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (event) => {
    setVolume(parseFloat(event.target.value));
  };

  const handleTimeChange = (event) => {
    setCurrentTime(parseFloat(event.target.value));
    playerRef.current.seekTo(event.target.value);
  };

  const handleRepeatChange = () => {
    const index = repeatValues.indexOf(repeat);
    if (index === 2) setRepeat(repeatValues[0]);
    setRepeat(repeatValues[(index + 1) % 3]);
  };

  const handleShuffle = () => {
    setShuffle(!shuffle);
  };

  const handleEnded = () => {
    if (repeat === 'one') {
      playerRef.current.seekTo(0);
      setIsPlaying(true);
      setRepeat(repeatValues[0]);
      return;
    }
    handleNextTrack();
  };

  const handleNextTrack = () => {
    nextTrack();
    setIsPlaying(true);
  };
  const handlePreviousTrack = () => {
    previousTrack();
    setIsPlaying(true);
  };

  useEffect(() => {
    if (Math.round(currentTime) == 30 && repeat == 'off') {
      fetchAddHistory(trackData.id);
    }
  }, [currentTime, trackData, repeat]);

  return (
    <Box>
      <AppBar
        position="fixed"
        sx={{ top: 'auto', bottom: { xs: '48px', md: 0 } }}
      >
        <Toolbar sx={{ bgcolor: 'background.default', padding: 1 }}>
          {currentTrack && (
            <ReactPlayer
              ref={playerRef}
              url={currentTrack}
              playing={isPlaying}
              volume={volume}
              loop={repeat === 'on'}
              controls={false}
              onEnded={handleEnded}
              width="0"
              height="0"
            />
          )}

          <CurrentMusic props={{ trackData }} />

          <Stack
            sx={{
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              display: 'flex',
              flexWrap: 'wrap',
              gap: 2,
            }}
          >
            <MusicControls
              props={{
                isPlaying,
                volume,
                handlePlayPause,
                handleVolumeChange,
                handleNextTrack,
                handlePreviousTrack,
                handleRepeatChange,
                handleShuffle,
                repeat,
                shuffle,
              }}
            />
            <TimeSlider
              currentTime={currentTime}
              handleTimeChange={handleTimeChange}
            />
          </Stack>

          <Stack
            display={{ xs: 'none', sm: 'none', md: 'flex' }}
            direction={{ md: 'column', lg: 'row' }}
            spacing={2}
            sx={{
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
            }}
          >
            <VolumeSlider
              volume={volume}
              handleVolumeChange={handleVolumeChange}
            />

            <LibraryControls props={{ trackData }} />
          </Stack>
        </Toolbar>

        <TimeSliderMovil
          currentTime={currentTime}
          handleTimeChange={handleTimeChange}
        />
      </AppBar>
    </Box>
  );
};

export default MusicPlayer;
