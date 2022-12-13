import { chatStatus } from '../../enums/chatStatus';

export type MessagesReceivedSubscriberType = (messages: ChatMessageApiType[]) => void;

export type StatusChangedSubscriberType = (status: chatStatus) => void;

export type ChatMessageApiType = {
  message: string;
  photo: string;
  userId: number;
  userName: string;
};
