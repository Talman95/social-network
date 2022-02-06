import React from 'react';
import {ActionTypes, MessagesPageType} from "./state";

const SEND_MESSAGE = 'SEND_MESSAGE';
const UPDATE_MESSAGE_BODY = 'UPDATE_MESSAGE_BODY';

const MessagesReducer = (state: MessagesPageType, action: ActionTypes) => {
    switch (action.type) {
        case UPDATE_MESSAGE_BODY: {
            state.messageBody = action.newBody;
            return state;
        }
        case SEND_MESSAGE: {
            let newMessage = {
                id: new Date().getTime(),
                name: 'Dmitrii Antonov',
                message: state.messageBody,
                time: 'new time'
            }
            state.messages.push(newMessage);
            state.messageBody = '';
            return state;
        }
        default:
            return state;
    }

};

export default MessagesReducer;

export const updateMessageBodyAC = (newBody: string) => ({type: UPDATE_MESSAGE_BODY, newBody});
export const sendMessageAC = () => ({type: SEND_MESSAGE} as const);