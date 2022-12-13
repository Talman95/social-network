import { chatStatus } from '../../enums/chatStatus';

import { MessagesReceivedSubscriberType, StatusChangedSubscriberType } from './types';

const subscribers = {
  'messages-received': [] as MessagesReceivedSubscriberType[],
  'status-changed': [] as StatusChangedSubscriberType[],
};

type EventsNamesType = 'messages-received' | 'status-changed';

let ws: WebSocket | null = null;

const time = 3000;

const closeHandler = () => {
  setTimeout(() => {
    ws?.addEventListener('close', closeHandler);
    ws?.close();

    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
    ws.addEventListener('close', closeHandler);
  }, time);
};

const handleMessage = (e: MessageEvent) => {
  const newMessages = JSON.parse(e.data);

  subscribers['messages-received'].forEach(subscriber => subscriber(newMessages));
};

const notifySubscribersAboutStatus = (status: chatStatus) => {
  subscribers['status-changed'].forEach(subscriber => subscriber(status));
};

const handleOpen = () => {
  notifySubscribersAboutStatus(chatStatus.READY);
};

const handleError = () => {
  notifySubscribersAboutStatus(chatStatus.ERROR);
  console.log('REFRESH PAGE');
};

const cleanUp = () => {
  ws?.removeEventListener('close', closeHandler);
  ws?.removeEventListener('message', handleMessage);
  ws?.removeEventListener('open', handleOpen);
  ws?.removeEventListener('error', handleError);
};

function createChannel() {
  cleanUp();

  ws?.close();

  ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
  notifySubscribersAboutStatus(chatStatus.PENDING);
  ws.addEventListener('close', closeHandler);
  ws.addEventListener('message', handleMessage);
  ws.addEventListener('open', handleOpen);
  ws.addEventListener('error', handleError);
}

export const chatAPI = {
  start: () => {
    createChannel();
  },

  stop: () => {
    subscribers['messages-received'] = [];
    subscribers['status-changed'] = [];

    cleanUp();
    ws?.close();
  },

  subscribe: (
    eventName: EventsNamesType,
    callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType,
  ) => {
    // @ts-ignore
    subscribers[eventName].push(callback);

    return () => {
      // @ts-ignore
      subscribers[eventName] = subscribers[eventName].filter(s => s !== callback);
    };
  },

  unsubscribe: (
    eventName: EventsNamesType,
    callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType,
  ) => {
    // @ts-ignore
    subscribers[eventName] = subscribers[eventName].filter(s => s !== callback);
  },

  sendMessage: (message: string) => {
    ws?.send(message);
  },
};
