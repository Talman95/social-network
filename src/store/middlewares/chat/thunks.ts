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

const newMessageHandler = (
  dispatch: Dispatch,
): ((messages: ChatMessageApiType[]) => void) | null => {
  if (newMessageHandlerMemoized === null) {
    newMessageHandlerMemoized = messages => {
      dispatch(messagesReceived(messages));
    };
  }

  return newMessageHandlerMemoized;
};

let statusChangedHandlerMemoized: ((status: chatStatus) => void) | null = null;

const statusChangedHandler = (
  dispatch: Dispatch,
): ((status: chatStatus) => void) | null => {
  if (statusChangedHandlerMemoized === null) {
    statusChangedHandlerMemoized = status => {
      dispatch(statusChanged(status));
    };
  }

  return statusChangedHandlerMemoized;
};

export const startMessagesListening = (): AppThunk => dispatch => {
  chatAPI.start();
  // @ts-ignore
  chatAPI.subscribe('messages-received', newMessageHandler(dispatch));
  // @ts-ignore
  chatAPI.subscribe('status-changed', statusChangedHandler(dispatch));
};

export const stopMessagesListeningWorker = (): AppThunk => dispatch => {
  // @ts-ignore
  chatAPI.unsubscribe('messages-received', newMessageHandler(dispatch));
  // @ts-ignore
  chatAPI.unsubscribe('status-changed', statusChangedHandler(dispatch));
  chatAPI.stop();
  dispatch(clearMessages());
};

export const sendMessage =
  (message: string): AppThunk =>
  () => {
    chatAPI.sendMessage(message);
  };
