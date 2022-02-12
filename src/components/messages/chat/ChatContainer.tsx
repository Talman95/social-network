import React, {FC} from 'react';
import {ReduxStoreType} from "../../../redux/store";
import {Chat} from "./Chat";
import {sendMessageAC, updateMessageBodyAC} from "../../../redux/messagesReducer";

type PropsType = {
    store: ReduxStoreType
}
export const ChatContainer: FC<PropsType> = (props) => {
    const state = props.store.getState()

    const updateMessageBody = (newBody: string) => props.store.dispatch(updateMessageBodyAC(newBody))
    const sendMessage = () => props.store.dispatch(sendMessageAC())

    return (
        <div>
            <Chat
                messages={state.messages.messages}
                messageBody={state.messages.messageBody}
                updateMessageBody={updateMessageBody}
                sendMessage={sendMessage}
            />
        </div>
    );
};