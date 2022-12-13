import React, { useEffect, useRef, useState } from 'react';

import { List } from '@mui/material';
import { useSelector } from 'react-redux';

import { selectMessages } from '../../../../store/selectors/chatSelectors';

import { MessageItem } from './MessageItem/MessageItem';

export const Messages = () => {
  const messages = useSelector(selectMessages);

  const messagesAnchorRef = useRef<HTMLDivElement>(null);

  const [autoScroll, setAutoScroll] = useState(true);

  const onChatListScroll = (e: React.UIEvent) => {
    const element = e.currentTarget;
    const scrollError = 300;

    if (
      Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) <
      scrollError
    ) {
      if (!autoScroll) {
        setAutoScroll(true);
      }
    } else if (autoScroll) {
      setAutoScroll(false);
    }
  };

  useEffect(() => {
    if (autoScroll) {
      messagesAnchorRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <List
      sx={{
        width: '100%',
        bgcolor: 'background.paper',
        height: '400px',
        overflowY: 'auto',
      }}
      onScroll={onChatListScroll}
    >
      {messages.map(message => (
        <MessageItem key={message.id} message={message} />
      ))}
      <div ref={messagesAnchorRef} />
    </List>
  );
};
