import { sagaType } from './sagaType';

export const startMessagesListening = () => ({
  type: sagaType.START_MESSAGES_LISTENING,
});

export const stopMessagesListening = () => ({
  type: sagaType.START_MESSAGES_LISTENING,
});
