import React, { createContext, useState, useContext } from 'react';

const MessagesContext = createContext();

export const MessagesProvider = ({ children }) => {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: '¡Hola! 😊 Soy tu asistente de música, ¿cómo te sientes hoy? Cuéntame un poco sobre tu estado de ánimo y crearé una playlist perfecta para ti. ¡Estoy listo para sorprenderte!',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <MessagesContext.Provider
      value={{ messages, setMessages, input, setInput, loading, setLoading }}
    >
      {children}
    </MessagesContext.Provider>
  );
};

export const useMessages = () => useContext(MessagesContext);
