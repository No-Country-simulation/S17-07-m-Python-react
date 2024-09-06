import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { Box, IconButton } from '@mui/material';

export default function LibraryControls() {
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

      <IconButton>
        <LibraryAddIcon sx={{ fontSize: '1.5rem' }} />
      </IconButton>

      <IconButton>
        <KeyboardArrowUpIcon sx={{ fontSize: '1.5rem' }} />
      </IconButton>
    </Box>
  );
}
