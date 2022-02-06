import React, {ChangeEvent} from 'react';
import cl from "./ChatWindow.module.css";
import smile from "../../../../assets/images/smile.png";
import {MyButton} from "../../../UI/button/MyButton";
import {Message} from "./Message/Message";
import {ActionTypes, MessageType} from "../../../../redux/state";
import {sendMessageAC, updateMessageBodyAC} from "../../../../redux/messages-reducer";

type PropsType = {
    messages: MessageType[]
    messagesBody: string
    dispatch: (action: ActionTypes) => void
}

export const ChatWindow: React.FC<PropsType> = (props) => {

    const mappedMessages = props.messages.map(m => {
        return (
            <Message key={m.id} name={m.name} message={m.message} time={m.time}/>
        )
    })

    const onChangeMessageBody = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let newBody = e.currentTarget.value
        props.dispatch(updateMessageBodyAC(newBody));
    }
    const onClickSendMessage = () => {
        props.dispatch(sendMessageAC());
    }

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
                    value={props.messagesBody}
                    onChange={onChangeMessageBody}
                />
                <div className={cl.bar_right}>
                    <div>
                        <img src={smile} alt={'smile'}/>
                    </div>
                    <div>
                        <MyButton
                            callback={onClickSendMessage}
                        >
                            Send
                        </MyButton>
                    </div>
                </div>
            </div>
        </>
    );
};