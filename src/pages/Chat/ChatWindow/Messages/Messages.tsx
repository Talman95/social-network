import React from 'react';

import { List } from '@mui/material';

import { useAppSelector } from '../../../../hooks/useAppSelector';

import { MessageItem } from './MessageItem/MessageItem';

export const Messages = () => {
  const messages = useAppSelector(state => state.chat.messages);

  return (
    <List
      sx={{
        width: '100%',
        bgcolor: 'background.paper',
        height: '400px',
        overflowY: 'auto',
      }}
    >
      {messages.map(message => (
        <MessageItem key={message.userId + message.message} message={message} />
      ))}
    </List>
  );
};
