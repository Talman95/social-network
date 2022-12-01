import { ChatMessageType } from '../../types/ChatMessageType';

import { chatActionType } from './types/chatTypes';

export const messagesReceived = (messages: ChatMessageType[]) => ({
  type: chatActionType.MESSAGES_RECEIVED,
  payload: { messages } as const,
});
