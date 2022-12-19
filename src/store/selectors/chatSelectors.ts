import { chatStatus } from '../../enums/chatStatus';
import { ChatMessageType } from '../../types/ChatMessageType';
import { RootState } from '../store';

export const selectMessages = (state: RootState): ChatMessageType[] =>
  state.chat.messages;

export const selectStatus = (state: RootState): chatStatus => state.chat.status;
