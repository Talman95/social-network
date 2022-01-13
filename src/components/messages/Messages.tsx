import React from 'react';
import classes from './Messages.module.css';
import Chat from "./chat/Chat";
import {Dialogs} from "./dialogs/Dialogs";

type PropsType = {
    name: string,
    status: string
    messages: Array<InArray>
    chats: any
}
type InArray = {
    id: number
    name: string
    message: string
    time: string
}

const Messages:React.FC<PropsType> = (props) => {
    return (
        <div className={classes.messages}>
            <Dialogs chats={props.chats}/>
            <Chat messages={props.messages} />
        </div>
    );
};

export default Messages;