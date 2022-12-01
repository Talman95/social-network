import React, { FC } from 'react';

import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@mui/material';

import { ChatMessageType } from '../../../../../types/ChatMessageType';

export const MessageItem: FC<{ message: ChatMessageType }> = ({ message }) => (
  <ListItem alignItems="flex-start">
    <ListItemAvatar>
      <Avatar alt={message.userName} src={message.photo} />
    </ListItemAvatar>
    <ListItemText primary={message.userName} secondary={message.message} />
  </ListItem>
);
