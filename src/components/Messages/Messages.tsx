import React, {FC, useEffect} from 'react';
import cl from './Messages.module.css';
import {ChatContainer} from "./Chat/ChatContainer";
import {DialogsContainer} from "./Dialogs/DialogsContainer";
import {dialogsAPI} from "../../api/dialogs";

const Messages: FC = () => {

    useEffect(() => {
        async function getDialogs() {
            await dialogsAPI.getAllDialogs()
        }
        getDialogs()

    }, [])

    return (
        <div className={cl.messages}>
            <DialogsContainer/>
            <ChatContainer/>
        </div>
    );
};

export default Messages;