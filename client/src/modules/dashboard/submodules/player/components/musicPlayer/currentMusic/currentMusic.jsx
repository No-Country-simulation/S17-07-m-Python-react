import { Box, Typography } from '@mui/material';
import spinner from '../../../../../../../core/assets/spinner.gif';

export default function CurrentMusic({ props }) {
  const { trackData } = props;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Box
        component="img"
        src={trackData?.album?.cover_medium || '/logo.svg'}
        alt={trackData?.title}
        sx={{
          width: 56,
          height: 56,
          objectFit: 'cover',
          borderRadius: 1,
        }}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
          {trackData?.artist?.name}
        </Typography>
        <Box
          component="img"
          src={trackData?.title ? undefined : spinner}
          alt="Loading"
          sx={{
            width: 56,
            height: 'auto',
            objectFit: 'contain',
            display: trackData?.title ? 'none' : 'block',
          }}
        />
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            width: { xs: '120px', sm: '180px' },
            display: trackData?.title ? 'block' : 'none',
          }}
        >
          {trackData?.title || ''}
        </Typography>
      </Box>
    </Box>
  );
}
