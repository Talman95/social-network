const SEND_MESSAGE = 'SEND_MESSAGE';
const UPDATE_MESSAGE_BODY = 'UPDATE_MESSAGE_BODY';
const REMOVE_MESSAGE = 'REMOVE_MESSAGE';

const initialState = {
  dialogs: [
    {
      id: 1,
      name: 'Dmitrii Antonov',
      lastMessage: 'Hey. Do you have any props?',
      notice: 1,
      time: '12:33',
    },
    {
      id: 2,
      name: 'Mitya Bugaev',
      lastMessage: "Let's get it started!",
      notice: 11,
      time: '00:19',
    },
    {
      id: 3,
      name: 'Dariya Bugaeva',
      lastMessage: 'Merry Christmas',
      notice: 2,
      time: '23:07',
    },
  ] as Array<DialogType>,
  messages: [
    {
      id: 1,
      name: 'Dmitrii Antonov',
      message: 'Hello! How are you? When are you start to learn react?',
      time: '22:22',
    },
    {
      id: 2,
      name: 'Dmitrii Antonov',
      message: 'Hi! We will start after the new year. 3 january',
      time: '22:24',
    },
    { id: 3, name: 'Dmitrii Antonov', message: 'Yo, cooool', time: '22:28' },
    { id: 4, name: 'Dmitrii Antonov', message: "Yes, it's awesome!", time: '22:30' },
  ] as Array<MessageType>,
  messageBody: '',
};

export type MessagesStateType = typeof initialState;

export const messagesReducer = (
  state: MessagesStateType = initialState,
  action: MessagesActionsType,
): MessagesStateType => {
  switch (action.type) {
    case UPDATE_MESSAGE_BODY: {
      return { ...state, messageBody: action.newBody };
    }
    case SEND_MESSAGE: {
      const date = new Date();
      const newMessage = {
        id: date.getTime(),
        name: 'Dmitrii Antonov',
        message: state.messageBody,
        time: `${date.getHours()}:${date.getMinutes()}`,
      };

      return { ...state, messages: [...state.messages, newMessage] };
    }
    case REMOVE_MESSAGE: {
      return {
        ...state,
        messages: [...state.messages.filter(m => m.id !== action.messageID)],
      };
    }
    default:
      return state;
  }
};

// actions
export const updateMessageBodyAC = (newBody: string) =>
  ({
    type: UPDATE_MESSAGE_BODY,
    newBody,
  } as const);
export const sendMessageAC = () => ({ type: SEND_MESSAGE } as const);
export const removeMessageAC = (messageID: number) =>
  ({
    type: REMOVE_MESSAGE,
    messageID,
  } as const);

// types
export type MessageType = {
  id: number;
  name: string;
  message: string;
  time: string;
};
export type DialogType = {
  id: number;
  name: string;
  lastMessage: string;
  notice: number;
  time: string;
};

export type MessagesActionsType =
  | ReturnType<typeof sendMessageAC>
  | ReturnType<typeof updateMessageBodyAC>
  | ReturnType<typeof removeMessageAC>;
