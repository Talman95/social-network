import React, { FC } from 'react';

import {
  Avatar,
  Box,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from '@mui/material';

import cl from './DialogItem.module.css';

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
      <ListItem>
        <ListItemButton style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <ListItemAvatar>
              <Avatar alt={userName} src={photo} />
            </ListItemAvatar>
            <ListItemText primary={userName} secondary={formattedDate} />
          </Box>

          {hasNewMessages && (
            <Box>
              <span className={cl.chat_notice}>{newMessagesCount}</span>
            </Box>
          )}
        </ListItemButton>
      </ListItem>
      <Divider />
    </>
  );
};
