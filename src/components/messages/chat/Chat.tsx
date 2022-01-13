import React from 'react';
import classes from "./Chat.module.css";
import smile from "../../../assets/images/smile.png";
import {Message} from "./message/Message";
import {MessagesHeader} from "./chatHeader/MessagesHeader";
import {MyButton} from "../../UI/button/MyButton";

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
        <div className={classes.chat}>
            <MessagesHeader name={'Dmitrii'} status={'Heeeeeeey'}/>
            <div className={classes.chat_window}>
                {props.messages.map(m => {
                    return (
                        <Message name={m.name} message={m.message} time={m.time}/>
                    )
                })}
                {/*<div className={classes.receiver}>*/}
                {/*    <span className={classes.receiver_message}>{props.body}</span>*/}
                {/*    <span className={classes.message_time}>{props.time}</span>*/}
                {/*</div>*/}
            </div>
            <div className={classes.chatForm}>
                <textarea rows={3} placeholder="Enter your message"></textarea>
                <div className={classes.bar_right}>
                    <div>
                        <img src={smile} alt={'smile'}/>
                    </div>
                    <div>
                        <MyButton>Send</MyButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;