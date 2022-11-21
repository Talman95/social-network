import { SubscriberType } from './types';

const subscribers = [] as SubscriberType[];

let ws: WebSocket;

const time = 3000;

const handleClose = () => {
  // console.log('Close WS');
  setTimeout(() => {
    ws?.addEventListener('close', handleClose);
    ws?.close();

    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
    ws.addEventListener('close', handleClose);
  }, time);
};

// function createChannel() {
//   ws?.addEventListener('close', handleClose);
//   ws?.close();
//
//   ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
//   ws.addEventListener('close', handleClose);
// };

// const handleMessage = (e: MessageEvent) => {
//   const newMessages = JSON.parse(e.data);
//
//   subscribers.forEach(s => s(newMessages));
// };

export const chatAPI = {
  subscribe: (callback: SubscriberType) => {
    subscribers.push(callback);

    return () => {
      subscribers.filter(s => s !== callback);
    };
  },

  unsubscribe: (callback: SubscriberType) => {
    subscribers.filter(s => s !== callback);
  },
};
