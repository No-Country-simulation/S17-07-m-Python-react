import { Box, Typography } from '@mui/material';

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
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            width: { xs: '120px', sm: '180px' },
          }}
        >
          {trackData?.title}
        </Typography>
      </Box>
    </Box>
  );
}
