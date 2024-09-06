import React, { useContext } from 'react';
import { Button, Stack } from '@mui/material';
import { MusicPlayerContext } from '../submodules/playlists/services/store/player';

export const HomePage = () => {
  const { setTrackId, setIsPlaylist } = useContext(MusicPlayerContext);

  const handlePlay = (track, isPlaylist) => {
    setTrackId(track);
    setIsPlaylist(isPlaylist);
  };

  return (
    <Stack spacing={2} alignItems="center">
      <Button variant="contained" onClick={() => handlePlay(3135556, false)}>
        Play Single Track
      </Button>

      <Button variant="contained" onClick={() => handlePlay(908622995, true)}>
        Play Playlist
      </Button>
      <Button variant="contained" onClick={() => handlePlay(178699142, true)}>
        Play Playlist
      </Button>
    </Stack>
  );
};
