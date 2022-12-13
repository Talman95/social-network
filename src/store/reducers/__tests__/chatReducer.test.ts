import { ChatMessageApiType } from '../../../api/chat/types';
import { chatStatus } from '../../../enums/chatStatus';
import {
  clearMessages,
  messagesReceived,
  statusChanged,
} from '../../actions/chatActions';
import { chatReducer, ChatStateType } from '../chatReducer';

let startState: ChatStateType = {
  messages: [],
  status: chatStatus.PENDING,
};

beforeEach(() => {
  startState = {
    messages: [],
    status: chatStatus.PENDING,
  };
});

test('correct messages should received', () => {
  const firstElement = 0;
  const secondElement = 1;

  const messages: ChatMessageApiType[] = [
    { message: 'hello', photo: 'img/', userId: 11111, userName: 'roman' },
    { message: 'yo', photo: 'img/', userId: 22222, userName: 'victor' },
  ];
  const endState = chatReducer(startState, messagesReceived(messages));

  expect(endState.messages[firstElement].message).toBe(messages[firstElement].message);
  expect(endState.messages[firstElement].photo).toBe(messages[firstElement].photo);
  expect(endState.messages[secondElement].userId).toBe(messages[secondElement].userId);
  expect(endState.messages[secondElement].userName).toBe(
    messages[secondElement].userName,
  );

  expect(endState.messages[firstElement].id).toBeDefined();
  expect(endState.messages[secondElement].id).toBeDefined();
});

test('correct status should changed', () => {
  const status = chatStatus.READY;

  const endState = chatReducer(startState, statusChanged(status));

  expect(endState.status).toBe(status);
});

test('correct messages should be cleared', () => {
  const endState = chatReducer(startState, clearMessages());

  expect(endState.messages).toStrictEqual([]);
});
