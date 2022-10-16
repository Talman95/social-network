import React, {ChangeEvent, FC} from 'react';
import cl from "./ChatWindow.module.css";
import smile from "../../../../assets/images/smile.png";
import {MyButton} from "../../../UI/button/MyButton";
import {Message} from "./Message/Message";
import {MessageType} from "../../../../redux/messagesReducer";

type PropsType = {
    messages: MessageType[]
    messageBody: string
    updateMessageBody: (newBody: string) => void
    sendMessage: () => void
}

export const ChatWindow: FC<PropsType> = (
    {
        messages, messageBody, updateMessageBody, sendMessage
    }
) => {

    const mappedMessages = messages.map(m => <Message key={m.id}
                                                      name={m.name}
                                                      message={m.message}
                                                      time={m.time}
    />)

    const onUpdateMessageBody = (e: ChangeEvent<HTMLTextAreaElement>) => {
        updateMessageBody(e.currentTarget.value)
    }
    const onSendMessage = () => sendMessage()

    return (
        <>
            <div className={cl.chat_window}>
                {mappedMessages}

                {/*<div className={cl.receiver}>*/}
                {/*    <span className={cl.receiver_message}>{props.body}</span>*/}
                {/*    <span className={cl.message_time}>{props.time}</span>*/}
                {/*</div>*/}

            </div>
            <div className={cl.chatForm}>
                <textarea
                    rows={3}
                    placeholder="Enter your message"
                    value={messageBody}
                    onChange={onUpdateMessageBody}
                />
                <div className={cl.bar_right}>
                    <div>
                        <img src={smile} alt={'smile'}/>
                    </div>
                    <div>
                        <MyButton
                            callback={onSendMessage}
                        >
                            Send
                        </MyButton>
                    </div>
                </div>
            </div>
        </>
    );
};