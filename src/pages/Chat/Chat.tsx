import React, { useEffect } from 'react';

import { Box } from '@mui/material';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import {
  startMessagesListening,
  stopMessagesListeningWorker,
} from '../../store/middlewares/chat/thunks';

import { AddMessageBox } from './AddMessageBox/AddMessageBox';
import { ChatWindow } from './ChatWindow/ChatWindow';

export const Chat = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(startMessagesListening());

    return () => {
      dispatch(stopMessagesListeningWorker());
    };
  }, []);

  return (
    <Box sx={{ height: '70vh' }}>
      <ChatWindow />
      <AddMessageBox />
    </Box>
  );
};
