import React from 'react';
import cl from './Messages.module.css';
import {Chat} from "./Chat/Chat";
import {Dialogs} from "./Dialogs/Dialogs";
import {ActionTypes, MessagesPageType} from "../../redux/state";

type PropsType = {
    messagesPage: MessagesPageType
    dispatch: (action: ActionTypes) => void
}

const Messages: React.FC<PropsType> = (props) => {

    return (
        <div className={cl.messages}>
            <Dialogs dialogs={props.messagesPage.dialogs}/>
            <Chat
                messagesPage={props.messagesPage}
                dispatch={props.dispatch}
            />
        </div>
    );
};

export default Messages;