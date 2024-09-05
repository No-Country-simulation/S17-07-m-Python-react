import ShuffleIcon from '@mui/icons-material/Shuffle';
import ShuffleOnIcon from '@mui/icons-material/ShuffleOn';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import RepeatIcon from '@mui/icons-material/Repeat';
import RepeatOneOnIcon from '@mui/icons-material/RepeatOneOn';
import RepeatOnIcon from '@mui/icons-material/RepeatOn';
import "./musicControls.css"

export default function MusicControls ({props}){
    const {isPlaying, volume, repeat, shuffle, handlePlayPause, handleVolumeChange, handleRepeatChange, handleShuffle} = props
    return(
        <div className="musicControls">

        {!shuffle ? 
        <ShuffleIcon 
        onClick={handleShuffle} 
        sx={{
            cursor: "pointer",
            height: "5vh",
            maxHeight: "5vh",
        }}
        /> 

        : 

        <ShuffleOnIcon 
        onClick={handleShuffle}
        sx={{
            cursor: "pointer",
            height: "5vh",
            maxHeight: "5vh",
            color: "#FACD66"
        }}
        />}

        <SkipPreviousIcon />

        {!isPlaying ?
        <PlayCircleIcon 
        onClick={handlePlayPause}
        sx={{ 
          width: "6vw",
          height: "10vh",
          color: "#FACD66",
          cursor: "pointer",

        }}
        />
        :
        <PauseCircleIcon
        onClick={handlePlayPause}
        sx={{
          width: "6vw",
          height: "10vh",
          color: "#FACD66",
          cursor: "pointer"
        }}
        />}

        <SkipNextIcon />

        {repeat === "off" && <RepeatIcon onClick={handleRepeatChange} />}
        {repeat === "on" && <RepeatOnIcon onClick={handleRepeatChange} sx={{
            cursor: "pointer",
            height: "5vh",
            maxHeight: "5vh",
            color: "#FACD66"
        }}/>}
        {repeat === "one" && <RepeatOneOnIcon onClick={handleRepeatChange} sx={{
            cursor: "pointer",
            height: "5vh",
            maxHeight: "5vh",
            color: "#FACD66"
        }}/>}

        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="volumeControl"
        />
        </div>
    )
}