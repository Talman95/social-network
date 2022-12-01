import { put, takeEvery } from 'redux-saga/effects';

import { chatAPI } from '../../../api/chat';
import { messagesReceived } from '../../actions/chatActions';

import { startMessagesListening } from './actions';
import { sagaType } from './sagaType';

export function* startMessagesListeningWorker() {
  yield chatAPI.subscribe(messages => {
    put(messagesReceived(messages));
  });
}

export function* stopMessagesListeningWorker() {
  yield chatAPI.subscribe(messages => {
    put(messagesReceived(messages));
  });
}

export function* chatWatcher() {
  yield takeEvery(sagaType.START_MESSAGES_LISTENING, startMessagesListeningWorker);
  yield takeEvery(sagaType.STOP_MESSAGES_LISTENING, stopMessagesListeningWorker);
}

export type ChatSagasType = ReturnType<typeof startMessagesListening>;
