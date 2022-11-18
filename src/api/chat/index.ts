import {SubscriberType} from "./types";

let subscribers = [] as SubscriberType[]

let ws: WebSocket;

const handleClose = () => {
    console.log('Close WS')
    setTimeout(createChannel, 3000)
}

const createChannel = () => {
    ws?.addEventListener('close', handleClose)
    ws?.close()

    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    ws.addEventListener('close', handleClose)
}

const handleMessage = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data)
    subscribers.forEach(s => s(newMessages))
}

export const chatAPI = {
    subscribe: (callback: SubscriberType) => {
        subscribers.push(callback)
        return () => {
            subscribers.filter(s => s !== callback)
        }
    },
    unsubscribe: (callback: SubscriberType) => {
        subscribers.filter(s => s !== callback)
    }
}

