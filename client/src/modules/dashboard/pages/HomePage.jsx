import React, { useContext } from 'react';
import { Button, Stack } from '@mui/material';
import { MusicPlayerContext } from '../submodules/playlists/services/store/player';

export const HomePage = () => {
  const { setTrackId, setType } = useContext(MusicPlayerContext);

  const handlePlay = (track, type) => {
    setTrackId(track); //number
    setType(type); //string
  };

  return (
    <Stack spacing={2} alignItems="center">
      <Button variant="contained" onClick={() => handlePlay(3135556, 'track')}>
        Play Single Track
      </Button>

      <Button
        variant="contained"
        onClick={() => handlePlay(533944192, 'album')}
      >
        Play Album
      </Button>

      <Button
        variant="contained"
        onClick={() => handlePlay(178699142, 'playlist')}
      >
        Play Playlist
      </Button>
    </Stack>
  );
};
