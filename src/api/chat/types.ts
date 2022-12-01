import { ChatMessageType } from '../../types/ChatMessageType';

export type SubscriberType = (messages: ChatMessageType[]) => void;
