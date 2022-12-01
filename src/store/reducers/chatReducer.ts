import { ChatMessageType } from '../../types/ChatMessageType';
import { messagesReceived } from '../actions/chatActions';
import { chatActionType } from '../actions/types/chatTypes';

const initialState = {
  messages: [] as ChatMessageType[],
};

type ChatStateType = typeof initialState;
export type ChatActionsType = ReturnType<typeof messagesReceived>;

export const chatReducer = (
  state = initialState,
  action: ChatActionsType,
): ChatStateType => {
  switch (action.type) {
    case chatActionType.MESSAGES_RECEIVED:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};
