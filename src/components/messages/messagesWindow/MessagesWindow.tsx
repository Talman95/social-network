import React from 'react';
import classes from "./MessagesWindow.module.css";
import smile from "../../../assets/images/smile.png";

type PropsType = {
    messageBodySender: string,
    timeSender: string,
    messageBodyReceiver: string,
    timeReceiver: string
}
const MessagesWindow = (props: PropsType) => {
    return (
        <div>
            <div className={classes.chat_window}>
                <div className={classes.sender}>
                    <span className={classes.sender_message}>{props.messageBodySender}</span>
                    <span className={classes.message_time}>{props.timeSender}</span>
                </div>
                <div className={classes.receiver}>
                    <span className={classes.receiver_message}>{props.messageBodyReceiver}</span>
                    <span className={classes.message_time}>{props.timeReceiver}</span>
                </div>
            </div>
            <div className={classes.message_bar}>
                <div className={classes.bar_left}>
                    <img src={smile} alt={'smile'}/>
                </div>
                <div className={classes.bar_center}>
                    <input type='text' placeholder='Type a message' />
                </div>
            </div>
        </div>
    );
};

export default MessagesWindow;