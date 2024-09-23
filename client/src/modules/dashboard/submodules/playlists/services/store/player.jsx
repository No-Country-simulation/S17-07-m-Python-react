import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { getEnvVariables } from '../../../../../../core/utils/getEnvVariables';

const { VITE_API_MUSIC } = getEnvVariables();
const { VITE_API_URL } = getEnvVariables();
export const MusicPlayerContext = createContext();

export const MusicPlayerProvider = ({ children }) => {
  const [trackId, setTrackId] = useState(null);
  const [type, setType] = useState('playlist'); // 'track', 'album', 'playlist' or 'my-playlist'
  const [trackData, setTrackData] = useState(null);
  const [playlistData, setPlaylistData] = useState(null);
  const [myPlaylistData, setMyPlaylistData] = useState(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = '';
        let isPlaylistOrAlbum = false;
        const token = localStorage.getItem('token');
        switch (type) {
          case 'playlist':
            url = `${VITE_API_MUSIC}/playlist/${trackId}`;
            isPlaylistOrAlbum = true;
            break;
          case 'album':
            url = `${VITE_API_URL}/search/category/album/${trackId}`;
            isPlaylistOrAlbum = true;
            break;
          case 'track':
            url = `${VITE_API_URL}/search/category/track/${trackId}`;
            break;
          case 'my-playlist':
            if (myPlaylistData) {
              return;
            }
            return;
          default:
            throw new Error('Invalid type');
        }

        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });

        if (isPlaylistOrAlbum) {
          const tracks = response.data.data?.tracks?.data;
          if (tracks && tracks.length > 0) {
            setPlaylistData(tracks);
            setCurrentTrackIndex(0);
            setTrackData(null);
          }
        } else {
          setTrackData(response.data.data);
          setPlaylistData(null);
        }
      } catch (error) {
        throw new Error(error);
      }
    };

    fetchData();
  }, [trackId, type, myPlaylistData]);

  const nextTrack = () => {
    const data = type === 'my-playlist' ? myPlaylistData : playlistData;
    if (data && data.length > 0) {
      setCurrentTrackIndex((prevIndex) =>
        prevIndex + 1 < data.length ? prevIndex + 1 : 0,
      );
    }
  };

  const previousTrack = () => {
    const data = type === 'my-playlist' ? myPlaylistData : playlistData;
    if (data && data.length > 0) {
      setCurrentTrackIndex((prevIndex) =>
        prevIndex - 1 >= 0 ? prevIndex - 1 : data.length - 1,
      );
    }
  };

  const selectTrack = (index) => {
    const data = type === 'my-playlist' ? myPlaylistData : playlistData;
    if (data && index >= 0 && index < data.length) {
      setCurrentTrackIndex(index);
    }
  };

  const addToMyPlaylist = async (trackIds) => {
    try {
      const trackDetailsPromises = trackIds.map((id) =>
        axios.get(`${VITE_API_MUSIC}/track/${id}`),
      );
      const tracks = await Promise.all(trackDetailsPromises);
      setMyPlaylistData(tracks.map((response) => response.data));
      setType('my-playlist');
      setTrackData(null);
      setCurrentTrackIndex(0);
    } catch (error) {
      throw new Error(error);
    }
  };

  const currentTrackData =
    type === 'playlist' || type === 'album' || type === 'my-playlist'
      ? (type === 'my-playlist' ? myPlaylistData : playlistData) &&
        (playlistData || myPlaylistData).length > 0
        ? (type === 'my-playlist' ? myPlaylistData : playlistData)[
            currentTrackIndex
          ]
        : null
      : trackData;

  return (
    <MusicPlayerContext.Provider
      value={{
        trackData: currentTrackData,
        playlistData,
        myPlaylistData,
        nextTrack,
        previousTrack,
        selectTrack,
        trackId,
        type,
        setTrackId,
        setType,
        currentTrackIndex,
        setTrackData,
        addToMyPlaylist,
      }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
};
