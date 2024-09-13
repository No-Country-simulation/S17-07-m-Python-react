import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { Box, IconButton } from '@mui/material';
import PlaylistMenu from '../../../../playlists/components/PlaylistMenu';

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
      <IconButton>
        <FavoriteBorderOutlinedIcon sx={{ fontSize: '1.5rem' }} />
      </IconButton>

      <PlaylistMenu trackData={trackData} />

      <IconButton>
        <KeyboardArrowUpIcon sx={{ fontSize: '1.5rem' }} />
      </IconButton>
    </Box>
  );
}
