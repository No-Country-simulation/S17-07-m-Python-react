
import { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import LibraryControls from "./libraryControls/libraryControls";
import MusicControls from "./musicControls/musicControls";
import CurrentMusic from "./currentMusic/currentMusic";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';
import "./musicPlayer.css";
import axios from "axios";

function ContinuousSlider({props}) {
  const {volume, handleVolumeChange} = props


  return (
    <Box sx={{ width: "13vw", position: "absolute", top:"4.7vh", right:"46vh" }}>
      <Stack spacing={2} direction="row" sx={{ alignItems: 'center', mb: 1 }}>
        <VolumeDown />
        <Slider aria-label="Volume" sx={{color:"#FACD66"}} min={0} max={1} step={0.1} value={volume} onChange={handleVolumeChange} />
        <VolumeUp />
      </Stack>
    </Box>
  );
}

const MusicPlayer = ({trackId}) => {
  const repeatValues = ["off", "on", "one"]
  const [isPlaying, setIsPlaying] = useState(false); 
  const [volume, setVolume] = useState(0.8); 
  const [repeat, setRepeat] = useState(repeatValues[0])
  const [shuffle, setShuffle] = useState(false)
  const [trackData, setTrackData] = useState("")
  const [currentTime, setCurrentTime] = useState(0);

  const playerRef = useRef(null)
  const trackUrl = "https://cors-anywhere.herokuapp.com/https://api.deezer.com/track/3135556"

  useEffect(() => {
    const fetchTrackData = async () => {
      try {
        const response = await axios.get(trackUrl);
        setTrackData(response.data);
      } catch (error) {
        console.error('Error fetching track data from Deezer:', error);
      }
    };
    fetchTrackData();
  }, [trackId]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current) {
        setCurrentTime(playerRef.current.getCurrentTime()); 
      }
    }, 1000); 

    return () => clearInterval(interval); 
  }, []);


  const handlePlayPause = () => {
    setIsPlaying(!isPlaying); 
  };

  const handleVolumeChange = (event) => {
    setVolume(parseFloat(event.target.value)); 
  };

  const handleRepeatChange = () => {
    const index = repeatValues.indexOf(repeat)
    if (index === 2) setRepeat(repeatValues[0]);
    setRepeat(repeatValues[(index+1)%3])
  }

  const handleShuffle = () => {
    setShuffle(!shuffle)
  }

  return (
    <div className="music-player">
      <ReactPlayer
        ref={playerRef}
        url={trackUrl}
        playing={isPlaying} 
        volume={volume} 
        controls={false} 
        height="100px" 
        width="100%" 
        display="none"
      />
      
        <MusicControls 
        props={{ isPlaying, volume, repeat, shuffle, handlePlayPause, handleVolumeChange, handleRepeatChange, handleShuffle}}
        />

        <ContinuousSlider props={{volume, handleVolumeChange}} />

        <LibraryControls />

        <p className="trackTime">{currentTime} </p>

        <CurrentMusic props={{trackData}} />

      
    </div>
  );
};

export default MusicPlayer;
