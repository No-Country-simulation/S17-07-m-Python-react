import React, { useEffect, useState } from 'react';
import { Box, IconButton, TextField, InputAdornment,Typography } from '@mui/material';
import { Send, Close } from '@mui/icons-material';

import { SmartToy } from '@mui/icons-material';

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect (() => {
    const ws = new WebSocket('');
    setSocket(ws); 

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    ws.onclose = () => {
      console.log('Conexión cerrada');
    };

    return () => {
      ws.close();
    };
  }, []);
  

  const handleSendMessage = () => {
    if (input.trim()) {
      const userMessage = { sender: 'user', text: input };
      setMessages([...messages, userMessage]);

      if (socket) {
        socket.send(JSON.stringify(userMessage));
      }
      setInput('');
    }
  };

  return (
    <Box
      sx={{
        width: '300px',
        height: '400px',
        display: 'flex',
        flexDirection: 'column',  
        bgcolor: '#1E1E1E', 
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
          bgcolor: '#1E1E1E',
          color: 'white',
          borderRadius: '10px 20px 0 0',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <SmartToy sx={{ marginRight: '8px' }}/>
          <Typography variant="h6">IA chat</Typography>
        </Box>
        <IconButton
          onClick={onclose}
          sx={{ color: 'white' }}
        >
          <Close />
        </IconButton>
      </Box>



      {/* Cuerpo dle chat */}
      <Box sx={{ padding: '16px', flexGrow: 1 }}>
        <Typography variant="body1" sx={{ marginBottom: '16px', color: 'white' }}>
          ¡Hola! 😊 Soy tu asistente de música, ¿cómo te sientes hoy? Cuéntame un poco sobre tu estado de ánimo y crearé una playlist perfecta para ti. ¡Estoy listo para sorprenderte!
        </Typography>

        {/* Mostrar los mensajes del chat */}
        {messages.map((message, index) => (
          <Typography
            key={index}
            sx={{
              textAlign: message.sender === 'user' ? 'right' : 'left',
              bgcolor: '#212121', 
              padding: '8px',
              borderRadius: '10px',
              color: 'white',
              marginBottom: '8px',
              display: 'inline-block',
            }}
          >
            <strong>{message.sender === 'user' ? 'Tú: ' : 'IA: '}</strong>
            {message.text}
          </Typography>
        ))}
      </Box>

      {/* Área para escribir mensajes */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: '8px',
          bgcolor: '#3d3c3d', 
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
              bgcolor: '#3d3c3d',
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
