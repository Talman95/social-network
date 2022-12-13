import { ChatMessageApiType } from '../../api/chat/types';
import { chatStatus } from '../../enums/chatStatus';

import { chatActionType } from './types/chatTypes';

export const messagesReceived = (messages: ChatMessageApiType[]) =>
  ({
    type: chatActionType.MESSAGES_RECEIVED,
    payload: { messages },
  } as const);

export const statusChanged = (status: chatStatus) =>
  ({
    type: chatActionType.STATUS_CHANGED,
    payload: { status },
  } as const);

export const clearMessages = () =>
  ({
    type: chatActionType.CLEAR_MESSAGES,
  } as const);
