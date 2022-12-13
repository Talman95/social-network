import { v1 } from 'uuid';

import { chatStatus } from '../../enums/chatStatus';
import { ChatMessageType } from '../../types/ChatMessageType';
import { clearMessages, messagesReceived, statusChanged } from '../actions/chatActions';
import { chatActionType } from '../actions/types/chatTypes';

const MAX_MESSAGES_ARRAY_LENGTH = 100;

const initialState = {
  messages: [] as ChatMessageType[],
  status: chatStatus.PENDING as chatStatus,
};

type ChatStateType = typeof initialState;
export type ChatActionsType =
  | ReturnType<typeof messagesReceived>
  | ReturnType<typeof statusChanged>
  | ReturnType<typeof clearMessages>;

export const chatReducer = (
  state = initialState,
  action: ChatActionsType,
): ChatStateType => {
  switch (action.type) {
    case chatActionType.MESSAGES_RECEIVED:
      return {
        ...state,
        messages: [
          ...state.messages,
          ...action.payload.messages.map(message => ({
            ...message,
            id: v1(),
          })),
        ].filter(
          (message, index, array) => index >= array.length - MAX_MESSAGES_ARRAY_LENGTH,
        ),
      };
    case chatActionType.STATUS_CHANGED:
      return {
        ...state,
        ...action.payload,
      };
    case chatActionType.CLEAR_MESSAGES:
      return {
        ...state,
        messages: [],
      };
    default:
      return state;
  }
};
