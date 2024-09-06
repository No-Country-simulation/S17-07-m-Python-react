import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { getEnvVariables } from '../../../../../../core/utils/getEnvVariables';

const { VITE_API_MUSIC } = getEnvVariables();
export const MusicPlayerContext = createContext();
export const MusicPlayerProvider = ({ children }) => {
  const [trackId, setTrackId] = useState(null);
  const [isPlaylist, setIsPlaylist] = useState(true);
  const [trackData, setTrackData] = useState(null);
  const [playlistData, setPlaylistData] = useState(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isPlaylist) {
          const playlistUrl = `${VITE_API_MUSIC}/playlist/${trackId}`;
          const response = await axios.get(playlistUrl);
          if (
            response.data &&
            response.data.tracks &&
            response.data.tracks.data.length > 0
          ) {
            setPlaylistData(response.data.tracks.data);
            setCurrentTrackIndex(0);
            setTrackData(null);
          }
        } else {
          const trackUrl = `${VITE_API_MUSIC}/track/${trackId}`;
          const response = await axios.get(trackUrl);
          setTrackData(response.data);
          setPlaylistData(null);
        }
      } catch (error) {
        throw new Error('Error fetching data from Deezer:', error);
      }
    };

    fetchData();
  }, [trackId, isPlaylist]);

  const nextTrack = () => {
    if (isPlaylist && playlistData && playlistData.length > 0) {
      setCurrentTrackIndex((prevIndex) =>
        prevIndex + 1 < playlistData.length ? prevIndex + 1 : 0,
      );
    } else {
      setTrackId((prevId) => prevId + 1);
    }
  };

  const previousTrack = () => {
    if (isPlaylist && playlistData && playlistData.length > 0) {
      setCurrentTrackIndex((prevIndex) =>
        prevIndex - 1 >= 0 ? prevIndex - 1 : playlistData.length - 1,
      );
    } else {
      setTrackId((prevId) => (prevId > 0 ? prevId - 1 : prevId));
    }
  };

  const currentTrackData = isPlaylist
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
        isPlaylist,
        setTrackId,
        setIsPlaylist,
      }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
};
