import { SubscriberType } from './types';

let subscribers = [] as SubscriberType[];

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

  subscribers.forEach(subscriber => subscriber(newMessages));
};

function createChannel() {
  ws?.removeEventListener('close', closeHandler);
  ws?.close();

  ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
  ws.addEventListener('close', closeHandler);
  ws.addEventListener('message', handleMessage);
}

export const chatAPI = {
  start: () => {
    createChannel();
  },

  stop: () => {
    subscribers = [];
    ws?.removeEventListener('close', closeHandler);
    ws?.removeEventListener('message', handleMessage);
    ws?.close();
  },

  subscribe: (callback: SubscriberType) => {
    subscribers.push(callback);

    return () => {
      subscribers = subscribers.filter(s => s !== callback);
    };
  },

  unsubscribe: (callback: SubscriberType) => {
    subscribers.filter(s => s !== callback);
  },

  sendMessage: (message: string) => {
    ws?.send(message);
  },
};
