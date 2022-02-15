import React, {FC} from 'react';
import cl from "./Chat.module.css";
import {ChatHeader} from "./ChatHeader/ChatHeader";
import {ChatWindow} from "./ChatWindow/ChatWindow";
import {ChatPropsType} from "./ChatContainer";


export const Chat: FC<ChatPropsType> = (props) => {
    return (
        <div className={cl.chat}>
            <ChatHeader
                name={'Dmitrii Antonov'}
                status={'Heeeeeeey'}
            />
            <ChatWindow
                messages={props.messages}
                messageBody={props.messageBody}
                updateMessageBody={props.updateMessageBody}
                sendMessage={props.sendMessage}
            />
        </div>
    );
};