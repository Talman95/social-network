import React, { FC } from 'react';

import {
  Avatar,
  Divider,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from '@mui/material';

type PropsType = {
  userName: string;
  hasNewMessages: boolean;
  newMessagesCount: number;
  photo: string;
  lastDialogActivityDate: string;
};

export const DialogItem: FC<PropsType> = ({
  userName,
  hasNewMessages,
  newMessagesCount,
  photo,
  lastDialogActivityDate,
}) => {
  const formattedDate = new Date(lastDialogActivityDate).toLocaleString();

  return (
    <>
      <ListItem
        secondaryAction={
          hasNewMessages && (
            <IconButton edge="end" aria-label="comments">
              {newMessagesCount}
            </IconButton>
          )
        }
      >
        <ListItemButton>
          <ListItemAvatar>
            <Avatar alt={userName} src={photo} />
          </ListItemAvatar>
          <ListItemText primary={userName} secondary={formattedDate} />
        </ListItemButton>
      </ListItem>
      <Divider />
    </>
  );
};
