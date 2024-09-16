import React from 'react';
import {
  Box,
  Card,
  CardMedia,
  Grid,
  IconButton,
  Typography,
  useTheme,
  Skeleton,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { MusicPlayerContext } from '../submodules/playlists/services/store/player';
import { useSearch } from '../submodules/search/services/store/search';

const MusicCard = ({ id, image, title, artist, type }) => {
  const { setTrackId, setType } = useContext(MusicPlayerContext);
  const { updateSearchText } = useSearch();
  const navigate = useNavigate();
  const theme = useTheme();

  const handlePlay = (track, type) => {
    setTrackId(track); // number
    setType(type); // string
  };

  const handleCardClick = () => {
    if (type === 'track') return;
    updateSearchText('');
    navigate(`/${type}/${id}`);
  };

  if (!image || !title || !artist) {
    return (
      <Grid item>
        <Card
          sx={{
            position: 'relative',
            width: { xs: 350, md: 200 },
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          <Skeleton variant="rectangular" width="100%" height={200} />
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              background: theme.palette.background.paper,
              padding: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              opacity: 0.9,
            }}
          >
            <Skeleton width="80%" height={30} />
            <Skeleton width="60%" height={20} />
          </Box>
        </Card>
      </Grid>
    );
  }

  return (
    <Grid item bgcolor={'background.default'}>
      <Card
        onClick={handleCardClick}
        sx={{
          padding: 2,
          bgcolor: 'background.default',
          position: 'relative',
          width: { xs: 350, sm: 250, md: 190 },
          overflow: 'hidden',
          cursor: 'pointer',
        }}
      >
        <CardMedia
          component="img"
          image={image}
          alt={title}
          sx={{ height: 200, width: '100%', objectFit: 'cover' }}
        />
        <IconButton
          onClick={(event) => {
            event.stopPropagation();
            handlePlay(id, type);
          }}
          color="primary"
          className="play-button"
          sx={{
            position: 'absolute',
            bottom: 16,
            right: 16,
            opacity: { xs: 1, md: 0 },
            transition: 'opacity 0.3s ease',
            '&:hover': {
              opacity: 1,
            },
          }}
        >
          <PlayArrowIcon
            sx={{
              fontSize: 50,
              color: 'background.default',
              bgcolor: 'secondary.main',
              borderRadius: '50%',
            }}
          />
        </IconButton>
      </Card>
      <Box
        sx={{
          padding: 1,
          textAlign: 'left',
          maxWidth: { xs: 350, sm: 250, md: 200 },
        }}
      >
        <Typography
          variant="subtitle1"
          component="div"
          sx={{
            width: '100%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            mb: 0.5,
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {artist}
        </Typography>
      </Box>
    </Grid>
  );
};

export default MusicCard;
