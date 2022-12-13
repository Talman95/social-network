import { Dispatch } from 'redux';

import { chatAPI } from '../../../api/chat';
import { ChatMessageApiType } from '../../../api/chat/types';
import { chatStatus } from '../../../enums/chatStatus';
import {
  clearMessages,
  messagesReceived,
  statusChanged,
} from '../../actions/chatActions';
import { AppThunk } from '../../store';

let newMessageHandlerMemoized: ((messages: ChatMessageApiType[]) => void) | null = null;

const newMessageHandler = (dispatch: Dispatch) => {
  if (newMessageHandlerMemoized === null) {
    newMessageHandlerMemoized = messages => {
      dispatch(messagesReceived(messages));
    };
  }

  return newMessageHandlerMemoized;
};

let statusChangedHandlerMemoized: ((status: chatStatus) => void) | null = null;

const statusChangedHandler = (dispatch: Dispatch) => {
  if (statusChangedHandlerMemoized === null) {
    statusChangedHandlerMemoized = status => {
      dispatch(statusChanged(status));
    };
  }

  return statusChangedHandlerMemoized;
};

export const startMessagesListening = (): AppThunk => dispatch => {
  chatAPI.start();
  chatAPI.subscribe('messages-received', newMessageHandler(dispatch));
  chatAPI.subscribe('status-changed', statusChangedHandler(dispatch));
};

export const stopMessagesListeningWorker = (): AppThunk => dispatch => {
  chatAPI.unsubscribe('messages-received', newMessageHandler(dispatch));
  chatAPI.unsubscribe('status-changed', statusChangedHandler(dispatch));
  chatAPI.stop();
  dispatch(clearMessages());
};

export const sendMessage =
  (message: string): AppThunk =>
  () => {
    chatAPI.sendMessage(message);
  };
