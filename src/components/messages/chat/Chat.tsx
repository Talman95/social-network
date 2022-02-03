import React from 'react';
import cl from "./Chat.module.css";
import {ChatHeader} from "./ChatHeader/ChatHeader";
import {ChatWindow} from "./ChatWindow/ChatWindow";
import {ActionTypes, MessagesPageType} from "../../../redux/state";

type PropsType = {
    messagesPage: MessagesPageType
    dispatch: (action: ActionTypes) => void
}
export const Chat: React.FC<PropsType> = (props) => {
    return (
        <div className={cl.chat}>
            <ChatHeader
                name={'Dmitrii Antonov'}
                status={'Heeeeeeey'}
            />
            <ChatWindow
                messages={props.messagesPage.messages}
                messagesBody={props.messagesPage.messageBody}
                dispatch={props.dispatch}
            />
        </div>
    );
};