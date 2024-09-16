import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Box, IconButton } from '@mui/material';
import PlaylistMenu from '../../../../playlists/components/PlaylistMenu';
import ToggleFavorite from '../../../../library/components/ToggleFavorite';

export default function LibraryControls({ props }) {
  const { trackData } = props;
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1,
      }}
    >
      <ToggleFavorite id={trackData.id} />

      <PlaylistMenu id={trackData.id} />

      <IconButton>
        <KeyboardArrowUpIcon sx={{ fontSize: '1.5rem' }} />
      </IconButton>
    </Box>
  );
}
