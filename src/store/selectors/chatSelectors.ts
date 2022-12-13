import { RootState } from '../store';

export const selectMessages = (state: RootState) => state.chat.messages;

export const selectStatus = (state: RootState) => state.chat.status;
