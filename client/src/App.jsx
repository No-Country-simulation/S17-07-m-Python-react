import { useState } from 'react';
import reactLogo from './core/assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { Button, Typography } from '@mui/material';
import { Numbers } from '@mui/icons-material';
import MusicPlayer from './modules/dashboard/submodules/player/components/musicPlayer/musicPlayer';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <MusicPlayer/>
    </>
  );
}

export default App;
