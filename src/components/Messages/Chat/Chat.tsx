import React, { FC } from 'react';

import cl from './Chat.module.css';
import { ChatPropsType } from './ChatContainer';
import { ChatHeader } from './ChatHeader/ChatHeader';
import { ChatWindow } from './ChatWindow/ChatWindow';

export const Chat: FC<ChatPropsType> = ({
  messages,
  messageBody,
  updateMessageBody,
  sendMessage,
}) => (
  <div className={cl.chat}>
    <ChatHeader name="Dmitrii Antonov" status="Heeeeeeey" />
    <ChatWindow
      messages={messages}
      messageBody={messageBody}
      updateMessageBody={updateMessageBody}
      sendMessage={sendMessage}
    />
  </div>
);
