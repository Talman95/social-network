import React from 'react';
import classes from './Messages.module.css';
import MessagesHeader from "./messagesHeader/MessagesHeader";
import Chat from "./chat/Chat";

type PropsType = {
    name: string,
    status: string
    messages: Array<InArray>
}
type InArray = {
    id: number
    name: string
    message: string
    time: string
}

const Messages:React.FC<PropsType> = (props) => {
    return (
        <div className={classes.main}>
            <MessagesHeader name={props.name} status={props.status} />
            <Chat messages={props.messages} />
        </div>
    );
};

export default Messages;