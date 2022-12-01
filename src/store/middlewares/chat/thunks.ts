import { Dispatch } from 'redux';

import { chatAPI } from '../../../api/chat';
import { ChatMessageType } from '../../../types/ChatMessageType';
import { messagesReceived } from '../../actions/chatActions';
import { AppThunk } from '../../store';

let newMessageHandlerMemo: ((messages: ChatMessageType[]) => void) | null = null;

const newMessageHandler = (dispatch: Dispatch) => {
  if (newMessageHandlerMemo === null) {
    newMessageHandlerMemo = messages => {
      dispatch(messagesReceived(messages));
    };
  }

  return newMessageHandlerMemo;
};

export const startMessagesListening = (): AppThunk => dispatch => {
  chatAPI.start();
  chatAPI.subscribe(newMessageHandler(dispatch));
};

export const stopMessagesListeningWorker = (): AppThunk => dispatch => {
  chatAPI.unsubscribe(newMessageHandler(dispatch));
  chatAPI.stop();
};

export const sendMessage =
  (message: string): AppThunk =>
  () => {
    chatAPI.sendMessage(message);
  };
