import React from 'react';
import classes from "./MessagesWindow.module.css";
import smile from "../../../assets/images/smile.png";

type InArray = {
    id: number
    body: string
    time: string
}
type PropsType = {
    messages: Array<InArray>
}
const MessagesWindow: React.FC<PropsType> = (props) => {
    return (
        <div>
            <div className={classes.chat_window}>
                {props.messages.map(m => {
                    return (
                    <div className={classes.receiver}>
                        <span className={classes.receiver_message}>{m.body}</span>
                        <span className={classes.message_time}>{m.time}</span>
                    </div>
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

export default MessagesWindow;