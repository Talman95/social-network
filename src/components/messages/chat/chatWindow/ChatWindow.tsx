import React from 'react';
import cl from "./ChatWindow.module.css";
import smile from "../../../../assets/images/smile.png";
import {MyButton} from "../../../UI/button/MyButton";
import {Message} from "./message/Message";
import {MessageType} from "../../../../redux/state";

type PropsType = {
    messages: MessageType[]
}

export const ChatWindow: React.FC<PropsType> = (props) => {
    return (
        <>
            <div className={cl.chat_window}>
                {props.messages.map(m => {
                    return (
                        <Message name={m.name} message={m.message} time={m.time}/>
                    )
                })}
                {/*<div className={cl.receiver}>*/}
                {/*    <span className={cl.receiver_message}>{props.body}</span>*/}
                {/*    <span className={cl.message_time}>{props.time}</span>*/}
                {/*</div>*/}
            </div>
            <div className={cl.chatForm}>
                <textarea rows={3} placeholder="Enter your message"></textarea>
                <div className={cl.bar_right}>
                    <div>
                        <img src={smile} alt={'smile'}/>
                    </div>
                    <div>
                        <MyButton>Send</MyButton>
                    </div>
                </div>
            </div>
        </>
    );
};