import React from 'react';
import classes from "./Chat.module.css";
import smile from "../../../assets/images/smile.png";
import {Message} from "./message/Message";

type InArray = {
    id: number
    name: string
    message: string
    time: string
}
type PropsType = {
    messages: Array<InArray>
}
const Chat: React.FC<PropsType> = (props) => {
    return (
        <div>
            <div className={classes.chat_window}>
                {props.messages.map(m => {
                    return (
                    <Message name={m.name} message={m.message} time={m.time} />
                    )
                })}
                {/*<div className={classes.receiver}>*/}
                {/*    <span className={classes.receiver_message}>{props.body}</span>*/}
                {/*    <span className={classes.message_time}>{props.time}</span>*/}
                {/*</div>*/}
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

export default Chat;