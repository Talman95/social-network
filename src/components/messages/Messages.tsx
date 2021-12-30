import React from 'react';
import classes from './Messages.module.css';
import MessagesHeader from "./messagesHeader/MessagesHeader";
import MessagesWindow from "./messagesWindow/MessagesWindow";

type MessagesPropsType = {
    name: string,
    status: string
}

const Messages = (props: MessagesPropsType) => {
    return (
        <div className={classes.main}>
            <MessagesHeader name={'Anna Luzhina'} status={'Online'} />
            <MessagesWindow messageBodySender={'Hello! How are you? When you start to learn react?'}
                            timeSender={'22:22'}
                            messageBodyReceiver={'Hi! We will start after the new year. 3 january'}
                            timeReceiver={'22:24'} />
        </div>
    );
};

export default Messages;