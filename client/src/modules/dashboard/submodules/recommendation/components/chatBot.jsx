import React, { useState, useContext } from 'react';
import {
  Box,
  IconButton,
  TextField,
  InputAdornment,
  Typography,
} from '@mui/material';
import { Send, SmartToy, PlayCircle } from '@mui/icons-material';
import { fetchMusicTherapy } from '../helpers/fetchMusicTherapy';
import { MusicPlayerContext } from '../../playlists/services/store/player';
import { useMessages } from '../services/store/messages';

const ChatBot = () => {
  const { messages, setMessages, input, setInput, loading, setLoading } =
    useMessages();

  const { setTrackId, setType } = useContext(MusicPlayerContext);

  useState(() => {
    setMessages(messages);
  }, [setMessages]);

  const handleSendMessage = async () => {
    if (input.trim()) {
      const userMessage = { sender: 'user', text: input };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      setLoading(true);

      try {
        const response = await fetchMusicTherapy(input);
        const musicMessages = response.resultados
          .filter((message) => message.preview)
          .map((song) => ({
            sender: 'bot',
            text: `${song.nombre} - ${song.artista}`,
            deezerLink: song.deezer_link,
            preview: song.preview,
          }));

        setMessages((prevMessages) => [...prevMessages, ...musicMessages]);
      } catch (error) {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            sender: 'bot',
            text: 'Lo siento, no se encontró un estado de ánimo adecuado o hubo un error en la búsqueda.',
          },
        ]);
        throw new Error(error);
      } finally {
        setLoading(false);
        setInput('');
      }

      setInput('');
    }
  };

  const handlePlay = (url) => {
    const trackNumber = url.split('/').pop();
    setTrackId(trackNumber);
    setType('track');
  };

  return (
    <Box
      sx={{
        width: '300px',
        height: '400px',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.default',
        borderRadius: '10px',
        boxShadow: 3,
      }}
    >
      {/* Encabezado del chat */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px',
          borderBottom: '1px solid #444',
          bgcolor: 'brown.main',
          color: 'white',
          borderRadius: '10px 20px 0 0',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <SmartToy sx={{ marginRight: '8px' }} />
          <Typography variant="h6">IA chat</Typography>
        </Box>
      </Box>

      {/* Cuerpo del chat */}
      <Box sx={{ padding: '16px', flexGrow: 1, overflowY: 'auto' }}>
        {messages.map((message, index) => (
          <Box
            key={index}
            sx={{
              textAlign: message.sender === 'user' ? 'right' : 'left',
              bgcolor: 'brown.main',
              padding: '8px',
              borderRadius: '10px',
              color: 'white',
              marginBottom: '8px',
              display: 'inline-block',
            }}
          >
            {message.sender === 'user' ? (
              <Typography variant="body1">
                <strong>Tú: </strong>
                {message.text}
              </Typography>
            ) : (
              <>
                <Typography variant="body1">
                  <strong>
                    IA:
                    {message.deezerLink && (
                      <IconButton
                        onClick={() => handlePlay(message.deezerLink)}
                        color="secondary"
                      >
                        <PlayCircle />
                      </IconButton>
                    )}{' '}
                  </strong>
                  {message.text}
                </Typography>
              </>
            )}
          </Box>
        ))}

        {/* Indicador de carga */}
        {loading && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'end',
              marginTop: '16px',
            }}
          >
            <Typography
              variant="body2"
              sx={{ marginLeft: '8px', color: 'white' }}
            >
              Escribiendo{'.'.repeat((Math.floor(Date.now() / 500) % 3) + 1)}
            </Typography>
          </Box>
        )}
      </Box>

      {/* Área para escribir mensajes */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: '8px',
          bgcolor: 'background.default',
          borderRadius: '0 0 20px 20px',
        }}
      >
        <TextField
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe un mensaje"
          variant="outlined"
          fullWidth
          InputProps={{
            sx: {
              borderRadius: '20px',
              bgcolor: 'background.default',
              color: 'white',
            },
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleSendMessage}
                  sx={{
                    color: 'black',
                    marginRight: '4px',
                  }}
                >
                  <Send />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ input: { color: 'white' } }}
        />
      </Box>
    </Box>
  );
};

export default ChatBot;
