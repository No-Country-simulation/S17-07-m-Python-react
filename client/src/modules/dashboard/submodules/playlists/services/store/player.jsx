import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { getEnvVariables } from '../../../../../../core/utils/getEnvVariables';

const { VITE_API_MUSIC } = getEnvVariables();
export const MusicPlayerContext = createContext();

export const MusicPlayerProvider = ({ children }) => {
  const [trackId, setTrackId] = useState(null);
  const [type, setType] = useState('playlist'); // 'track', 'album', or 'playlist'
  const [trackData, setTrackData] = useState(null);
  const [playlistData, setPlaylistData] = useState(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = '';
        let isPlaylistOrAlbum = false;

        switch (type) {
          case 'playlist':
            url = `${VITE_API_MUSIC}/playlist/${trackId}`;
            isPlaylistOrAlbum = true;
            break;
          case 'album':
            url = `${VITE_API_MUSIC}/album/${trackId}`;
            isPlaylistOrAlbum = true;
            break;
          case 'track':
            url = `${VITE_API_MUSIC}/track/${trackId}`;
            break;
          default:
            throw new Error('Invalid type');
        }

        const response = await axios.get(url);

        if (isPlaylistOrAlbum) {
          const tracks = response.data?.tracks?.data;
          if (tracks && tracks.length > 0) {
            setPlaylistData(tracks);
            setCurrentTrackIndex(0);
            setTrackData(null);
          }
        } else {
          setTrackData(response.data);
          setPlaylistData(null);
        }
      } catch (error) {
        new Error('Error fetching data from Deezer:', error);
      }
    };

    fetchData();
  }, [trackId, type]);

  const nextTrack = () => {
    if (type === 'playlist' || type === 'album') {
      if (playlistData && playlistData.length > 0) {
        setCurrentTrackIndex((prevIndex) =>
          prevIndex + 1 < playlistData.length ? prevIndex + 1 : 0,
        );
      }
    } else if (type === 'track') {
      setTrackId((prevId) => prevId + 1);
    }
  };

  const previousTrack = () => {
    if (type === 'playlist' || type === 'album') {
      if (playlistData && playlistData.length > 0) {
        setCurrentTrackIndex((prevIndex) =>
          prevIndex - 1 >= 0 ? prevIndex - 1 : playlistData.length - 1,
        );
      }
    } else if (type === 'track') {
      setTrackId((prevId) => (prevId > 0 ? prevId - 1 : prevId));
    }
  };

  const currentTrackData =
    type === 'playlist' || type === 'album'
      ? playlistData && playlistData.length > 0
        ? playlistData[currentTrackIndex]
        : null
      : trackData;

  return (
    <MusicPlayerContext.Provider
      value={{
        trackData: currentTrackData,
        playlistData,
        nextTrack,
        previousTrack,
        trackId,
        type,
        setTrackId,
        setType,
      }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
};
