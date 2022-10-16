import React, {FC} from 'react';
import cl from './Messages.module.css';
import {ChatContainer} from "./Chat/ChatContainer";
import {DialogsContainer} from "./Dialogs/DialogsContainer";

const Messages: FC = () => {

    return (
        <div className={cl.messages}>
            <DialogsContainer/>
            <ChatContainer/>
        </div>
    );
};

export default Messages;