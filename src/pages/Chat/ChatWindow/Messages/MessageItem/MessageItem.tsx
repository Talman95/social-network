import React, { FC, memo } from 'react';

import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { path } from '../../../../../enums/path';
import { ChatMessageType } from '../../../../../types/ChatMessageType';

export const MessageItem: FC<{ message: ChatMessageType }> = memo(({ message }) => {
  const navigate = useNavigate();

  const onUserAvatarClick = (): void => {
    navigate(`${path.PROFILE}/${message.userId}`);
  };

  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar
          alt={message.userName}
          src={message.photo}
          onClick={onUserAvatarClick}
          style={{ cursor: 'pointer' }}
        />
      </ListItemAvatar>

      <ListItemText
        primary={message.userName}
        secondary={message.message}
        style={{ wordBreak: 'break-word' }}
      />
    </ListItem>
  );
});
