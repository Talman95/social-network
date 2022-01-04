import React from 'react';
import classes from './Messages.module.css';
import MessagesHeader from "./messagesHeader/MessagesHeader";
import MessagesWindow from "./messagesWindow/MessagesWindow";

type PropsType = {
    name: string,
    status: string
    messages: Array<InArray>
}
type InArray = {
    id: number
    body: string
    time: string
}

const Messages:React.FC<PropsType> = (props) => {
    return (
        <div className={classes.main}>
            <MessagesHeader name={'Anna Luzhina'} status={'Online'} />
            <MessagesWindow messages={props.messages} />
        </div>
    );
};

export default Messages;