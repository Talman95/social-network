import { ChatMessageApiType } from '../api/chat/types';

export type ChatMessageType = ChatMessageApiType & {
  id: string;
};
