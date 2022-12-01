import React from 'react';

import { Card } from '@mui/material';

import { ChatHeader } from './ChatHeader/ChatHeader';
import { Messages } from './Messages/Messages';

export const ChatWindow = () => (
  <Card sx={{ margin: 1, padding: { sm: 2 } }}>
    <ChatHeader />
    <Messages />
  </Card>
);
