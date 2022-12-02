import React from 'react';

import { List } from '@mui/material';
import { useSelector } from 'react-redux';

import { selectMessages } from '../../../../store/selectors/chatSelectors';

import { MessageItem } from './MessageItem/MessageItem';

export const Messages = () => {
  const messages = useSelector(selectMessages);

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
