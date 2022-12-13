import React from 'react';

import { Card } from '@mui/material';
import { useSelector } from 'react-redux';

import { chatStatus } from '../../../enums/chatStatus';
import { selectStatus } from '../../../store/selectors/chatSelectors';

import { ChatHeader } from './ChatHeader/ChatHeader';
import { Messages } from './Messages/Messages';

export const ChatWindow = () => {
  const status = useSelector(selectStatus);

  return (
    <Card sx={{ margin: 1, padding: { sm: 2 } }}>
      <ChatHeader />
      {status === chatStatus.ERROR ? (
        <div>Some error occurred. Please refresh the page</div>
      ) : (
        <Messages />
      )}
    </Card>
  );
};
