import React from 'react';
import cl from "./Chat.module.css";
import {ChatHeader} from "./ChatHeader/ChatHeader";
import {ChatWindow} from "./ChatWindow/ChatWindow";
import {MessageType} from "../../../redux/state";

type PropsType = {
    messages: MessageType[]
}
export const Chat: React.FC<PropsType> = (props) => {
    return (
        <div className={cl.chat}>
            <ChatHeader name={'Dmitrii Antonov'} status={'Heeeeeeey'}/>
            <ChatWindow messages={props.messages}/>
        </div>
    );
};